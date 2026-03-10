import React, { useContext, useMemo } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import BuildIcon from "@mui/icons-material/Build";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SpeedIcon from "@mui/icons-material/Speed";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { TranslationContext } from "../TranslationContext";
import "./About.css";

const offerings = [
  {
    icon: <BuildIcon className="about-icon" />,
    title: "Analiză și proiectare eficiente",
    description: "Configurăm soluția potrivită fluxului tău: echipamente, consum, setări și mentenanță.",
  },
  {
    icon: <TrendingUpIcon className="about-icon" />,
    title: "Tehnologie avansată și fiabilă",
    description: "Produse și soluții testate pentru performanță constantă în regim intensiv.",
  },
  {
    icon: <SpeedIcon className="about-icon" />,
    title: "Instalare rapidă și completă",
    description: "Punere în funcțiune cu parametri clari și instruire pentru personal.",
  },
  {
    icon: <HeadsetMicIcon className="about-icon" />,
    title: "Suport continu și consultanță",
    description: "Răspundem rapid și te ajutăm să optimizezi consumul și calitatea spălării.",
  },
];

const About = () => {
  const { texts } = useContext(TranslationContext);

  const trustBadges = useMemo(
    () => [
      { icon: <VerifiedIcon className="about-badge__icon" />, label: "Calitate controlată" },
      { icon: <LocalShippingIcon className="about-badge__icon" />, label: "Livrare rapidă" },
      { icon: <SupportAgentIcon className="about-badge__icon" />, label: "Suport tehnic" },
    ],
    []
  );

  return (
    <Box className="about-section" component="section" aria-label="Despre companie">
      <Container maxWidth="lg">
        <div className="about-content">
          <div className="about-hero full-width-hero">
            <div className="about-hero__text">
              <Typography variant="h2" component="h2" className="about-title" gutterBottom>
                {texts.about_title}
              </Typography>

              <Typography variant="body1" className="about-text">
                {texts.about_description}
              </Typography>

              <div className="about-badges" aria-label="Beneficii">
                {trustBadges.map((b) => (
                  <div key={b.label} className="about-badge">
                    {b.icon}
                    <span className="about-badge__label">{b.label}</span>
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  className="contact-button"
                  href="tel:+37360234777"
                  onClick={() => gtag_report_conversion_main()}
                >
                  {texts.about_contact}
                </Button>
                <p className="about-cta__note">Răspundem rapid. Consultanță gratuită pentru ofertă.</p>
              </div>
            </div>

            <div className="about-hero__panel">
              <Typography className="offering-title">{texts.about_offers}</Typography>
              <Grid container spacing={2}>
                {offerings.map((off) => (
                  <Grid item xs={12} sm={6} key={off.title}>
                    <div className="offering-card">
                      <div className="offering-card__icon">{off.icon}</div>
                      <div className="offering-card__body">
                        <Typography variant="subtitle1" className="offering-card__title">
                          {off.title}
                        </Typography>
                        <Typography variant="body2" className="offering-card__desc">
                          {off.description}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default About;
