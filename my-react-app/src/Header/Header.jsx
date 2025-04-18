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
  Popper, 
  Paper, 
  ClickAwayListener,
  MenuList,
  Grow
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
    { text: texts.menu_faq, path: '/intrebari' },
    { text: texts.menu_advantages, path: '/avantaje' },
    { text: texts.menu_contact, path: '/contacte' }
  ];

  const contacts = [
    { icon: <PhoneIcon />, text: '+373 60 234 777', link: 'tel:+37360234777' },
    { icon: <PhoneIcon />, text: '+373 60 234 111', link: 'tel:+37360234111' },
    { icon: <EmailIcon />, text: 'washpro@gmail.com', link: 'mailto:washpro@gmail.com' }
  ];

  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        <div className="logo-container">
          <Typography 
            variant="h6" 
            className="logo" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Wash Pro
          </Typography>
        </div>

        <div className="header-right">
          <Button
            color="inherit"
            onClick={handleContactsOpen}
          >
            {texts.menu_contact} {/* Tradus */}
          </Button>
          <Menu
            anchorEl={contactsAnchor}
            open={Boolean(contactsAnchor)}
            onClose={handleContactsClose}
          >
            {contacts.map((contact, index) => (
              <MenuItem key={index} className="contact-item">
                <a href={contact.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {contact.icon} {contact.text}
                </a>
              </MenuItem>
            ))}
          </Menu>

          <Button
            color="inherit"
            onClick={handleLanguageOpen}
            startIcon={<LanguageIcon />}
          >
            {texts.language} {/* Afișează limba curentă */}
          </Button>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageClose}
          >
            <MenuItem key="ru" onClick={() => handleLanguageChange('ru')}>
              Русский
            </MenuItem>
            <MenuItem key="ro" onClick={() => handleLanguageChange('ro')}>
              Română
            </MenuItem>
          </Menu>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileMenuOpen}
            className="menu-button"
          >
            <MenuIcon className="hamburger-icon" />
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
