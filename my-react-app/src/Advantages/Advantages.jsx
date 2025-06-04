import React, { useContext } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './Advantages.css';

const Advantages = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  const advantages = [
    {
      title: texts.advantage_1_title,
      description: texts.advantage_1_desc,
      image: "/assets/pag.avant/why-us-7.svg",
      path: "/avantaje/sistem-plata"
    },
    {
      title: texts.advantage_2_title,
      description: texts.advantage_2_desc,
      image: "/assets/pag.avant/why-us-2.svg",
      path: "/avantaje/monitorizare"
    },
    {
      title: texts.advantage_3_title,
      description: texts.advantage_3_desc,
      image: "/assets/pag.avant/why-us-1.webp",
      path: "/avantaje/echipamente"
    },
    {
      title: texts.advantage_4_title,
      description: texts.advantage_4_desc,
      image: "/assets/pag.avant/why-us-4.svg",
      path: "/avantaje/program"
    },
    {
      title: texts.advantage_5_title,
      description: texts.advantage_5_desc,
      image: "/assets/pag.avant/why-us-5.svg",
      path: "/avantaje/loialitate"
    },
    {
      title: texts.advantage_6_title,
      description: texts.advantage_6_desc,
      image: "/assets/pag.avant/why-us-6.svg",
      path: "/avantaje/locatii"
    },
    {
      title: texts.advantage_7_title,
      description: texts.advantage_7_desc,
      image: "/assets/pag.avant/why-us-80.JPG",
      path: "/avantaje/locatii"
    },
    {
      title: texts.advantage_8_title,
      description: texts.advantage_8_desc,
      image: "/assets/pag.avant/why-us-3.svg",
      path: "/avantaje/locatii"
    }
  ];

  return (
    <Box className="advantages-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="advantages-title" gutterBottom>
          {texts.advantages_title} {/* Titlu tradus */}
        </Typography>
        <Typography variant="h6" className="advantages-subtitle" gutterBottom>
          {texts.advantages_subtitle} {/* Subtitlu tradus */}
        </Typography>

        <Grid container spacing={4} className="advantages-grid">
          {advantages.map((advantage, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="advantage-card" onClick={() => window.location.href = advantage.path}>
                <CardMedia
                  component="img"
                  height="200"
                  image={advantage.image}
                  alt={advantage.title}
                  className="advantage-image"
                />
                <CardContent className="advantage-content">
                  <Typography variant="h5" className="advantage-title">
                    {advantage.title}
                  </Typography>
                  <Typography variant="body2" className="advantage-description">
                    {advantage.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Advantages;
