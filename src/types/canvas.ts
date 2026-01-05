export type Language = 'javascript' | 'typescript' | 'html' | 'css' | 'python' | 'json';

export type BackgroundType = 'mesh-1' | 'mesh-2' | 'mesh-3' | 'mesh-4' | 'solid-dark' | 'solid-slate';

export type WindowTheme = 'dark' | 'light' | 'glass';

export interface CanvasSettings {
  language: Language;
  background: BackgroundType;
  windowTheme: WindowTheme;
  padding: number;
  shadowIntensity: number;
  showLineNumbers: boolean;
  fileName: string;
}

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'python', label: 'Python' },
  { value: 'json', label: 'JSON' },
];

export const BACKGROUNDS: { value: BackgroundType; label: string; className: string }[] = [
  { value: 'mesh-1', label: 'Cyber Neon', className: 'bg-mesh-1' },
  { value: 'mesh-2', label: 'Sunset Flame', className: 'bg-mesh-2' },
  { value: 'mesh-3', label: 'Deep Ocean', className: 'bg-mesh-3' },
  { value: 'mesh-4', label: 'Aurora', className: 'bg-mesh-4' },
  { value: 'solid-dark', label: 'Midnight', className: 'bg-solid-dark' },
  { value: 'solid-slate', label: 'Slate', className: 'bg-solid-slate' },
];

export const WINDOW_THEMES: { value: WindowTheme; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'glass', label: 'Glassmorphism' },
];

export const DEFAULT_CODE = `// Welcome to CodeCanvas Artist ✨
// Paste your code here and create beautiful snapshots!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);

// Export as a stunning PNG image!`;

export const DEFAULT_SETTINGS: CanvasSettings = {
  language: 'javascript',
  background: 'mesh-1',
  windowTheme: 'dark',
  padding: 48,
  shadowIntensity: 50,
  showLineNumbers: true,
  fileName: 'untitled.js',
};
