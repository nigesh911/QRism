import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PresetTemplatesProps {
  onApplyPreset: (preset: any) => void;
}

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onApplyPreset }) => {
  const presets = [
    {
      name: 'Purple Gradient',
      description: 'Modern purple theme',
      badge: 'Popular',
      style: {
        dotsOptions: {
          color: '#8B5CF6',
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#A855F7',
          type: 'extra-rounded'
        },
        cornersDotOptions: {
          color: '#8B5CF6',
          type: 'dot'
        }
      }
    },
    {
      name: 'Ocean Blue',
      description: 'Clean ocean inspired',
      badge: 'Clean',
      style: {
        dotsOptions: {
          color: '#3B82F6',
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#1D4ED8',
          type: 'extra-rounded'
        },
        cornersDotOptions: {
          color: '#3B82F6',
          type: 'dot'
        }
      }
    },
    {
      name: 'Emerald Green',
      description: 'Fresh green design',
      badge: 'Fresh',
      style: {
        dotsOptions: {
          color: '#10B981',
          type: 'classy-rounded'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#059669',
          type: 'extra-rounded'
        },
        cornersDotOptions: {
          color: '#10B981',
          type: 'dot'
        }
      }
    },
    {
      name: 'Sunset Orange',
      description: 'Warm sunset colors',
      badge: 'Warm',
      style: {
        dotsOptions: {
          color: '#F59E0B',
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#D97706',
          type: 'extra-rounded'
        },
        cornersDotOptions: {
          color: '#F59E0B',
          type: 'dot'
        }
      }
    },
    {
      name: 'Rose Pink',
      description: 'Elegant pink theme',
      badge: 'Elegant',
      style: {
        dotsOptions: {
          color: '#EC4899',
          type: 'classy'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#DB2777',
          type: 'extra-rounded'
        },
        cornersDotOptions: {
          color: '#EC4899',
          type: 'dot'
        }
      }
    },
    {
      name: 'Classic Black',
      description: 'Timeless black & white',
      badge: 'Classic',
      style: {
        dotsOptions: {
          color: '#000000',
          type: 'square'
        },
        backgroundOptions: {
          color: '#FFFFFF'
        },
        cornersSquareOptions: {
          color: '#000000',
          type: 'square'
        },
        cornersDotOptions: {
          color: '#000000',
          type: 'square'
        }
      }
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Template Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.map((preset, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{preset.name}</h4>
                    <p className="text-sm text-muted-foreground">{preset.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {preset.badge}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div 
                      className="w-4 h-4 rounded-sm border"
                      style={{ backgroundColor: preset.style.dotsOptions.color }}
                    />
                    <div 
                      className="w-4 h-4 rounded-sm border"
                      style={{ backgroundColor: preset.style.cornersSquareOptions.color }}
                    />
                    <div 
                      className="w-4 h-4 rounded-sm border"
                      style={{ backgroundColor: preset.style.backgroundOptions.color }}
                    />
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-auto"
                    onClick={() => onApplyPreset(preset.style)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};