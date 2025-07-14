import type { RelativeValue } from "./CellsTemplates";
//calculating relative value to baseline city
export const calculateRelativeValue = (value: number, baseValue: number): RelativeValue => {
    const difference = value - baseValue;
    return {
      value,
      difference,
      isHigher: difference > 0,
      isEqual: difference === 0
    };
  };