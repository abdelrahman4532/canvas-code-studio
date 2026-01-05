import { motion } from 'framer-motion';
import { Palette, Monitor, Maximize, Sun, Hash, FileCode, Download, Sparkles } from 'lucide-react';
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

interface SettingsSidebarProps {
  settings: CanvasSettings;
  onSettingsChange: (settings: Partial<CanvasSettings>) => void;
  onExport: () => void;
  isExporting: boolean;
}

const SettingsSidebar = ({
  settings,
  onSettingsChange,
  onExport,
  isExporting,
}: SettingsSidebarProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CodeCanvas</h1>
            <p className="text-xs text-muted-foreground">Artist Studio</p>
          </div>
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Language Selection */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileCode className="w-4 h-4 text-primary" />
            Language
          </div>
          <Select
            value={settings.language}
            onValueChange={(value: Language) => onSettingsChange({ language: value })}
          >
            <SelectTrigger className="w-full glass-card border-white/10">
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
        </motion.div>

        {/* File Name */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Hash className="w-4 h-4 text-primary" />
            File Name
          </div>
          <Input
            value={settings.fileName}
            onChange={(e) => onSettingsChange({ fileName: e.target.value })}
            className="glass-card border-white/10"
            placeholder="filename.js"
          />
        </motion.div>

        {/* Background Selection */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Palette className="w-4 h-4 text-primary" />
            Background
          </div>
          <div className="grid grid-cols-3 gap-2">
            {BACKGROUNDS.map((bg) => (
              <motion.button
                key={bg.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSettingsChange({ background: bg.value as BackgroundType })}
                className={`h-12 rounded-lg ${bg.className} border-2 transition-all duration-200 ${
                  settings.background === bg.value
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-transparent hover:border-white/20'
                }`}
                title={bg.label}
              />
            ))}
          </div>
        </motion.div>

        {/* Window Theme */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Monitor className="w-4 h-4 text-primary" />
            Window Theme
          </div>
          <div className="flex gap-2">
            {WINDOW_THEMES.map((theme) => (
              <motion.button
                key={theme.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSettingsChange({ windowTheme: theme.value as WindowTheme })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  settings.windowTheme === theme.value
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-foreground hover:bg-white/10'
                }`}
              >
                {theme.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Padding */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
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
            className="w-full"
          />
        </motion.div>

        {/* Shadow Intensity */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
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
            className="w-full"
          />
        </motion.div>

        {/* Line Numbers Toggle */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between py-2"
        >
          <Label htmlFor="line-numbers" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Hash className="w-4 h-4 text-primary" />
            Line Numbers
          </Label>
          <Switch
            id="line-numbers"
            checked={settings.showLineNumbers}
            onCheckedChange={(checked) => onSettingsChange({ showLineNumbers: checked })}
          />
        </motion.div>
      </div>

      {/* Export Button */}
      <div className="p-4 border-t border-sidebar-border">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
