import { useState, useCallback } from 'react';
import { 
  calculateNumerology, 
  calculateCompatibility, 
  type NumerologyResult, 
  type CompatibilityResult 
} from '@/lib/numerology';

interface UseNumerologyReturn {
  result: NumerologyResult | null;
  compatibility: CompatibilityResult | null;
  loading: boolean;
  error: string | null;
  calculatePersonal: (day: number, month: number, year: number, fullName: string) => void;
  calculateCouple: (
    day1: number, month1: number, year1: number,
    day2: number, month2: number, year2: number
  ) => void;
  reset: () => void;
}

export function useNumerology(): UseNumerologyReturn {
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatePersonal = useCallback((
    day: number, 
    month: number, 
    year: number, 
    fullName: string
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate mystical calculation delay
      setTimeout(() => {
        const numerologyResult = calculateNumerology(day, month, year, fullName);
        setResult(numerologyResult);
        setCompatibility(null);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Error al calcular tu numerología. Verifica los datos ingresados.');
      setLoading(false);
    }
  }, []);

  const calculateCouple = useCallback((
    day1: number, month1: number, year1: number,
    day2: number, month2: number, year2: number
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate mystical calculation delay
      setTimeout(() => {
        const compatResult = calculateCompatibility(
          day1, month1, year1,
          day2, month2, year2
        );
        setCompatibility(compatResult);
        setResult(null);
        setLoading(false);
      }, 1800);
    } catch (err) {
      setError('Error al calcular la compatibilidad. Verifica los datos ingresados.');
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setCompatibility(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    result,
    compatibility,
    loading,
    error,
    calculatePersonal,
    calculateCouple,
    reset
  };
}
