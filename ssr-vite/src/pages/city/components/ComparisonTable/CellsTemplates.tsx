import { ArrowUp, ArrowDown, MapPin, Minus } from "lucide-react";
import WeatherIcon from "../WeatherIcon";
import type { WeatherIconType } from "@/types/weather";

export interface RelativeValue {
    value: number;
    difference: number;
    isHigher: boolean;
    isEqual: boolean;
  }

  interface CityNameCellProps {
    cityName: string;
    country: string;
    isBaseCity?: boolean;
  }

  interface RelativeDifferenceCellProps {
    relative: RelativeValue;
    unit?: string;
    showDecimals?: boolean;
    isBaseCity:boolean;
  }
  
  interface WeatherCellProps {
    icon: WeatherIconType;
    condition: string;
  }

  
  interface MetricCellProps {
    value?: number;
    unit: string;
    relative?: RelativeValue;
    showComparison?: boolean;
    showDecimals?: boolean;
  }
  

  interface CellProps{
    children: React.ReactNode
  }
  export const WeatherCell = ({ icon, condition }: WeatherCellProps) => {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="group-hover:scale-110 transition-transform duration-200">
          <WeatherIcon type={icon} size={24} />
        </div>
        <span className="text-xs text-blue-200">{condition}</span>
      </div>
    );
  };



  export const Cell= ({children}:CellProps)=>{
    return<td className="p-4 text-center">{children}</td>
  }

  export const MetricCell = ({ 
    value, 
    unit, 
    relative, 
    showComparison = false,
    showDecimals = false 
  }: MetricCellProps) => {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-white">
          {value !== undefined ? `${value}${unit}` : 'N/A'}
        </span>
        {showComparison && relative && value !== undefined && (
          <RelativeDifferenceCell 
            relative={relative} 
            unit={unit} 
            showDecimals={showDecimals}
            isBaseCity={false}
          />
        )}
      </div>
    );
  };

  export const CityNameCell = ({ cityName, country, isBaseCity = false }: CityNameCellProps) => {
    return (
      <div className="flex items-center gap-3">
        <MapPin 
          className={`${isBaseCity ? 'text-blue-300' : 'text-gray-400'} group-hover:text-blue-300`} 
          size={16} 
        />
        <div>
          <div className={`font-medium ${isBaseCity ? 'text-blue-200' : 'text-white'} group-hover:text-blue-200`}>
            {cityName}
            {isBaseCity && <span className="text-xs ml-2 text-blue-300">(base)</span>}
          </div>
          <div className="text-sm text-gray-400">{country}</div>
        </div>
      </div>
    );
  };



  export const RelativeDifferenceCell = ({ 
    relative, 
    unit = '°', 
    showDecimals = false,
    isBaseCity=false
  }: RelativeDifferenceCellProps) => {
    if (isBaseCity) {
        return (
          <div className="flex items-center gap-1 text-gray-300">
            <Minus size={14} />
            <span className="text-sm">base</span>
          </div>
        );
      }

    if (relative.isEqual) {
      return (
        <div className="flex items-center gap-1 text-gray-300">
          <Minus size={14} />
          <span className="text-sm">same</span>
        </div>
      );
    }
  
    const sign = relative.isHigher ? '+' : '';
    const color = relative.isHigher ? 'text-red-400' : 'text-blue-400';
    const Icon = relative.isHigher ? ArrowUp : ArrowDown;
    const difference = showDecimals ? relative.difference.toFixed(1) : relative.difference;
  
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon size={14} />
        <span className="text-sm font-medium">
          {sign}{difference}{unit}
        </span>
      </div>
    );
  };

