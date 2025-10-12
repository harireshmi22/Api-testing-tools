'use client';

export function SplashScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      zIndex: 9999,
    }}>
      {/* You can add a logo or a spinner here */}
    </div>
  );
}
