import React, { useContext } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './FAQ.css';

const FAQ = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  return (
    <Box className="faq-section">
    </Box>
  );
};

export default FAQ;
