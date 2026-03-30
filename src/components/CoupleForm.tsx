import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MysticalButton } from './MagicParticles';
import { Calendar, Heart, User } from 'lucide-react';

interface CoupleFormProps {
  onSubmit: (
    day1: number, month1: number, year1: number,
    day2: number, month2: number, year2: number
  ) => void;
  loading: boolean;
}

export function CoupleForm({ onSubmit, loading }: CoupleFormProps) {
  const [person1, setPerson1] = useState({ day: '', month: '', year: '', name: '' });
  const [person2, setPerson2] = useState({ day: '', month: '', year: '', name: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const day1 = parseInt(person1.day);
    const month1 = parseInt(person1.month);
    const year1 = parseInt(person1.year);
    const day2 = parseInt(person2.day);
    const month2 = parseInt(person2.month);
    const year2 = parseInt(person2.year);
    
    if (!day1 || day1 < 1 || day1 > 31) newErrors.day1 = 'Día inválido';
    if (!month1 || month1 < 1 || month1 > 12) newErrors.month1 = 'Mes inválido';
    if (!year1 || year1 < 1900 || year1 > 2100) newErrors.year1 = 'Año inválido';
    
    if (!day2 || day2 < 1 || day2 > 31) newErrors.day2 = 'Día inválido';
    if (!month2 || month2 < 1 || month2 > 12) newErrors.month2 = 'Mes inválido';
    if (!year2 || year2 < 1900 || year2 > 2100) newErrors.year2 = 'Año inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(
        parseInt(person1.day), parseInt(person1.month), parseInt(person1.year),
        parseInt(person2.day), parseInt(person2.month), parseInt(person2.year)
      );
    }
  };

  const inputClass = (errorKey: string) => `
    bg-purple-950/50 border-purple-500/50 text-white placeholder:text-purple-400/50
    focus:border-amber-400 focus:ring-amber-400/20 text-center
    ${errors[errorKey] ? 'border-red-500' : ''}
  `;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Person 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <User className="w-5 h-5" />
          <h3 className="font-semibold">Persona 1</h3>
        </div>
        
        <div className="space-y-2">
          <Label className="text-purple-200 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha de Nacimiento
          </Label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Input
                type="number"
                value={person1.day}
                onChange={(e) => setPerson1({ ...person1, day: e.target.value })}
                placeholder="Día"
                min="1"
                max="31"
                className={inputClass('day1')}
              />
              {errors.day1 && <p className="text-red-400 text-xs mt-1 text-center">{errors.day1}</p>}
            </div>
            <div>
              <Input
                type="number"
                value={person1.month}
                onChange={(e) => setPerson1({ ...person1, month: e.target.value })}
                placeholder="Mes"
                min="1"
                max="12"
                className={inputClass('month1')}
              />
              {errors.month1 && <p className="text-red-400 text-xs mt-1 text-center">{errors.month1}</p>}
            </div>
            <div>
              <Input
                type="number"
                value={person1.year}
                onChange={(e) => setPerson1({ ...person1, year: e.target.value })}
                placeholder="Año"
                min="1900"
                max="2100"
                className={inputClass('year1')}
              />
              {errors.year1 && <p className="text-red-400 text-xs mt-1 text-center">{errors.year1}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Heart divider */}
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-500"
        >
          <Heart className="w-8 h-8 fill-pink-500" />
        </motion.div>
      </div>

      {/* Person 2 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <User className="w-5 h-5" />
          <h3 className="font-semibold">Persona 2</h3>
        </div>
        
        <div className="space-y-2">
          <Label className="text-purple-200 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha de Nacimiento
          </Label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Input
                type="number"
                value={person2.day}
                onChange={(e) => setPerson2({ ...person2, day: e.target.value })}
                placeholder="Día"
                min="1"
                max="31"
                className={inputClass('day2')}
              />
              {errors.day2 && <p className="text-red-400 text-xs mt-1 text-center">{errors.day2}</p>}
            </div>
            <div>
              <Input
                type="number"
                value={person2.month}
                onChange={(e) => setPerson2({ ...person2, month: e.target.value })}
                placeholder="Mes"
                min="1"
                max="12"
                className={inputClass('month2')}
              />
              {errors.month2 && <p className="text-red-400 text-xs mt-1 text-center">{errors.month2}</p>}
            </div>
            <div>
              <Input
                type="number"
                value={person2.year}
                onChange={(e) => setPerson2({ ...person2, year: e.target.value })}
                placeholder="Año"
                min="1900"
                max="2100"
                className={inputClass('year2')}
              />
              {errors.year2 && <p className="text-red-400 text-xs mt-1 text-center">{errors.year2}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <MysticalButton disabled={loading}>
          {loading ? 'Consultando las estrellas...' : 'Revelar Compatibilidad'}
        </MysticalButton>
      </div>
    </motion.form>
  );
}
