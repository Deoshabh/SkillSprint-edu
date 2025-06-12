import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeProvider';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import ColorPicker from '@/components/admin/ColorPicker';
import BannerEditor from '@/components/admin/BannerEditor';
import { hexToHsl, hslToHex } from '@/lib/colorUtils';

const SettingsPage = () => {
  const { setTheme: applyBaseTheme } = useTheme();
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      applySettings(settings);
    }
  }, [settings]);

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('settings')
      .select('config')
      .eq('id', 1)
      .single();

    if (error) {
      toast({ title: "Error fetching settings", description: error.message, variant: "destructive" });
    } else {
      setSettings(data.config);
    }
    setIsLoading(false);
  };
  
  const applySettings = (config) => {
    applyBaseTheme(config.theme_mode || 'dark');
    const root = document.documentElement;
    Object.entries(config.colors).forEach(([name, hex]) => {
      const hsl = hexToHsl(hex);
      if (hsl) {
        root.style.setProperty(`--${name}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      }
    });
  };

  const handleUpdate = (newConfig) => {
    setSettings(newConfig);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('settings')
      .update({ config: settings })
      .eq('id', 1);

    if (error) {
      toast({ title: "Error saving settings", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Settings saved!", description: "Your changes have been applied." });
    }
  };
  
  if (isLoading) return <div>Loading settings...</div>;
  if (!settings) return <div>Could not load settings.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application's settings and UI.</p>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <Tabs defaultValue="theme" className="w-full">
        <TabsList>
          <TabsTrigger value="theme">Theme & Colors</TabsTrigger>
          <TabsTrigger value="banner">Hero Banner</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <Card>
            <CardContent className="p-6 space-y-8">
               <div>
                  <h3 className="text-lg font-medium">Theme Mode</h3>
                  <p className="text-sm text-muted-foreground">Select the default theme for the application.</p>
                  <div className="flex space-x-2 pt-2">
                    {['light', 'dark', 'system'].map(mode => (
                      <Button 
                        key={mode}
                        variant={settings.theme_mode === mode ? 'secondary' : 'outline'} 
                        onClick={() => handleUpdate({ ...settings, theme_mode: mode })}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Button>
                    ))}
                  </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Brand Colors</h3>
                <p className="text-sm text-muted-foreground">Customize the core colors of the UI.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <ColorPicker 
                    label="Primary"
                    color={settings.colors.primary}
                    onChange={(color) => handleUpdate({ ...settings, colors: { ...settings.colors, primary: color }})}
                  />
                   <ColorPicker 
                    label="Secondary"
                    color={settings.colors.secondary}
                    onChange={(color) => handleUpdate({ ...settings, colors: { ...settings.colors, secondary: color }})}
                  />
                   <ColorPicker 
                    label="Accent"
                    color={settings.colors.accent}
                    onChange={(color) => handleUpdate({ ...settings, colors: { ...settings.colors, accent: color }})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="banner">
             <Card>
                <CardContent className="p-6">
                  <BannerEditor 
                    headline={settings.hero.headline}
                    subheadline={settings.hero.subheadline}
                    imageUrl={settings.hero.imageUrl}
                    onChange={(heroData) => handleUpdate({ ...settings, hero: heroData })}
                  />
                </CardContent>
              </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;