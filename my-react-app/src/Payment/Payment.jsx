import React, { useContext } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PaymentsIcon from '@mui/icons-material/Payments';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './Payment.css';

const Payment = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  return (
    <Box className="payment-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="payment-title" gutterBottom>
          {texts.payment_title} {/* Titlu tradus */}
        </Typography>

        <Grid container spacing={4}>
          {/* Card Bancar și Cash */}
          <Grid item xs={12} className="payment-card">
            <Box className="payment-method other-methods">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box className="other-payment-method">
                    <CreditCardIcon className="payment-icon" />
                    <Typography variant="h5" gutterBottom>
                      {texts.payment_card_title}
                    </Typography>
                    <Typography>
                      {texts.payment_card_description}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="other-payment-method">
                    <PaymentsIcon className="payment-icon" />
                    <Typography variant="h5" gutterBottom>
                      {texts.payment_cash_title}
                    </Typography>
                    <Typography>
                      {texts.payment_cash_description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Card Fizic */}
          <Grid item xs={12} md={6} className="payment-card">
            <Box className="payment-method physical-card">
              <Box className="method-header">
                <Typography variant="h4" className="method-title">
                  {texts.payment_physical_card}
                </Typography>
                <CreditCardIcon className="payment-icon" />
              </Box>
              <Box className="card-image-container" >
                <img src="/assets/card-fata.png" alt="Card Fizic" className="method-image" />
              </Box>
              <Box className="advantages-list">
                <Typography variant="h6" gutterBottom>
                  {texts.payment_advantages}
                </Typography>
                <ul>
                  {texts.payment_card_advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Aplicația PAYCar */}
          <Grid item xs={12} md={6} className="payment-card">
            <Box className="payment-method app">
              <Box className="method-header">
                <Typography variant="h4" className="method-title">
                  {texts.payment_app_title}
                </Typography>
                <PhoneIphoneIcon className="payment-icon" />
              </Box>
              <Box className="app-image-container">
                <img src="/assets/app-bg-mob.webp" alt="PAYCar App" className="method-image" />
              </Box>
              <Box className="advantages-list">
                <Typography variant="h6" gutterBottom>
                  {texts.payment_advantages}
                </Typography>
                <ul>
                  {texts.payment_app_features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Box>
              <Box className="store-buttons">
                <Button
                  variant="contained"
                  startIcon={<AppleIcon />}
                  className="store-button apple"
                  href="#"
                  target="_blank"
                >
                  App Store
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ShopIcon />}
                  className="store-button google"
                  href="#"
                  target="_blank"
                >
                  Google Play
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Payment;
