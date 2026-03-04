const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path"); // ✅ nou - pentru a servi fișiere statice
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ nou - servește fișierele statice din frontend-ul build-uit
// app.use(express.static(path.join(__dirname, "dist")));

// ✅ nou - toate rutele care nu sunt /api să trimită index.html (pentru frontend routing)
/*
app.get("*", (req, res) => {
    if (req.originalUrl.startsWith("/api")) return; // lasă API-urile să funcționeze
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
*/

// 🔧 amoCRM config
const AMOCRM_DOMAIN = process.env.AMOCRM_DOMAIN;
const AMOCRM_API_KEY = process.env.AMOCRM_API_KEY;
const PIPELINE_ID = process.env.PIPELINE_ID;
const PHONE_FIELD_ID = process.env.PHONE_FIELD_ID;
const EMAIL_FIELD_ID = process.env.EMAIL_FIELD_ID;
const BOXES_FIELD_ID = process.env.BOXES_FIELD_ID;

// 🔧 Helpers pentru validare și formatare
const getDigits = (value) => String(value || "").replace(/\D/g, "");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const isValidPhone = (phone) => getDigits(phone).length >= 8;

const amoHeaders = () => ({
    Authorization: `Bearer ${AMOCRM_API_KEY}`,
    "Content-Type": "application/json",
});

const safeNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
};

const buildOfferNoteText = ({ name, phone, email, items, total, currency }) => {
    const lines = [
        "Cerere ofertă detergenți (WasherCar)",
        `Nume: ${name}`,
        `Telefon: ${phone}`,
        `Email: ${email}`,
        "",
        "Produse:",
        ...items.map((it, idx) => {
            const productName = it.productName || it.productId || `Produs ${idx + 1}`;
            const qty = safeNumber(it.quantity);
            const pricePerLitre = safeNumber(it.pricePerLitre);
            const itemTotal = safeNumber(it.itemTotal);
            const parts = [
                `- ${productName}: ${qty} L`,
                pricePerLitre > 0 ? `x ${pricePerLitre.toFixed(2)} ${currency}/L` : null,
                `= ${itemTotal.toFixed(2)} ${currency}`,
            ].filter(Boolean);
            return parts.join(" ");
        }),
        "",
        `Total: ${safeNumber(total).toFixed(2)} ${currency}`,
    ];

    return lines.join("\n");
};

app.post("/api/send-to-amocrm", async (req, res) => {
    const { phone, email, boxes } = req.body;

    if (!phone || !email || !boxes) {
        return res.status(400).json({ error: "Telefonul, emailul și numărul de boxe sunt obligatorii!" });
    }

    const leadData = {
        name: "Client nou de pe site",
        pipeline_id: parseInt(process.env.PIPELINE_ID),
        custom_fields_values: [
            { field_id: parseInt(PHONE_FIELD_ID), values: [{ value: phone }] },
            { field_id: parseInt(EMAIL_FIELD_ID), values: [{ value: email }] },
            { field_id: parseInt(BOXES_FIELD_ID), values: [{ value: boxes }] },
        ],
    };

    console.log("📌 JSON trimis către amoCRM:", JSON.stringify([leadData], null, 2));

    try {
        const response = await axios.post(
            `https://${AMOCRM_DOMAIN}/api/v4/leads`,
            [leadData],
            {
                headers: { Authorization: `Bearer ${AMOCRM_API_KEY}` },
            }
        );

        console.log("✅ Răspuns amoCRM:", JSON.stringify(response.data, null, 2));

        res.json({ message: "Lead trimis cu succes în amoCRM!", data: response.data });
    } catch (error) {
        console.error("❌ Eroare la trimiterea lead-ului:");

        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }

        res.status(500).json({ error: "Eroare la conectarea cu amoCRM" });
    }
});

// ✅ Endpoint pentru "Solicită o ofertă personalizată" (ProductsSection)
app.post("/api/request-offer", async (req, res) => {
    const { name, phone, email, items, total, currency } = req.body || {};

    if (!name || !phone || !email) {
        return res.status(400).json({ error: "Numele, telefonul și emailul sunt obligatorii!" });
    }

    if (!isValidPhone(phone)) {
        return res.status(400).json({ error: "Telefon invalid (minim 8 cifre)." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Email invalid." });
    }

    if (!Array.isArray(items) || items.length < 1 || items.length > 3) {
        return res.status(400).json({ error: "Selectați între 1 și 3 produse." });
    }

    const normalizedItems = items.map((it) => ({
        productId: it.productId,
        productName: it.productName,
        quantity: safeNumber(it.quantity),
        pricePerLitre: safeNumber(it.pricePerLitre),
        itemTotal: safeNumber(it.itemTotal),
    }));

    const hasInvalidQty = normalizedItems.some((it) => !it.productId || it.quantity <= 0);
    if (hasInvalidQty) {
        return res.status(400).json({ error: "Cantitate invalidă (trebuie > 0) sau produs lipsă." });
    }

    const leadData = {
        name: `Cerere ofertă detergenți - ${String(name).trim()}`,
        pipeline_id: parseInt(PIPELINE_ID, 10),
        custom_fields_values: [
            { field_id: parseInt(PHONE_FIELD_ID, 10), values: [{ value: String(phone).trim() }] },
            { field_id: parseInt(EMAIL_FIELD_ID, 10), values: [{ value: String(email).trim() }] },
        ],
    };

    try {
        // 1. Creăm lead-ul
        const leadResponse = await axios.post(
            `https://${AMOCRM_DOMAIN}/api/v4/leads`,
            [leadData],
            { headers: amoHeaders() }
        );

        const createdLead = leadResponse?.data?._embedded?.leads?.[0];
        const leadId = createdLead?.id;

        if (!leadId) {
            return res.status(502).json({ error: "Nu am putut obține ID-ul lead-ului din amoCRM." });
        }

        // 2. Adăugăm o notă cu detaliile ofertei
        const noteText = buildOfferNoteText({
            name: String(name).trim(),
            phone: String(phone).trim(),
            email: String(email).trim(),
            items: normalizedItems,
            total: safeNumber(total),
            currency: currency || "MDL",
        });

        try {
            await axios.post(
                `https://${AMOCRM_DOMAIN}/api/v4/leads/${leadId}/notes`,
                [
                    {
                        note_type: "common",
                        params: { text: noteText },
                    },
                ],
                { headers: amoHeaders() }
            );
        } catch (noteError) {
            console.error("⚠️ Lead creat, dar nota nu a putut fi adăugată:", noteError?.message);
        }

        return res.json({ message: "✅ Cererea de ofertă a fost trimisă în amoCRM!", leadId });
    } catch (error) {
        console.error("❌ Eroare la trimiterea cererii în amoCRM:");

        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }

        return res.status(500).json({ error: "Eroare la conectarea cu amoCRM" });
    }
});

// ✅ nou - port configurabil (pentru hosting) + fallback local
const port = process.env.PORT || 5177;
app.listen(port, () => console.log(`✅ Serverul rulează pe portul ${port}`));
