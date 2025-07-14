import type { RelativeValue } from "./CellsTemplates";

export const calculateRelativeValue = (value: number, baseValue: number): RelativeValue => {
    const difference = value - baseValue;
    return {
      value,
      difference,
      isHigher: difference > 0,
      isEqual: difference === 0
    };
  };