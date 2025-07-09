
import React from 'react';
import { QrCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">QRism</span>
            </div>
            <p className="text-muted-foreground">
              The most advanced QR code generator with beautiful customization options.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Custom Styling</li>
              <li>Logo Integration</li>
              <li>Multiple Formats</li>
              <li>Live Preview</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Business Cards</li>
              <li>Event Tickets</li>
              <li>Marketing</li>
              <li>Authentication</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Documentation</li>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Tutorials</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 QRism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
