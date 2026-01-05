import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card overflow-hidden"
    >
      {/* Editor Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <Code2 className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Code Input</span>
      </div>

      {/* Textarea */}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 bg-transparent text-foreground font-mono text-sm 
                   placeholder:text-muted-foreground/50 resize-none focus:outline-none
                   leading-relaxed"
        placeholder="Paste your code here..."
        spellCheck={false}
      />
    </motion.div>
  );
};

export default CodeEditor;
