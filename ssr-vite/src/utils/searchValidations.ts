export interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }
  
  export const validateSearchInput = (input: string): ValidationResult => {
    const errors: string[] = [];
    
    // Check minimum length
    if (input.length < 3) {
      errors.push('City name must be at least 3 characters long');
    }
    
    // Check for leading/trailing whitespace
    if (input !== input.trim()) {
      errors.push('City name cannot start or end with spaces');
    }
    
    // Check for digits
    if (/\d/.test(input)) {
      errors.push('City name cannot contain numbers');
    }
    
    // Check for special characters (excluding spaces, hyphens, apostrophes, dots, commas, and Polish diacritical characters)
    if (/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-'.,]/.test(input)) {
      errors.push('City name can only contain letters, spaces, hyphens, apostrophes, dots, and commas');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  export const sanitizeInput = (input: string): string => {
    // Remove leading/trailing whitespace
    return input.trim();
  };