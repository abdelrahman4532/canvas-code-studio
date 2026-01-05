import { motion } from 'framer-motion';
import { Settings, Palette, Monitor, Maximize, Sun, Hash, FileCode, Download, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CanvasSettings,
  Language,
  BackgroundType,
  WindowTheme,
  LANGUAGES,
  BACKGROUNDS,
  WINDOW_THEMES,
} from '@/types/canvas';

interface MobileSettingsSheetProps {
  settings: CanvasSettings;
  onSettingsChange: (settings: Partial<CanvasSettings>) => void;
  onExport: () => void;
  isExporting: boolean;
}

const MobileSettingsSheet = ({
  settings,
  onSettingsChange,
  onExport,
  isExporting,
}: MobileSettingsSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="glass-card border-white/10">
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] bg-background border-t border-border rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground">Canvas Settings</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-24 space-y-6">
          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FileCode className="w-4 h-4 text-primary" />
              Language
            </div>
            <Select
              value={settings.language}
              onValueChange={(value: Language) => onSettingsChange({ language: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Name */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Hash className="w-4 h-4 text-primary" />
              File Name
            </div>
            <Input
              value={settings.fileName}
              onChange={(e) => onSettingsChange({ fileName: e.target.value })}
              placeholder="filename.js"
            />
          </div>

          {/* Background Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Palette className="w-4 h-4 text-primary" />
              Background
            </div>
            <div className="grid grid-cols-3 gap-2">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => onSettingsChange({ background: bg.value as BackgroundType })}
                  className={`h-16 rounded-lg ${bg.className} border-2 transition-all duration-200 ${
                    settings.background === bg.value
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-transparent'
                  }`}
                >
                  <span className="sr-only">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Window Theme */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Monitor className="w-4 h-4 text-primary" />
              Window Theme
            </div>
            <div className="flex gap-2">
              {WINDOW_THEMES.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => onSettingsChange({ windowTheme: theme.value as WindowTheme })}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    settings.windowTheme === theme.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Maximize className="w-4 h-4 text-primary" />
                Padding
              </div>
              <span className="text-xs text-muted-foreground">{settings.padding}px</span>
            </div>
            <Slider
              value={[settings.padding]}
              onValueChange={([value]) => onSettingsChange({ padding: value })}
              min={16}
              max={96}
              step={8}
            />
          </div>

          {/* Shadow Intensity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sun className="w-4 h-4 text-primary" />
                Shadow
              </div>
              <span className="text-xs text-muted-foreground">{settings.shadowIntensity}%</span>
            </div>
            <Slider
              value={[settings.shadowIntensity]}
              onValueChange={([value]) => onSettingsChange({ shadowIntensity: value })}
              min={0}
              max={100}
              step={10}
            />
          </div>

          {/* Line Numbers Toggle */}
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="line-numbers-mobile" className="flex items-center gap-2 text-sm font-medium">
              <Hash className="w-4 h-4 text-primary" />
              Line Numbers
            </Label>
            <Switch
              id="line-numbers-mobile"
              checked={settings.showLineNumbers}
              onCheckedChange={(checked) => onSettingsChange({ showLineNumbers: checked })}
            />
          </div>
        </div>

        {/* Fixed Export Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <Button
            onClick={onExport}
            disabled={isExporting}
            className="w-full btn-primary h-12 text-base gap-2"
          >
            {isExporting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Export PNG
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSettingsSheet;
