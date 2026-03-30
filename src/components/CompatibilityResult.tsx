import { motion } from 'framer-motion';
import { type CompatibilityResult as CompatibilityResultType, getNumberSymbol } from '@/lib/numerology';
import { MysticalButton } from './MagicParticles';
import { Heart, Star, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface CompatibilityResultProps {
  result: CompatibilityResultType;
  onReset: () => void;
}

export function CompatibilityResult({ result, onReset }: CompatibilityResultProps) {
  const symbol1 = getNumberSymbol(result.lifePath1);
  const symbol2 = getNumberSymbol(result.lifePath2);
  
  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-400';
    if (score >= 80) return 'from-amber-500 to-yellow-400';
    if (score >= 70) return 'from-orange-500 to-amber-400';
    return 'from-pink-500 to-rose-400';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return 'Conexión Cósmica';
    if (score >= 80) return 'Muy Compatible';
    if (score >= 70) return 'Compatible';
    return 'Desafiante pero Transformador';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center items-center gap-3">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 
                         bg-clip-text text-transparent">
            Compatibilidad de Almas
          </h2>
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
        </div>
      </motion.div>

      {/* Life Path Numbers */}
      <div className="flex justify-center items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 
                          flex items-center justify-center text-4xl font-bold text-white mb-2
                          shadow-lg shadow-purple-500/30">
            {result.lifePath1}
          </div>
          <div className="text-2xl">{symbol1.symbol}</div>
          <div className="text-sm text-purple-300">{symbol1.element}</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          className="text-center"
        >
          <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 
                          flex items-center justify-center text-4xl font-bold text-white mb-2
                          shadow-lg shadow-amber-500/30">
            {result.lifePath2}
          </div>
          <div className="text-2xl">{symbol2.symbol}</div>
          <div className="text-sm text-purple-300">{symbol2.element}</div>
        </motion.div>
      </div>

      {/* Compatibility Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <div className={`
          inline-flex flex-col items-center p-8 rounded-3xl
          bg-gradient-to-br ${getCompatibilityColor(result.compatibility)}
          shadow-2xl
        `}>
          <span className="text-white/80 text-sm mb-2 uppercase tracking-wider">
            {getCompatibilityLabel(result.compatibility)}
          </span>
          <div className="text-7xl font-bold text-white mb-2"
               style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}>
            {result.compatibility}%
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(result.compatibility / 20) 
                    ? 'text-yellow-300 fill-yellow-300' 
                    : 'text-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 
                   border border-purple-500/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-purple-200">Interpretación Cósmica</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {result.description}
        </p>
      </motion.div>

      {/* Strengths & Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 
                     border border-green-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-300">Fortalezas</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-2 text-gray-300"
              >
                <span className="text-green-400 mt-1">✦</span>
                {strength}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl bg-gradient-to-br from-orange-900/40 to-red-900/40 
                     border border-orange-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-300">Desafíos</h3>
          </div>
          <ul className="space-y-2">
            {result.challenges.map((challenge, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-2 text-gray-300"
              >
                <span className="text-orange-400 mt-1">◆</span>
                {challenge}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Advice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="p-6 rounded-xl bg-gradient-to-r from-amber-900/30 to-purple-900/30 
                   border border-amber-500/30 text-center"
      >
        <p className="text-purple-200 italic">
          "Los números revelan tendencias, pero el amor y el esfuerzo mutuo son los verdaderos 
          arquitectos del destino. Usa esta sabiduría para crecer juntos."
        </p>
      </motion.div>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <MysticalButton onClick={onReset} variant="secondary">
          Nueva Consulta
        </MysticalButton>
      </div>
    </motion.div>
  );
}
