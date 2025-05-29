import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header/Header.jsx';
import About from './About/About.jsx';
import Payment from './Payment/Payment.jsx';
import FAQ from './FAQ/FAQ.jsx';
import Footer from './Footer/Footer.jsx';
import Gallery from './Gallery/Gallery.jsx';
import Blog from './Blog/Blog.jsx';
import BlogPage from './Blog/BlogPage.jsx'
import Statistics from "./Statistics/Statistics.jsx";
import Calculator from './Calculator/Calculator.jsx';
import Advantages from './Advantages/Advantages.jsx';
import WorkSteps from './WorkSteps/WorkSteps.jsx';
import { TranslationContext } from './TranslationContext.jsx'; // Import contextul de traducere
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { texts } = useContext(TranslationContext); // Accesăm textele traduse

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <About />
              <Payment />
              <Gallery />
              <Blog />
              <Statistics />
              <Calculator />
              <FAQ />
            </>
          } />
          <Route path="/etape" element={<WorkSteps />} />
          <Route path="/intrebari" element={<FAQ />} />
          <Route path="/avantaje" element={<Advantages />} />
          <Route path="/contacte" element={<Calculator />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
