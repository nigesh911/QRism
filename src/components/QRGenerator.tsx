
import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Upload, Palette, Settings, Zap, QrCode, Sparkles, AlertCircle } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { StyleSelector } from './StyleSelector';
import { PresetTemplates } from './PresetTemplates';
import { toast } from '@/hooks/use-toast';

const QRGenerator = () => {
  const [qrData, setQrData] = useState('https://example.com');
  const [qrConfig, setQrConfig] = useState({
    width: 300,
    height: 300,
    type: 'svg' as const,
    margin: 10,
    dotsOptions: {
      color: '#8B5CF6',
      type: 'rounded' as const,
    },
    backgroundOptions: {
      color: '#FFFFFF',
    },
    cornersSquareOptions: {
      color: '#8B5CF6',
      type: 'extra-rounded' as const,
    },
    cornersDotOptions: {
      color: '#8B5CF6',
      type: 'dot' as const,
    },
    imageOptions: {
      crossOrigin: 'anonymous' as const,
      margin: 10,
      imageSize: 0.3,
    }
  });
  
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate and format URL
  const formatQRData = (data: string) => {
    if (!data.trim()) return 'https://example.com';
    
    // If it looks like a URL but doesn't have protocol, add https://
    if (data.includes('.') && !data.startsWith('http://') && !data.startsWith('https://') && !data.includes('@') && !data.startsWith('tel:') && !data.startsWith('sms:')) {
      return `https://${data}`;
    }
    
    return data;
  };

  // Initialize QR code
  useEffect(() => {
    const formattedData = formatQRData(qrData);
    const qr = new QRCodeStyling({
      ...qrConfig,
      data: formattedData,
      image: logoImage || undefined,
    });
    
    qrCodeRef.current = qr;
    
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, []);

  // Update QR code when config changes
  useEffect(() => {
    if (qrCodeRef.current) {
      const formattedData = formatQRData(qrData);
      qrCodeRef.current.update({
        ...qrConfig,
        data: formattedData,
        image: logoImage || undefined,
      });
    }
  }, [qrData, qrConfig, logoImage]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoImage(result);
        toast({
          title: "Logo uploaded successfully!",
          description: "Your logo has been added to the QR code."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = (format: 'png' | 'svg' | 'jpeg') => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: `qr-code-${Date.now()}`,
        extension: format,
      });
      toast({
        title: "QR Code downloaded!",
        description: `Your QR code has been saved as ${format.toUpperCase()}.`
      });
    }
  };

  const updateQRConfig = (updates: Partial<typeof qrConfig>) => {
    setQrConfig(prev => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: any) => {
    setQrConfig(prev => ({ ...prev, ...preset }));
    toast({
      title: "Template applied!",
      description: "QR code style has been updated."
    });
  };

  const testQR = () => {
    const formattedData = formatQRData(qrData);
    toast({
      title: "QR Code Data",
      description: `Your QR code contains: ${formattedData}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="h-8 w-8 text-primary" />
            <Sparkles className="h-6 w-6 text-qr-secondary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-qr bg-clip-text text-transparent mb-4">
            QR Code Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, customizable QR codes with logos and advanced styling options.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  QR Code Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="qr-data">URL or Text</Label>
                  <Textarea
                    id="qr-data"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="Enter URL, text, or any data you want to encode..."
                    className="min-h-[100px] mt-2"
                  />
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Tip: URLs without http:// will automatically get https:// added</span>
                  </div>
                </div>
                <Button onClick={testQR} variant="outline" size="sm" className="w-full">
                  Test QR Data
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="style">
                  <Palette className="h-4 w-4 mr-2" />
                  Style
                </TabsTrigger>
                <TabsTrigger value="logo">
                  <Upload className="h-4 w-4 mr-2" />
                  Logo
                </TabsTrigger>
                <TabsTrigger value="presets">
                  <Settings className="h-4 w-4 mr-2" />
                  Templates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Colors & Style</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ColorPicker
                      config={qrConfig}
                      updateConfig={updateQRConfig}
                    />
                    <div className="mt-6">
                      <StyleSelector
                        config={qrConfig}
                        updateConfig={updateQRConfig}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logo">
                <Card>
                  <CardHeader>
                    <CardTitle>Logo Upload</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Upload Logo Image</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </div>
                      {logoImage && (
                        <div className="mt-4">
                          <img
                            src={logoImage}
                            alt="Logo preview"
                            className="w-16 h-16 object-contain border rounded-md"
                          />
                          <Button
                            onClick={() => setLogoImage(null)}
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                          >
                            Remove Logo
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="logo-size">Logo Size</Label>
                      <Select
                        value={qrConfig.imageOptions.imageSize.toString()}
                        onValueChange={(value) => 
                          updateQRConfig({
                            imageOptions: {
                              ...qrConfig.imageOptions,
                              imageSize: parseFloat(value)
                            }
                          })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.2">Small (20%)</SelectItem>
                          <SelectItem value="0.3">Medium (30%)</SelectItem>
                          <SelectItem value="0.4">Large (40%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="presets">
                <PresetTemplates onApplyPreset={applyPreset} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview & Download */}
          <div className="space-y-6">
            <Card className="shadow-qr">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  <div 
                    ref={qrRef}
                    className="p-6 bg-white rounded-lg shadow-sm border"
                    style={{ minHeight: qrConfig.height + 48 }}
                  />
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button 
                      onClick={() => downloadQR('png')}
                      variant="gradient"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      PNG
                    </Button>
                    <Button 
                      onClick={() => downloadQR('svg')}
                      variant="glow"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      SVG
                    </Button>
                    <Button 
                      onClick={() => downloadQR('jpeg')}
                      variant="outline"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JPEG
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Size & Advanced Options */}
            <Card>
              <CardHeader>
                <CardTitle>Size & Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={qrConfig.width}
                      onChange={(e) => updateQRConfig({ 
                        width: parseInt(e.target.value) || 300,
                        height: parseInt(e.target.value) || 300
                      })}
                      min="200"
                      max="800"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin">Margin</Label>
                    <Input
                      id="margin"
                      type="number"
                      value={qrConfig.margin}
                      onChange={(e) => updateQRConfig({ margin: parseInt(e.target.value) || 10 })}
                      min="0"
                      max="50"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
