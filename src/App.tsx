import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNumerology } from '@/hooks/useNumerology';
import { MagicParticles, FloatingSymbol, LoadingMystical } from '@/components/MagicParticles';
import { PersonalForm } from '@/components/PersonalForm';
import { CoupleForm } from '@/components/CoupleForm';
import { PersonalResult } from '@/components/PersonalResult';
import { CompatibilityResult } from '@/components/CompatibilityResult';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Heart, Star, Moon } from 'lucide-react';
import './App.css';

type Mode = 'personal' | 'couple';

function App() {
  const [mode, setMode] = useState<Mode>('personal');
  const { 
    result, 
    compatibility, 
    loading, 
    error, 
    calculatePersonal, 
    calculateCouple, 
    reset 
  } = useNumerology();

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    reset();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <MagicParticles />
      
      {/* Floating Symbols */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingSymbol symbol="☉" delay={0} />
        <FloatingSymbol symbol="☽" delay={1} />
        <FloatingSymbol symbol="✦" delay={2} />
        <FloatingSymbol symbol="☿" delay={3} />
        <FloatingSymbol symbol="♃" delay={4} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-8 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full
                         bg-gradient-to-br from-amber-500 to-purple-600 shadow-lg shadow-amber-500/30"
            >
              <Star className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              <span className="text-gradient-gold">Numerología</span>
              <span className="text-gradient-purple"> Mística</span>
            </h1>
            
            <p className="text-purple-300/80 text-lg max-w-xl mx-auto">
              Descubre los secretos que los números revelan sobre tu destino y compatibilidad
            </p>
          </div>
        </motion.header>

        {/* Main Card */}
        <main className="flex-1 px-4 pb-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              {/* Mode Selector */}
              {!result && !compatibility && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <Tabs value={mode} onValueChange={(v) => handleModeChange(v as Mode)}>
                    <TabsList className="grid w-full grid-cols-2 bg-purple-950/50 p-1">
                      <TabsTrigger 
                        value="personal"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 
                                   data-[state=active]:to-amber-500 data-[state=active]:text-white
                                   text-purple-300 transition-all duration-300"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Individual
                      </TabsTrigger>
                      <TabsTrigger 
                        value="couple"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 
                                   data-[state=active]:to-pink-500 data-[state=active]:text-white
                                   text-purple-300 transition-all duration-300"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Pareja
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </motion.div>
              )}

              {/* Content */}
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingMystical />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="personal-result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PersonalResult result={result} onReset={reset} />
                  </motion.div>
                ) : compatibility ? (
                  <motion.div
                    key="compatibility-result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CompatibilityResult result={compatibility} onReset={reset} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {mode === 'personal' ? (
                      <PersonalForm 
                        onSubmit={calculatePersonal} 
                        loading={loading} 
                      />
                    ) : (
                      <CoupleForm 
                        onSubmit={calculateCouple} 
                        loading={loading} 
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-center"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-6 px-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-purple-400/60 text-sm">
            <Moon className="w-4 h-4" />
            <span>Los números no mienten, solo revelan</span>
            <Moon className="w-4 h-4" />
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
