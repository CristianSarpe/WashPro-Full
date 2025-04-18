
import { useState } from "react";

const ContactForm = () => {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [boxes, setBoxes] = useState(""); // Adăugat câmpul pentru numărul de boxe
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = { phone, email, boxes }; // Trimite și numărul de boxe

        try {
            const response = await fetch("http://localhost:5004/api/send-to-amocrm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Lead trimis cu succes în amoCRM!");
                setPhone(""); // Resetează câmpurile după trimitere
                setEmail("");
                setBoxes("");
            } else {
                setMessage(`❌ Eroare: ${data.error}`);
            }
        } catch (error) {
            setMessage("❌ Eroare la trimiterea lead-ului");
            console.error("Eroare:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="tel"
                placeholder="Număr de telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Număr de boxe"
                value={boxes}
                onChange={(e) => setBoxes(e.target.value)}
                required
            />
            <button type="submit">Trimite</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ContactForm;
