import { motion } from 'framer-motion';

export default function LoLoadingSpinner({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <div className="z-40 flex h-60 items-center justify-center">
        <div className={`loading-spinner relative h-10 w-10`}>
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
                left: '35%',
                top: '45%',
                transform: `rotate(${30 * i}deg) translate(120%)`,
              }}
              className="animate-spinner"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
