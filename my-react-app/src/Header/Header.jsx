import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { TranslationContext } from '../TranslationContext.jsx';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { texts, setLanguage } = useContext(TranslationContext);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [contactsAnchor, setContactsAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleContactsOpen = (event) => {
    setContactsAnchor(event.currentTarget);
  };

  const handleContactsClose = () => {
    setContactsAnchor(null);
  };

  const handleLanguageOpen = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleLanguageClose();
  };

  const menuItems = [
    { text: texts.menu_home, path: '/' },
    { text: texts.menu_work_steps, path: '/etape' },
    { text: texts.menu_advantages, path: '/avantaje' },
    { text: texts.menu_contact, path: '/contacte' }
  ];

  const contacts = [
    { icon: <PhoneIcon />, text: '+373 60 234 777', link: 'tel:+37360234777' },
    { icon: <PhoneIcon />, text: '+373 60 234 111', link: 'tel:+37360234111' },
    { icon: <EmailIcon />, text: 'washpro@gmail.com', link: 'mailto:washpro@gmail.com' }
  ];

  return (
    <>
      <Box className="logo-banner">
        <Container maxWidth="lg">
          <Box className="logo-container">
            <Typography 
              variant="h4" 
              className="logo" 
              onClick={() => navigate('/')}
            >
              WASHER CAR
            </Typography>
          </Box>
        </Container>
      </Box>
      <AppBar position="sticky" className="header">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box className="header-right">
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  className="nav-button"
                >
                  {item.text}
                </Button>
              ))}
              
            <Button
              onClick={(event) => {
                gtag_report_conversion_header(); // înregistrează conversia
                handleContactsOpen(event);       // transmite eventul corect
              }}
              className="contact-button"
            >
              {texts.menu_contact}
            </Button>


              <Menu
                anchorEl={contactsAnchor}
                open={Boolean(contactsAnchor)}
                onClose={handleContactsClose}
                PaperProps={{
                  elevation: 3,
                  className: "contact-menu"
                }}
              >
                {contacts.map((contact, index) => (
                  <MenuItem key={index} className="contact-item">
                    <a href={contact.link}>
                      {contact.icon} {contact.text}
                    </a>
                  </MenuItem>
                ))}
              </Menu>

              <Button
                onClick={handleLanguageOpen}
                startIcon={<LanguageIcon />}
                className="language-button"
              >
                {texts.language}
              </Button>
              <Menu
                anchorEl={languageAnchor}
                open={Boolean(languageAnchor)}
                onClose={handleLanguageClose}
                PaperProps={{
                  elevation: 3,
                  className: "language-menu"
                }}
              >
                <MenuItem onClick={() => handleLanguageChange('ru')}>
                  Русский
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('ro')}>
                  Română
                </MenuItem>
              </Menu>

              <IconButton
                onClick={handleMobileMenuOpen}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                className="mobile-menu"
                PaperProps={{
                  className: "menu-paper"
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item.text} 
                    onClick={() => {
                      navigate(item.path);
                      handleMobileMenuClose();
                    }}
                    className="menu-item"
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
