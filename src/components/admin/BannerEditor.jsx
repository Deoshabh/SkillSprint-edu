import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BannerEditor = ({ headline, subheadline, imageUrl, onChange }) => {
  
  const handleImageUpload = () => {
    toast({
      title: "🚧 Feature coming soon!",
      description: "Direct image upload isn't implemented yet. Please use an image URL for now.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Hero Banner</h3>
        <p className="text-sm text-muted-foreground">Set the content for the main welcome banner.</p>
      </div>
      <div className="space-y-2">
        <label>Headline</label>
        <Input 
          value={headline} 
          onChange={(e) => onChange({ headline: e.target.value, subheadline, imageUrl })} 
        />
      </div>
      <div className="space-y-2">
        <label>Subheadline</label>
        <Input 
          value={subheadline} 
          onChange={(e) => onChange({ headline, subheadline: e.target.value, imageUrl })} 
        />
      </div>
      <div className="space-y-2">
        <label>Background Image URL</label>
        <div className="flex gap-2">
          <Input 
            value={imageUrl} 
            onChange={(e) => onChange({ headline, subheadline, imageUrl: e.target.value })} 
            placeholder="https://images.unsplash.com/..."
          />
          <Button variant="outline" onClick={handleImageUpload}>Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default BannerEditor;