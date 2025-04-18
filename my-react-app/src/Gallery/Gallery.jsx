import React from 'react';
import { Container, Typography, Box, ImageList, ImageListItem } from '@mui/material';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    {
      img: './src/assets/img.spalatorii/1.jpg',
      title: 'Spălătorie Wash&Go',
      rows: 2,
      cols: 2,
    },
    {
      video: './assets/3video.mp4',
      title: 'WasherCar',
    },
    {
      video: './assets/2video.mp4',
      title: 'WasherCar',
    },
    {
      video: './assets/video.mp4',
      title: 'WasherCar',
      cols: 2,
    },
    {
      img: './src/assets/img.spalatorii/2.jpg',
      title: 'Spalatorie Magdacesti',
      rows: 2,
      cols: 2,
    },
    {
      img: './src/assets/img.spalatorii/3.jpg',
      title: 'Spălătorie Wash&Go',
      rows: 2,
      cols: 2,
    },
  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Box className="gallery-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="gallery-title" gutterBottom>
          Galerie
        </Typography>
        <Typography variant="h6" className="gallery-subtitle" gutterBottom>
          Proiectele contruite de noi
        </Typography>
        
        <Box className="gallery-container">
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={200}
            gap={12}
            className="gallery-grid"
          >
            {galleryItems.map((item, index) => (
              <ImageListItem 
                key={index} 
                cols={item.cols || 1} 
                rows={item.rows || 1}
                className="gallery-item"
              >
                {item.video ? (
                  <video 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={item.video} type="video/mp4" />
                    Browserul tău nu suportă redarea video.
                  </video>
                ) : (
                  <img
                    {...srcset(item.img, 200, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <Box className="gallery-item-overlay">
                  <Typography variant="subtitle1">
                    {item.title}
                  </Typography>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </Box>
  );
};

export default Gallery; 