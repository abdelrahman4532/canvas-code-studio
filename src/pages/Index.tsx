import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { toast } from '@/hooks/use-toast';
import SettingsSidebar from '@/components/SettingsSidebar';
import CanvasPreview from '@/components/CanvasPreview';
import CodeEditor from '@/components/CodeEditor';
import MobileSettingsSheet from '@/components/MobileSettingsSheet';
import { CanvasSettings, DEFAULT_CODE, DEFAULT_SETTINGS } from '@/types/canvas';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [settings, setSettings] = useState<CanvasSettings>(DEFAULT_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = useCallback((newSettings: Partial<CanvasSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2,
        quality: 1,
      });

      const link = document.createElement('a');
      link.download = `${settings.fileName.replace(/\.[^/.]+$/, '')}-codecanvas.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: 'Export Successful! ✨',
        description: 'Your code snapshot has been downloaded.',
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  }, [settings.fileName]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SettingsSidebar
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">CodeCanvas</h1>
              <p className="text-xs text-muted-foreground">Artist</p>
            </div>
          </div>
          <MobileSettingsSheet
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onExport={handleExport}
            isExporting={isExporting}
          />
        </header>

        {/* Content Grid */}
        <div className="flex-1 grid lg:grid-rows-[1fr_auto] gap-4 p-4 lg:p-8 overflow-auto">
          {/* Canvas Preview Section */}
          <motion.div
            layout
            className="glass-card overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-0"
          >
            <div className="w-full h-full overflow-auto flex items-center justify-center">
              <CanvasPreview
                ref={canvasRef}
                code={code}
                settings={settings}
              />
            </div>
          </motion.div>

          {/* Code Editor Section */}
          <div className="lg:max-h-72">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
