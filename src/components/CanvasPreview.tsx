import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import WindowFrame from './WindowFrame';
import CodeHighlighter from './CodeHighlighter';
import { CanvasSettings, BACKGROUNDS } from '@/types/canvas';

interface CanvasPreviewProps {
  code: string;
  settings: CanvasSettings;
}

const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ code, settings }, ref) => {
    const backgroundClass = BACKGROUNDS.find(bg => bg.value === settings.background)?.className || 'bg-mesh-1';

    return (
      <motion.div
        layout
        className="w-full h-full flex items-center justify-center p-8"
      >
        <div
          ref={ref}
          className={`${backgroundClass} rounded-2xl transition-all duration-500`}
          style={{
            padding: `${settings.padding}px`,
          }}
        >
          <WindowFrame
            theme={settings.windowTheme}
            fileName={settings.fileName}
            shadowIntensity={settings.shadowIntensity}
          >
            <CodeHighlighter
              code={code}
              language={settings.language}
              showLineNumbers={settings.showLineNumbers}
            />
          </WindowFrame>
        </div>
      </motion.div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;
