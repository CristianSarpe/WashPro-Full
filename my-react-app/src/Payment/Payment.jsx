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

        <Grid container spacing={3}>
          {/* Card Bancar */}
          <Grid item xs={12} sm={6} md={3} className="payment-card">
            <Box className="payment-method">
              <Box className="method-header">
                <Typography variant="h5" className="method-title">
                  {texts.payment_card_title}
                </Typography>
                <CreditCardIcon className="payment-icon" />
              </Box>
              <Box className="card-image-container">
                <div className='bancar'>
                <img src="../dist/assets/cardul-bancar.png" alt="Card Bancar" className="method-image" />
                </div>
              </Box>
              <Box className="advantages-list">
                <ul>
                  <li>Plata instantanee</li>
                  <li>Securitate maximă</li>
                  <li>Acceptat peste tot</li>
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Cash */}
          <Grid item xs={12} sm={6} md={3} className="payment-card">
            <Box className="payment-method">
              <Box className="method-header">
                <Typography variant="h5" className="method-title">
                  {texts.payment_cash_title}
                </Typography>
                <PaymentsIcon className="payment-icon" />
              </Box>
              <Box className="card-image-container">
                <img src="../dist/assets/card-cash.png" alt="Plată Cash" className="method-image" />
              </Box>
              <Box className="advantages-list">
                <ul>
                  <li>Plata directă</li>
                  <li>Fără comisioane</li>
                  <li>Control total</li>
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Card Fizic */}
          <Grid item xs={12} sm={6} md={3} className="payment-card">
            <Box className="payment-method">
              <Box className="method-header">
                <Typography variant="h5" className="method-title">
                  {texts.payment_physical_card}
                </Typography>
                <CreditCardIcon className="payment-icon" />
              </Box>
              <Box className="card-image-container">
                <img src="/assets/card-fata.png" alt="Card Fizic" className="method-image" />
              </Box>
              <Box className="advantages-list">
                <ul>
                  <li>Acces rapid</li>
                  <li>Plata contactless</li>
                  <li>Beneficii exclusive</li>
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Aplicația PAYCar */}
          <Grid item xs={12} sm={6} md={3} className="payment-card">
            <Box className="payment-method">
              <Box className="method-header">
                <Typography variant="h5" className="method-title">
                  {texts.payment_app_title}
                </Typography>
                <PhoneIphoneIcon className="payment-icon" />
              </Box>
              <Box className="card-image-container">
                <img src="/assets/app-bg-mob.webp" alt="PAYCar App" className="method-image" />
              </Box>
              <Box className="advantages-list">
                <ul>
                  <li>Plata din aplicație</li>
                  <li>Istoric tranzacții</li>
                  <li>Notificări instant</li>
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

        <Box className="work-steps-button-container">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="work-steps-button"
            href="/etape"
          >
            Află etapele de lucru
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Payment;
