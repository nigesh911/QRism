
import React from 'react';
import LandingPage from '@/components/LandingPage';
import QRGenerator from '@/components/QRGenerator';

const Index = () => {
  return (
    <div>
      <LandingPage />
      <div id="qr-generator">
        <QRGenerator />
      </div>
    </div>
  );
};

export default Index;
