import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { annotate } from 'rough-notation';

// Magic UI Highlighter, adapted to the portfolio's existing motion library.
export default function Highlighter({ children, action = 'highlight', color, reduced, isView = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const visible = !isView || inView;

  useEffect(() => {
    if (!visible) return;

    const annotation = annotate(ref.current, {
      type: action,
      color,
      animate: !reduced,
      animationDuration: 650,
      multiline: true,
      iterations: 1,
      strokeWidth: 3,
      padding: 2
    });
    annotation.show();
    return () => annotation.remove();
  }, [action, color, reduced, visible]);

  return <span ref={ref} className="text-highlighter">{children}</span>;
}
