import { motion } from 'framer-motion';

const transition = { duration: 1.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' };

export default function ProjectMotionGraphic({ type, reduced }) {
  const animated = reduced ? {} : { transition };
  if (type === 'publishing') return <svg className="project-motion-svg" viewBox="0 0 520 300" aria-hidden="true">
    <path className="motion-line" d="M112 150H236M284 150H408" />
    <motion.circle className="motion-pulse" cx="110" cy="150" r="43" animate={reduced ? {} : { r: [43, 49, 43], opacity: [.7, 1, .7] }} {...animated} />
    <circle className="motion-node" cx="110" cy="150" r="28" /><path className="motion-icon" d="M96 138h28v25H96zM101 132h18" />
    <motion.circle className="motion-pulse" cx="260" cy="150" r="43" animate={reduced ? {} : { r: [43, 49, 43], opacity: [1, .7, 1] }} {...animated} />
    <circle className="motion-node" cx="260" cy="150" r="28" /><path className="motion-icon" d="m246 151 9 9 19-22" />
    <circle className="motion-node" cx="410" cy="150" r="28" /><path className="motion-icon" d="M397 137h26v26h-26zM402 145h16M402 153h11" />
    <motion.circle className="motion-traveller" r="6" animate={reduced ? {} : { offsetDistance: ['0%', '100%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: 'path("M112 150H408")' }} />
    <text x="110" y="230">DRAFT</text><text x="260" y="230">REVIEW</text><text x="410" y="230">PUBLISH</text>
  </svg>;
  if (type === 'lab') return <svg className="project-motion-svg" viewBox="0 0 520 300" aria-hidden="true">
    <path className="motion-line" d="M100 215V92H254V215H420" /><path className="motion-line muted" d="M254 92V48M100 150H420" />
    {[100, 254, 420].map((x, i) => <motion.g key={x} animate={reduced ? {} : { y: i === 1 ? [-7, 7, -7] : [6, -6, 6] }} transition={{ ...transition, delay: i * .24 }}><rect className="motion-bar" x={x - 29} y={i === 1 ? 110 : 162} width="58" height={i === 1 ? 105 : 53} rx="7" /><text x={x} y="244">{['STOCK', 'SAMPLES', 'SAFETY'][i]}</text></motion.g>)}
    <motion.path className="motion-scan" d="M73 150H447" animate={reduced ? {} : { pathLength: [0, 1], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
  </svg>;
  if (type === 'event') return <svg className="project-motion-svg" viewBox="0 0 520 300" aria-hidden="true">
    <path className="motion-axis" d="M82 221H456M82 52V221" />
    {[{ x: 130, h: 78 }, { x: 220, h: 122 }, { x: 310, h: 166 }, { x: 400, h: 106 }].map(({ x, h }, i) => <motion.rect key={x} className="motion-bar" x={x - 22} width="44" rx="7" animate={reduced ? { y: 221 - h, height: h } : { y: [221, 221 - h, 221 - h], height: [0, h, h] }} transition={{ duration: .85, delay: i * .16, repeat: reduced ? 0 : Infinity, repeatDelay: 1.8 }} />)}
    <motion.path className="motion-chart-line" d="M106 183C155 145 176 165 220 125s72 22 104-43 76 32 104-49" animate={reduced ? {} : { pathLength: [0, 1], opacity: [.25, 1, 1] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: .8 }} />
    <text x="82" y="252">LIVE ENGAGEMENT</text><text x="407" y="75">+42%</text>
  </svg>;
  return <svg className="project-motion-svg" viewBox="0 0 520 300" aria-hidden="true">
    <path className="motion-line" d="M260 150L125 78M260 150L395 78M260 150L125 222M260 150L395 222" />
    <motion.circle className="motion-pulse" cx="260" cy="150" r="62" animate={reduced ? {} : { r: [57, 66, 57], opacity: [.45, .9, .45] }} {...animated} />
    <circle className="motion-core" cx="260" cy="150" r="37" /><text className="motion-core-label" x="260" y="155">BRIDGE</text>
    {[[125,78,'IDEAS'],[395,78,'TEAMS'],[125,222,'LABS'],[395,222,'IMPACT']].map(([x,y,label],i) => <motion.g key={label} animate={reduced ? {} : { scale: [1, 1.11, 1] }} transition={{ ...transition, delay: i * .22 }}><circle className="motion-node" cx={x} cy={y} r="25" /><text x={x} y={y + 48}>{label}</text></motion.g>)}
  </svg>;
}
