import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TranslationContext } from "../TranslationContext"; // Importăm contextul de traducere
import "./Calculator.css";

const Calculator = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    boxCount: ""
  });

  const [message, setMessage] = useState(""); // 🔹 Feedback pentru utilizator
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validare telefon
    if (!formData.phone) {
      newErrors.phone = texts.calculator_error_phone_required;
    } else if (!/^(\+373|0)[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = texts.calculator_error_phone_invalid;
    }

    // Validare email
    if (!formData.email) {
      newErrors.email = texts.calculator_error_email_required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = texts.calculator_error_email_invalid;
    }

    // Validare număr boxe
    if (!formData.boxCount) {
      newErrors.boxCount = texts.calculator_error_boxcount_required;
    } else if (parseInt(formData.boxCount) < 1) {
      newErrors.boxCount = texts.calculator_error_boxcount_invalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("https://washpro-full-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          email: formData.email,
          boxes: parseInt(formData.boxCount) // 🔹 Convertim la număr
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(texts.calculator_success_message);
        setFormData({ phone: "", email: "", boxCount: "" }); // 🔹 Resetează formularul
      } else {
        setMessage(`${texts.calculator_error} ${data.error}`);
      }
    } catch (error) {
      setMessage(texts.calculator_error_send);
      console.error("Eroare:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
        let newValue = value;

        // Adaugă automat +373 doar dacă utilizatorul scrie primul număr
        if (name === "phone") {
            if (!value.startsWith("+373")) {
                newValue = "+373" + value.replace(/^0+/, ""); // Elimină 0 de la început, dacă există
            }
        }

        return { ...prev, [name]: newValue };
    });
};

  return (
    <Box className="calculator-section">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className="calculator-title">
              {texts.calculator_title}
            </Typography>
            <Typography variant="h6" className="calculator-subtitle">
              {texts.calculator_subtitle}
            </Typography>

            <Typography variant="body1" style={{ marginBottom: '1rem', color: '#FF6B00', fontWeight: 600, textAlign: 'center' }}>
              Pentru detalii rapide sunați la: <a href="tel:060234777" style={{color: '#FF6B00', textDecoration: 'underline'}}>060 234 777</a>
            </Typography>

            <Paper elevation={3} className="calculator-form-container">
              <form onSubmit={handleSubmit} className="calculator-form">
                <TextField
                  fullWidth
                  name="phone"
                  label={texts.calculator_phone}
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon className="form-icon" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="email"
                  label={texts.calculator_email}
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon className="form-icon" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="boxCount"
                  label={texts.calculator_boxcount}
                  type="number"
                  variant="outlined"
                  value={formData.boxCount}
                  onChange={handleChange}
                  error={!!errors.boxCount}
                  helperText={errors.boxCount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon className="form-icon" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type="submit" variant="contained" className="submit-btn" fullWidth>
                  {texts.calculator_submit}
                </Button>

                {message && <Typography variant="body1" className="form-message">{message}</Typography>}
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h2" className="faq-title" gutterBottom>
              {texts.faq_title}
            </Typography>
            
            <Box className="faq-container">
              {texts.faqs.map((faq, index) => (
                <Accordion key={index} className="faq-accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="expand-icon" />}
                    className="faq-question"
                  >
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="faq-answer">
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Calculator;
