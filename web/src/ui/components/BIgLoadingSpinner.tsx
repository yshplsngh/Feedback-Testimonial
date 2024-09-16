export default function BigLoadingSpinner() {
  return (
    <div className="z-40 flex items-center justify-center">
      <div className={`loading-spinner relative h-20 w-20`}>
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
              left: '-10%',
              top: '-4%',
              transform: `rotate(${30 * i}deg) translate(120%)`,
            }}
            className="animate-spinner"
          />
        ))}
      </div>
    </div>
  );
}
