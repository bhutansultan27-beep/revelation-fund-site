import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const floatingVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, Math.sin(i) * 20, 0],
      opacity: [0.3, 0.6, 0.3],
    }),
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9f6 50%, #ffffff 100%)' }} />
      
      {/* Animated radial gradients */}
      <motion.div
        className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(circle, rgba(26, 143, 78, 0.15) 0%, transparent 70%)',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(13, 77, 41, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Floating accent circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          custom={i}
          animate="animate"
          variants={floatingVariants}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(26, 143, 78, ${0.05 - i * 0.01}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}
    </div>
  );
}
