import React, { useContext } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { TranslationContext } from '../TranslationContext.jsx';
import './Location.css';

const MAGDACESTI_DIRECTIONS_URL = 'https://www.google.com/maps/place/4RQQ%2BP3,+M%C4%83gd%C4%83ce%C8%99ti/@47.1402025,28.8359293,18z/data=!4m6!3m5!1s0x40cbd8fc2f7499f5:0x49cd4ce8a004f137!8m2!3d47.1403362!4d28.8366143!16s%2Fg%2F11v1_fq0m0?entry=ttu';
const NISPORENI_DIRECTIONS_URL = 'https://maps.app.goo.gl/SGgxZGPs2QWYwbtAA';

const Location = () => {
  const { texts } = useContext(TranslationContext);

  return (
    <section className="location-section">
      <Container maxWidth="lg">
        <Box className="location-card">
          <Box className="location-header">
            <RoomIcon className="location-icon" />
            <Box>
              <Typography variant="h4" className="section-title">
                {texts.location_section_title}
              </Typography>
              <Typography variant="subtitle1" className="section-subtitle">
                {texts.location_section_subtitle}
              </Typography>
            </Box>
          </Box>

          <Box className="location-grid">
            <Box className="location-item">
              <Box className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933.2711186847386!2d28.835929294574818!3d47.14020252567822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbd8fc2f7499f5%3A0x49cd4ce8a004f137!2zNFJRUStQMywgTcSDZ2TEg2NlxZ90aSwgTW9sZG92YQ!5e0!3m2!1sro!2s!4v1740243435815!5m2!1sro!2s"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${texts.footer_map_title} - Măgdăcești`}
                />
              </Box>
              <Box className="location-details">
                <Typography variant="subtitle1" className="location-address">
                  Măgdăcești, WashPro
                </Typography>
                <Button
                  className="btn-primary open-maps-btn"
                  onClick={() => window.open(MAGDACESTI_DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
                >
                  {texts.location_open_maps}
                </Button>
              </Box>
            </Box>

            <Box className="location-item">
              <Box className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps?q=Nisporeni%2C%20Moldova&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${texts.footer_map_title} - Nisporeni`}
                />
              </Box>
              <Box className="location-details">
                <Typography variant="subtitle1" className="location-address">
                  Nisporeni, WashPro
                </Typography>
                <Button
                  className="btn-primary open-maps-btn"
                  onClick={() => window.open(NISPORENI_DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
                >
                  {texts.location_open_maps}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Location;


