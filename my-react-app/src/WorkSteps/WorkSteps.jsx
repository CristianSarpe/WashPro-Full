import React, { useState, useContext } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Calculator from '../Calculator/Calculator.jsx';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import 'swiper/css';
import 'swiper/css/pagination';
import './WorkSteps.css';

const WorkSteps = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse
  const [activeStep, setActiveStep] = useState(0);
  const [activeAppStep, setActiveAppStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState(null);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setExpandedStep(expandedStep === index ? null : index);
  };

  const handleAppStepClick = (index) => {
    setActiveAppStep(index);
  };

  return (
    <>
      <Box className="work-steps-section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="work-steps-title" gutterBottom>
            {texts.work_steps_title}
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="work-steps-slider"
              >
                {texts.work_steps_images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="steps-container">
                {texts.work_steps.map((step, index) => (
                  <Box
                    key={index}
                    className={`step-item ${activeStep === index ? 'active' : ''}`}
                    onClick={() => handleStepClick(index)}
                  >
                    <Typography variant="h2" className="step-number">
                      {step.number}
                    </Typography>
                    <Box className="step-content">
                      <Typography variant="h5" className="step-title">
                        {step.title}
                      </Typography>
                      <Typography variant="body1" className="step-description">
                    {expandedStep === index ? step.fullDescription : step.shortDescription}
                </Typography>
                {expandedStep !== index && (
                    <Typography 
                        variant="body2" 
                        className="read-more">
                        {texts.read_more}
                    </Typography>)}

                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="app-steps-section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="work-steps-title" gutterBottom>
            {texts.app_steps_title}
          </Typography>
          <Typography variant="h6" className="work-steps-subtitle" gutterBottom>
            {texts.app_steps_subtitle}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="app-steps-container">
                {texts.app_steps.map((step, index) => (
                  <Box
                    key={index}
                    className={`app-step-item ${activeAppStep === index ? 'active' : ''}`}
                    onClick={() => handleAppStepClick(index)}
                  >
                    <Typography variant="h2" className="step-number">
                      {step.number}
                    </Typography>
                    <Box className="step-content">
                      <Typography variant="h5" className="step-title">
                        {step.title}
                      </Typography>
                      <Typography variant="body1" className="step-description">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="app-image-containers">
                <img 
                  src="/assets/app-device.webp" 
                  alt="Mobile App Steps" 
                  className="app-main-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="calculator-section">
        <Calculator />
      </Box>
    </>
  );
};

export default WorkSteps;
