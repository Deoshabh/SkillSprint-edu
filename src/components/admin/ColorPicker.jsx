import React from 'react';
import { Input } from '@/components/ui/input';

const ColorPicker = ({ label, color, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-md border"
          style={{ backgroundColor: color }}
        />
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <div className="relative w-10 h-10">
            <Input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
             <div
                className="w-full h-full rounded-md border"
                style={{ backgroundColor: color }}
             />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;