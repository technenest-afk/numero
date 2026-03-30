import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function MagicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const colors = ['#c9a227', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'];
    const particleCount = 30;
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export function FloatingSymbol({ symbol, delay = 0 }: { symbol: string; delay?: number }) {
  return (
    <motion.div
      className="absolute text-4xl opacity-20 select-none"
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 360],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay
        }
      }}
      style={{
        textShadow: '0 0 20px rgba(201, 162, 39, 0.5)'
      }}
    >
      {symbol}
    </motion.div>
  );
}

export function NumberCard({ 
  number, 
  title, 
  meaning, 
  delay = 0 
}: { 
  number: number; 
  title: string; 
  meaning: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm 
                 border border-purple-500/30 rounded-xl p-6 overflow-hidden group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-purple-500/10 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Number display */}
      <div className="relative z-10">
        <motion.div
          className="text-6xl font-bold text-center mb-3"
          style={{
            background: 'linear-gradient(135deg, #c9a227 0%, #f0d78c 50%, #c9a227 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(201, 162, 39, 0.3)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: delay + 0.2 }}
        >
          {number}
        </motion.div>
        
        <h3 className="text-lg font-semibold text-center text-purple-200 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {meaning}
        </p>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0 0 L100 0 L100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-amber-400"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export function MysticalButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary'
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30' 
          : 'bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20'}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function LoadingMystical() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full" />
        
        {/* Inner rotating element */}
        <motion.div
          className="absolute inset-2 border-4 border-t-amber-400 border-r-transparent 
                     border-b-purple-400 border-l-transparent rounded-full"
          animate={{ rotate: -720 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">✦</span>
        </div>
      </motion.div>
      
      <motion.p
        className="mt-6 text-purple-300 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Revelando los secretos del universo...
      </motion.p>
    </div>
  );
}
