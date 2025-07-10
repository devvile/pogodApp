import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";

interface BackButtonProps {
  variant?: 'minimal' | 'outlined' | 'filled';
  action?: 'home' | 'back';
  className?: string;
  text?: string;
}

const BackButton = ({ 
  variant = 'minimal', 
  action = 'home',
  className = '',
  text
}: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (action === 'back') {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const getButtonText = () => {
    if (text) return text;
    return action === 'back' ? 'Go Back' : 'Back to Home';
  };

  const getIcon = () => {
    return action === 'back' ? <ArrowLeft size={20} /> : <Home size={20} />;
  };

  const getVariantClasses = () => {
    const baseClasses = "flex items-center gap-2 transition-all duration-200";
    
    switch (variant) {
      case 'outlined':
        return `${baseClasses} bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 hover:scale-105`;
      
      case 'filled':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 shadow-lg hover:shadow-xl`;
      
      case 'minimal':
      default:
        return `${baseClasses} text-white/80 hover:text-white mb-6 transition-colors duration-200`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${getVariantClasses()} ${className}`}
    >
      {getIcon()}
      <span>{getButtonText()}</span>
    </button>
  );
};

export default BackButton;