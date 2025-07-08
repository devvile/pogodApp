import { 
    Sun, 
    Cloud, 
    CloudRain,
    CloudSnow,
    Zap
  } from 'lucide-react';
  import type { WeatherIconProps, WeatherIconType } from '../../../types';

const WeatherIcon: React.FC<WeatherIconProps> = ({ type, size = 24 }) => {
    const icons: Record<WeatherIconType, React.ReactNode> = {
      sunny: <Sun size={size} className="text-yellow-500" />,
      cloudy: <Cloud size={size} className="text-gray-500" />,
      'partly-cloudy': <Cloud size={size} className="text-gray-400" />,
      rainy: <CloudRain size={size} className="text-blue-500" />,
      snow: <CloudSnow size={size} className="text-blue-200" />,
      thunderstorm: <Zap size={size} className="text-purple-500" />
    };
    return icons[type] || <Sun size={size} className="text-yellow-500" />;
  };

  export default WeatherIcon;