import { motion } from 'framer-motion';
import { type NumerologyResult, getNumberSymbol } from '@/lib/numerology';
import { NumberCard, MysticalButton } from './MagicParticles';
import { Sparkles, Star, Moon, Sun, Heart, Eye, Crown } from 'lucide-react';

interface PersonalResultProps {
  result: NumerologyResult;
  onReset: () => void;
}

export function PersonalResult({ result, onReset }: PersonalResultProps) {
  const lifePathSymbol = getNumberSymbol(result.lifePath);
  
  const cards = [
    { 
      number: result.lifePath, 
      title: 'Camino de Vida', 
      meaning: result.lifePathMeaning,
      icon: Star
    },
    { 
      number: result.soulUrge, 
      title: 'Deseo del Alma', 
      meaning: result.soulUrgeMeaning,
      icon: Heart
    },
    { 
      number: result.expression, 
      title: 'Expresión', 
      meaning: result.expressionMeaning,
      icon: Sparkles
    },
    { 
      number: result.personality, 
      title: 'Personalidad', 
      meaning: result.personalityMeaning,
      icon: Eye
    },
    { 
      number: result.birthday, 
      title: 'Número del Día', 
      meaning: result.birthdayMeaning,
      icon: Sun
    },
    { 
      number: result.maturity, 
      title: 'Madurez', 
      meaning: `Tu número de madurez es ${result.maturity}. Esto representa quién te convertirás en la segunda mitad de tu vida.`,
      icon: Crown
    },
  ];

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
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-purple-300 to-amber-400 
                         bg-clip-text text-transparent">
            Tu Mapa Numerológico
          </h2>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        
        {/* Life Path Highlight */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="inline-flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br 
                     from-amber-600/30 to-purple-600/30 border border-amber-500/50"
        >
          <span className="text-purple-200 text-sm mb-2">Tu Número Principal</span>
          <div className="text-7xl font-bold text-amber-400 mb-2"
               style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}>
            {result.lifePath}
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <span className="text-2xl">{lifePathSymbol.symbol}</span>
            <span>{lifePathSymbol.element}</span>
            <span>•</span>
            <span>{lifePathSymbol.planet}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <NumberCard
            key={card.title}
            number={card.number}
            title={card.title}
            meaning={card.meaning}
            delay={0.1 * (index + 1)}
          />
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 
                   border border-purple-500/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-purple-200">Interpretación General</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Tu numerología revela un alma con propósito {result.lifePath === 1 || result.lifePath === 8 ? 'liderazgo' : 
            result.lifePath === 2 || result.lifePath === 6 ? 'cooperación y servicio' :
            result.lifePath === 3 || result.lifePath === 5 ? 'expresión y libertad' :
            result.lifePath === 4 || result.lifePath === 7 ? 'construcción y conocimiento' :
            'espiritualidad y compasión'}. 
          El número {result.lifePath} como tu Camino de Vida indica que tu misión es 
          {result.lifePathMeaning.split('.')[0].toLowerCase()}.
          Tu alma anhela {result.soulUrgeMeaning.split('.')[0].toLowerCase()}, 
          y tu forma natural de expresarte es {result.expressionMeaning.split('.')[0].toLowerCase()}.
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
