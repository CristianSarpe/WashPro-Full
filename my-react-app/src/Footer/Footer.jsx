import React, { useContext } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { TranslationContext } from '../TranslationContext'; // Import contextul de traducere
import './Footer.css';

const Footer = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Secțiunea Social Media */}
          <Grid item xs={12} md={4}>
            <Box className="footer-section">
              <Typography variant="h5" className="footer-title">
                {texts.footer_follow}
              </Typography>
              <Box className="social-icons">
                <IconButton 
                  href="https://www.facebook.com/Washercar.md" 
                  target="_blank"
                  className="social-icon facebook"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  href="https://www.instagram.com/liviusarpe/" 
                  target="_blank"
                  className="social-icon instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  href="https://web.telegram.org/a/#1785139663" // Înlocuiește cu link-ul real al grupului tău de Telegram
                  target="_blank"
                  className="social-icon telegram"
                >
                  <TelegramIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" className="social-text">
                {texts.footer_social_text}
              </Typography>
            </Box>
          </Grid>

          {/* Secțiunea Contact */}
          <Grid item xs={12} md={4}>
            <Box className="footer-section">
              <Typography variant="h5" className="footer-title">
                {texts.footer_contact}
              </Typography>
              <List className="contact-list">
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon className="contact-icon" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={texts.footer_address}
                    secondary="4RQQ+P3, Măgdăceşti"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon className="contact-icon" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={texts.footer_phone}
                    secondary="+373 60 234 777 & +373 60 234 111"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon className="contact-icon" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={texts.footer_email}
                    secondary="washercar.md@gmail.com"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon className="contact-icon" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={texts.footer_schedule}
                    secondary="24/7"
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Secțiunea Hartă */}
          <Grid item xs={12} md={4}>
            <Box className="footer-section">
              <Typography variant="h5" className="footer-title">
                {texts.footer_locations}
              </Typography>
              <Box className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933.2711186847386!2d28.835929294574818!3d47.14020252567822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd8fc2f7499f5%3A0x49cd4ce8a004f137!2zNFJRUStQMywgTcSDZ2TEg2NlxZ90aSwgTW9sZG92YQ!5e0!3m2!1sro!2s!4v1740243435815!5m2!1sro!2s" 
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={texts.footer_map_title}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box className="copyright">
          <Typography variant="body2">
            © {new Date().getFullYear()} Wash Pro. {texts.footer_rights}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
