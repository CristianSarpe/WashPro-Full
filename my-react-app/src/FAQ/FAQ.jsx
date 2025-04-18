import React, { useContext } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './FAQ.css';

const FAQ = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  return (
    <Box className="faq-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="faq-title" gutterBottom>
          {texts.faq_title} {/* Titlu tradus */}
        </Typography>
        
        <Box className="faq-container">
          {texts.faqs.map((faq, index) => (
            <Accordion key={index} className="faq-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="expand-icon" />}
                className="faq-question"
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className="faq-answer">
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
