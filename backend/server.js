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

app.post("/api/send-to-amocrm", async (req, res) => {
    const { phone, email, boxes } = req.body;

    if (!phone || !email || !boxes) {
        return res.status(400).json({ error: "Telefonul, emailul și numărul de boxe sunt obligatorii!" });
    }

    const leadData = {
        name: "Client nou de pe site",
        pipeline_id: parseInt(10519483),
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

// ✅ nou - port configurabil (pentru hosting) + fallback local
const port = process.env.PORT || 5177;
app.listen(port, () => console.log(`✅ Serverul rulează pe portul ${port}`));
