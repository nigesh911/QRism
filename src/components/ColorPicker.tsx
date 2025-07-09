import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  config: any;
  updateConfig: (updates: any) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ config, updateConfig }) => {
  const [openPickers, setOpenPickers] = useState<{ [key: string]: boolean }>({});

  const togglePicker = (key: string) => {
    setOpenPickers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleColorChange = (color: any, path: string[]) => {
    const updates = { ...config };
    let current = updates;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = color.hex;
    
    updateConfig(updates);
  };

  const ColorButton = ({ 
    color, 
    label, 
    path, 
    pickerKey 
  }: { 
    color: string; 
    label: string; 
    path: string[]; 
    pickerKey: string; 
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={openPickers[pickerKey]} onOpenChange={() => togglePicker(pickerKey)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 justify-start gap-3"
          >
            <div 
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
            />
            {color.toUpperCase()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <SketchPicker
            color={color}
            onChange={(color) => handleColorChange(color, path)}
            presetColors={[
              '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', 
              '#EF4444', '#3B82F6', '#6366F1', '#8B5A2B'
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ColorButton
        color={config.dotsOptions.color}
        label="Dots Color"
        path={['dotsOptions', 'color']}
        pickerKey="dots"
      />
      
      <ColorButton
        color={config.backgroundOptions.color}
        label="Background Color"
        path={['backgroundOptions', 'color']}
        pickerKey="background"
      />
      
      <ColorButton
        color={config.cornersSquareOptions.color}
        label="Corner Squares"
        path={['cornersSquareOptions', 'color']}
        pickerKey="cornerSquare"
      />
      
      <ColorButton
        color={config.cornersDotOptions.color}
        label="Corner Dots"
        path={['cornersDotOptions', 'color']}
        pickerKey="cornerDot"
      />
    </div>
  );
};