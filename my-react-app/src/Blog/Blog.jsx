import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Button,
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TranslationContext } from '../TranslationContext'; // Importăm contextul de traducere
import './Blog.css';
import { useNavigate } from 'react-router-dom';



const Blog = () => {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse
  const navigate = useNavigate(); // Hook pentru navigare
  const location = useLocation();

  const blogPosts = [
    {
      title: texts.blog_post1_title,
      excerpt: texts.blog_post1_excerpt,
      image: "/assets/blogs/th (7).webp",
      date: "20 Mar 2024",
      category: texts.blog_category_tips,
      readTime: "5 min"
    },
    {
      title: texts.blog_post2_title,
      excerpt: texts.blog_post2_excerpt,
      image: "/assets/blogs/76.jpg",
      date: "15 Mar 2024",
      category: texts.blog_category_news,
      readTime: "3 min"
    },
    {
      title: texts.blog_post3_title,
      excerpt: texts.blog_post3_excerpt,
      image: "/assets/blogs/Modern-PC.webp",
      date: "10 Mar 2024",
      category: texts.blog_category_services,
      readTime: "4 min"
    }
  ];

  return (
    <Box className="blog-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="blog-title" gutterBottom>
          {texts.blog_title} {/* Titlu tradus */}
        </Typography>
        <Typography variant="h6" className="blog-subtitle" gutterBottom>
          {texts.blog_subtitle} {/* Subtitlu tradus */}
        </Typography>

        <Grid container spacing={3} className="blog-grid">
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="blog-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  className="blog-card-media"
                />
                <CardContent className="blog-card-content">
                  <Box className="blog-card-header">
                    <Chip 
                      label={post.category}
                      className="blog-category-chip"
                      size="small"
                    />
                    <Box className="blog-meta">
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="caption">
                        {post.readTime}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" className="blog-card-title">
                    {post.title}
                  </Typography>
                  
                  <Typography variant="body2" className="blog-card-excerpt">
                    {post.excerpt}
                  </Typography>
                  
                  <Box className="blog-card-footer">
                    <Typography variant="caption" className="blog-date">
                      {post.date}
                    </Typography>
                    <div className="social-links">
                      <a 
                        href="https://www.facebook.com/your-page" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link facebook"
                      >
                        Facebook
                      </a>
                      <a 
                        href="https://www.instagram.com/your-page" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link instagram"
                      >
                        Instagram
                      </a>
                      <a 
                        href="https://www.tiktok.com/@your-page" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link tiktok"
                      >
                        TikTok
                      </a>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

{/* Afișăm butonul DOAR dacă nu suntem pe pagina /blog */}
{location.pathname !== "/blog" && (
        <Box className="blog-footer">
          <Button 
            variant="contained" 
            className="view-all-btn"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/blog')} // Navigare către pagina Blog
          >
            {texts.blog_view_all} {/* Traducere pentru buton */}
          </Button>
        </Box>
         )}
      </Container>
    </Box>
  );
};

export default Blog;
