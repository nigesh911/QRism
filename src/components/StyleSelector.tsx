import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StyleSelectorProps {
  config: any;
  updateConfig: (updates: any) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ config, updateConfig }) => {
  const dotTypes = [
    { value: 'square', label: 'Square' },
    { value: 'dots', label: 'Dots' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'extra-rounded', label: 'Extra Rounded' },
    { value: 'classy', label: 'Classy' },
    { value: 'classy-rounded', label: 'Classy Rounded' }
  ];

  const cornerSquareTypes = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
    { value: 'extra-rounded', label: 'Extra Rounded' }
  ];

  const cornerDotTypes = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' }
  ];

  const updateDotsType = (type: string) => {
    updateConfig({
      dotsOptions: {
        ...config.dotsOptions,
        type
      }
    });
  };

  const updateCornerSquareType = (type: string) => {
    updateConfig({
      cornersSquareOptions: {
        ...config.cornersSquareOptions,
        type
      }
    });
  };

  const updateCornerDotType = (type: string) => {
    updateConfig({
      cornersDotOptions: {
        ...config.cornersDotOptions,
        type
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Dot Style</Label>
        <Select value={config.dotsOptions.type} onValueChange={updateDotsType}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dotTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Corner Square Style</Label>
        <Select value={config.cornersSquareOptions.type} onValueChange={updateCornerSquareType}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cornerSquareTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Corner Dot Style</Label>
        <Select value={config.cornersDotOptions.type} onValueChange={updateCornerDotType}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cornerDotTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};