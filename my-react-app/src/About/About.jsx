import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './About.css';

// Definim lista de oferte
const offerings = [
  {
    icon: <BuildIcon fontSize="large" color="primary" />,
    title: 'Analiză și proiectare eficiente',
  },
  {
    icon: <TrendingUpIcon fontSize="large" color="primary" />,
    title: 'Tehnologie avansată și fiabilă',
  },
  {
    icon: <SpeedIcon fontSize="large" color="primary" />,
    title: 'Instalare rapidă și completă',
  },
  {
    icon: <HeadsetMicIcon fontSize="large" color="primary" />,
    title: 'Suport continu și consultanță',
  },
];

const About = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  const projectImages = [
    {
      url: '/assets/sp.webp',
      title: texts.about_image1
    },
    {
      type: 'dual',
      images: [
        '/assets/pro.webp',
        '/assets/Pult-base2-2.webp'
      ],
      title: texts.about_image2
    },
    {
      url: '/assets/SRT.webp',
      title: texts.about_image3
    }
  ];

  return (
    <Box className="about-section">
      <Container maxWidth="lg">
        <Box className="about-content">
          <Typography
            variant="h2"
            component="h2"
            className="about-title"
            gutterBottom
          >
            {texts.about_title} {/* Titlu tradus */}
          </Typography>
          
          <Typography variant="body1" className="about-text">
            {texts.about_description} {/* Descriere tradusă */}
          </Typography>

          {/* --- Secțiunea "Ce oferim" --- */}
          <Box className="offering-section">
            <Typography
              className="offering-title"
            >
              {texts.about_offers} {/* Titlu din context: "Ce oferim" */}
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {offerings.map((off, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx} className="offering-item">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    {off.icon}
                    <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
                      {off.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className="carousel-container">
            <Carousel
              animation="slide"
              interval={4000}
              indicators={true}
              navButtonsAlwaysVisible={true}
              className="carousel"
            >
              {projectImages.map((item, index) => (
                <Box key={index} className="carousel-item">
                  {item.type === 'dual' ? (
                    <div className="dual-image-container">
                      <div className="dual-image-wrapper left">
                        <img 
                          src={item.images[0]} 
                          alt={texts.about_image_alt1}
                          className="dual-image"
                        />
                      </div>
                      <div className="dual-image-wrapper right">
                        <img 
                          src={item.images[1]} 
                          alt={texts.about_image_alt2}
                          className="dual-image"
                        />
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt={item.title} />
                  )}
                  <Typography variant="h6" className="carousel-title">
                    {item.title}
                  </Typography>
                </Box>
              ))}
            </Carousel>
          </Box>

          <Box className="contact-button-container">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PhoneIcon />}
              className="contact-button"
              href="tel:+37360234777"
            >
              {texts.about_contact} {/* Text tradus pentru buton */}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
