import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MysticalButton } from './MagicParticles';
import { Calendar, User } from 'lucide-react';

interface PersonalFormProps {
  onSubmit: (day: number, month: number, year: number, fullName: string) => void;
  loading: boolean;
}

export function PersonalForm({ onSubmit, loading }: PersonalFormProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (!day || dayNum < 1 || dayNum > 31) {
      newErrors.day = 'Día inválido';
    }
    if (!month || monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Mes inválido';
    }
    if (!year || yearNum < 1900 || yearNum > 2100) {
      newErrors.year = 'Año inválido';
    }
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Ingresa tu nombre completo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(parseInt(day), parseInt(month), parseInt(year), fullName.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-purple-200 flex items-center gap-2">
          <User className="w-4 h-4" />
          Nombre Completo
        </Label>
        <div className="relative">
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ingresa tu nombre completo"
            className={`
              bg-purple-950/50 border-purple-500/50 text-white placeholder:text-purple-400/50
              focus:border-amber-400 focus:ring-amber-400/20
              ${errors.fullName ? 'border-red-500' : ''}
            `}
          />
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.fullName}
            </motion.p>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label className="text-purple-200 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Fecha de Nacimiento
        </Label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Día"
              min="1"
              max="31"
              className={`
                bg-purple-950/50 border-purple-500/50 text-white placeholder:text-purple-400/50
                focus:border-amber-400 focus:ring-amber-400/20 text-center
                ${errors.day ? 'border-red-500' : ''}
              `}
            />
            {errors.day && (
              <p className="text-red-400 text-xs mt-1 text-center">{errors.day}</p>
            )}
          </div>
          <div>
            <Input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Mes"
              min="1"
              max="12"
              className={`
                bg-purple-950/50 border-purple-500/50 text-white placeholder:text-purple-400/50
                focus:border-amber-400 focus:ring-amber-400/20 text-center
                ${errors.month ? 'border-red-500' : ''}
              `}
            />
            {errors.month && (
              <p className="text-red-400 text-xs mt-1 text-center">{errors.month}</p>
            )}
          </div>
          <div>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Año"
              min="1900"
              max="2100"
              className={`
                bg-purple-950/50 border-purple-500/50 text-white placeholder:text-purple-400/50
                focus:border-amber-400 focus:ring-amber-400/20 text-center
                ${errors.year ? 'border-red-500' : ''}
              `}
            />
            {errors.year && (
              <p className="text-red-400 text-xs mt-1 text-center">{errors.year}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <MysticalButton disabled={loading}>
          {loading ? 'Calculando...' : 'Revelar mi Numerología'}
        </MysticalButton>
      </div>
    </motion.form>
  );
}
