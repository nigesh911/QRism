
import React from 'react';
import LandingPage from '@/components/LandingPage';
import QRGenerator from '@/components/QRGenerator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div>
      <LandingPage />
      <div id="qr-generator">
        <QRGenerator />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
