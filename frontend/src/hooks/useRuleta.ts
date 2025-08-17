import { useState, useCallback, useRef } from "react";

export function useRuleta(length: number, initialIndex = 0) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const touchStartY = useRef<number | null>(null);

  const clampIndex = useCallback(
    (index: number) => {
      // Cicla entre 0 y length - 1 (modo circular)
      return (index + length) % length;
    },
    [length]
  );

  const selectIndex = useCallback(
    (index: number) => {
      setSelectedIndex(clampIndex(index));
    },
    [clampIndex]
  );

  // Control rueda ratón
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) selectIndex(selectedIndex - 1);
      else if (e.deltaY > 0) selectIndex(selectedIndex + 1);
    },
    [selectedIndex, selectIndex]
  );

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = touchStartY.current - currentY;

      if (Math.abs(diff) > 20) {
        if (diff > 0) selectIndex(selectedIndex + 1);
        else selectIndex(selectedIndex - 1);
        touchStartY.current = currentY;
      }
    },
    [selectedIndex, selectIndex]
  );

  const onTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

  return {
    selectedIndex,
    selectIndex,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
