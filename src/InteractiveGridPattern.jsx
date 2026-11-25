import { useEffect, useId, useRef } from 'react';

const CELL_SIZE = 42;

// Adapts Magic UI's Interactive Grid Pattern to a repeating SVG pattern.
export default function InteractiveGridPattern({ containerRef, interactive }) {
  const patternId = useId();
  const gridRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    const grid = gridRef.current;
    const highlight = highlightRef.current;

    function clear() {
      highlight.removeAttribute('data-active');
    }

    function move(event) {
      if (event.pointerType !== 'mouse') return;

      const matrix = grid.getScreenCTM();
      if (!matrix) return;

      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      highlight.setAttribute('x', Math.floor(point.x / CELL_SIZE) * CELL_SIZE);
      highlight.setAttribute('y', Math.floor(point.y / CELL_SIZE) * CELL_SIZE);
      highlight.setAttribute('data-active', '');
    }

    container.addEventListener('pointermove', move, { passive: true });
    container.addEventListener('pointerleave', clear);
    return () => {
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', clear);
      clear();
    };
  }, [containerRef, interactive]);

  return (
    <svg ref={gridRef} className="hero-interactive-grid" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
          <path d={`M ${CELL_SIZE} 0 H 0 V ${CELL_SIZE}`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <rect ref={highlightRef} className="hero-grid-highlight" width={CELL_SIZE} height={CELL_SIZE} />
    </svg>
  );
}
