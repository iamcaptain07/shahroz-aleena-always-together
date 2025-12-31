import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiController({ trigger }) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      // New Year themed colors
      const colors = ['#D4AF37', '#FFCAD4', '#F8F1E7', '#FFFFFF'];

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: colors,
        });

        // Launch from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: colors,
        });
      }, 250);

      // Final burst
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
          zIndex: 9999,
        });
      }, duration - 500);
    }

    // Reset trigger ref when trigger becomes false
    if (!trigger) {
      hasTriggeredRef.current = false;
    }
  }, [trigger]);

  return null;
}

