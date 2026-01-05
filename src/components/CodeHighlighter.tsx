import { useEffect, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import { Language } from '@/types/canvas';

interface CodeHighlighterProps {
  code: string;
  language: Language;
  showLineNumbers: boolean;
}

const CodeHighlighter = ({ code, language, showLineNumbers }: CodeHighlighterProps) => {
  const getPrismLanguage = (lang: Language): string => {
    switch (lang) {
      case 'html':
        return 'markup';
      default:
        return lang;
    }
  };

  const highlightedCode = useMemo(() => {
    const prismLang = getPrismLanguage(language);
    const grammar = Prism.languages[prismLang];
    
    if (!grammar) {
      return code;
    }

    return Prism.highlight(code, grammar, prismLang);
  }, [code, language]);

  const lines = code.split('\n');

  return (
    <div className="code-editor p-4 overflow-x-auto">
      <div className="flex">
        {showLineNumbers && (
          <div className="flex flex-col items-end pr-4 select-none text-muted-foreground/40 text-xs">
            {lines.map((_, index) => (
              <span key={index} className="leading-relaxed">
                {index + 1}
              </span>
            ))}
          </div>
        )}
        <pre className="flex-1 m-0 bg-transparent">
          <code
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeHighlighter;
