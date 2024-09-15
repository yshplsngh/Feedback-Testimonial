import React from 'react';

export default function Background() {
  return (
    <div style={styles.backgroundMain}>
      <div style={styles.backgroundMainBefore} />
      <div style={styles.backgroundMainAfter} />
      <div style={styles.backgroundMainGrid} />
      <div style={styles.backgroundContent} />
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  backgroundMain: {
    width: '100vw',
    minHeight: '100vh',
    position: 'fixed',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '120px 24px 160px 24px',
    // pointerEvents: "none",
    backgroundColor: '#1c1c1c', // Black background
  },
  backgroundMainBefore: {
    background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0, #1c1c1c 100%)', // Black gradient
    position: 'absolute',
    content: '""',
    zIndex: 2,
    width: '100%',
    height: '100%',
    top: 0,
  },
  backgroundMainAfter: {
    content: '""',
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 0.1,
  },
  backgroundMainGrid: {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 1,
    backgroundImage:
      'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
  backgroundContent: {
    zIndex: 3,
    width: '100%',
    maxWidth: '800px',
    backgroundImage: `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),
                      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 90%),
                      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 90%),
                      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 90%),
                      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 90%),
                      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 90%),
                      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 90%)`,
    position: 'absolute',
    height: '100%',
    filter: 'blur(100px) saturate(90%)',
    // top: "80px",
    opacity: 0.05,
  },
};
