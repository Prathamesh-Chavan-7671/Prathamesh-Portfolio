import { useRef } from 'react';
import { useInView } from 'framer-motion';

const reviewSteps = [
  'Check authentication and session handling',
  'Verify permissions for each user role',
  'Use parameterized database queries',
  'Review sensitive data handling',
  'Document findings and mitigations'
];

// Typing and staggered lines follow the Magic UI Terminal pattern.
export default function SecurityTerminal({ reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const sequence = reduced ? undefined : (inView ? 'playing' : 'waiting');

  return (
    <section ref={ref} className="security-terminal" aria-label="Application security review">
      <div className="security-terminal-header">Application security review</div>
      <div className="security-terminal-body" data-sequence={sequence}>
        <code className="security-terminal-prompt" aria-hidden="true">&gt; security-review</code>
        <ul>
          {reviewSteps.map((step, index) => (
            <li key={step} style={{ '--line-delay': `${0.56 + index * 0.16}s` }}>
              <span aria-hidden="true">→</span>{step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
