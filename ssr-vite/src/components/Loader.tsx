import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: number;
  className?: string;
  text?: string;
}

function Loader({ size = 48, className = '', text }: LoaderProps){
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 
        size={size} 
        className="animate-spin text-blue-500" 
      />
      {text && (
        <p className="mt-2 text-sm text-slate-600">{text}</p>
      )}
    </div>
  );
}

export default Loader;