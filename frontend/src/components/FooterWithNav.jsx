import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const FooterWithNav = () => {
  const navigate = useNavigate();
  
  return <Footer onRestaurantClick={() => navigate('/restaurant')} />;
};

export default FooterWithNav;
