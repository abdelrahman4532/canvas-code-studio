import { motion } from 'framer-motion';
import { WindowTheme } from '@/types/canvas';

interface WindowFrameProps {
  theme: WindowTheme;
  fileName: string;
  children: React.ReactNode;
  shadowIntensity: number;
}

const WindowFrame = ({ theme, fileName, children, shadowIntensity }: WindowFrameProps) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-white',
          header: 'bg-gray-100 border-b border-gray-200',
          text: 'text-gray-600',
        };
      case 'glass':
        return {
          bg: 'bg-white/10 backdrop-blur-xl border border-white/20',
          header: 'bg-white/5 border-b border-white/10',
          text: 'text-white/70',
        };
      case 'dark':
      default:
        return {
          bg: 'bg-[#1e1e2e]',
          header: 'bg-[#181825] border-b border-white/5',
          text: 'text-white/50',
        };
    }
  };

  const styles = getThemeStyles();
  const shadowOpacity = shadowIntensity / 100;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-xl overflow-hidden ${styles.bg}`}
      style={{
        boxShadow: `0 25px 80px -20px rgba(0, 0, 0, ${shadowOpacity * 0.8}), 0 10px 30px -10px rgba(0, 0, 0, ${shadowOpacity * 0.5})`,
      }}
    >
      {/* Window Header */}
      <div className={`flex items-center gap-2 px-4 py-3 ${styles.header}`}>
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-[#febc2e] cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-[#28c840] cursor-pointer"
          />
        </div>

        {/* File Name */}
        <div className="flex-1 text-center">
          <span className={`text-xs font-medium ${styles.text}`}>
            {fileName}
          </span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-[52px]" />
      </div>

      {/* Code Content */}
      <div className="overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default WindowFrame;
