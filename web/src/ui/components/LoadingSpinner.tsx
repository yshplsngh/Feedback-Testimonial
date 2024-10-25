import { motion } from 'framer-motion';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-5 w-5${className}`}
    >
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
        }}
        className={`loading-spinner h-5 w-5 ${className}`}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              animationDelay: `${-1.2 + 0.1 * i}s`,
              background: 'gray',
              position: 'absolute',
              borderRadius: '1rem',
              width: '30%',
              height: '8%',
              left: '-15%',
              top: '-4%',
              transform: `rotate(${30 * i}deg) translate(120%)`,
            }}
            className="animate-spinner"
          />
        ))}
      </div>
    </motion.div>
  );
}
