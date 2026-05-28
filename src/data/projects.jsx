import React from 'react';
import projectSolarSystem from '../assets/project_solar_system.png';
import projectCosmicAnalytics from '../assets/project_cosmic_analytics.png';
import projectNebulaPortal from '../assets/project_nebula_portal.png';
import projectStarMap from '../assets/project_star_map.png';
import projectBlackHole from '../assets/project_black_hole.png';
import projectQuantumOrbital from '../assets/project_quantum_orbital.png';

const projectsList = [
  {
    id: 0,
    title: '3D Solar System',
    category: 'Creative Dev / WebGL',
    image: projectSolarSystem,
    desc: 'An interactive, physically accurate Three.js simulation of planetary orbits, gravitational gravity wells, and custom stellar materials.',
    fullDesc: 'The 3D Solar System is a high-performance WebGL application that simulates celestial mechanics in real-time. Built using Three.js and custom GLSL shaders, it provides an educational yet visually stunning exploration of our solar system. The simulator includes orbital calculations, scale modeling, and gravity well visualizations to give users an intuitive understanding of physics in space.',
    role: 'Lead Creative Developer',
    date: 'Jan 2025 - Mar 2025',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Three.js', 'WebGL', 'Physics Engine', 'React', 'GLSL'],
    glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
    color: 'var(--accent-cyan)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    features: [
      'Real-time orbital mechanics simulation using Runge-Kutta numerical integration.',
      'Custom planet shaders with dynamic clouds, atmosphere scattering, and ring shadow mapping.',
      'Interactive control panel for modifying gravity, time scale, and orbital speeds.',
      'Fully responsive UI overlay showing detailed telemetry data for each celestial body.'
    ],
    challenges: [
      'Rendering complex planetary shaders smoothly at 60 FPS on lower-end mobile devices.',
      'Accurately modeling orbital scales without making outer planets invisible due to extreme distances.'
    ],
    solutions: [
      'Implemented shader optimizations (LOD filtering) and offloaded physics calculations to Web Workers to keep the main thread free.',
      'Created a "visual scale" mode that uses logarithmic spacing for distances while preserving real proportional planetary sizes.'
    ]
  },
  {
    id: 1,
    title: 'Cosmic Analytics',
    category: 'Data Science / Frontend',
    image: projectCosmicAnalytics,
    desc: 'Next-gen telemetry visualization dashboard plotting real-time dark matter streams, cosmic ray impacts, and system health graphs.',
    fullDesc: 'Cosmic Analytics is a modern telemetry dashboard designed for visualizing massive real-time scientific datasets. Developed for monitoring astrophysics laboratory sensors, it streams real-time data through WebSockets and visualizes it using high-performance Chart.js canvases, allowing researchers to track cosmic ray spikes and anomalous energy readings seamlessly.',
    role: 'Lead Frontend Engineer',
    date: 'Nov 2024 - Dec 2024',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'Chart.js', 'WebSockets', 'Tailwind', 'Node.js'],
    glow: 'rgba(236, 72, 153, 0.15)', // Pink glow
    color: 'var(--accent-pink)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    features: [
      'Real-time stream visualization with sub-50ms latency using WebSocket connections.',
      'Interactive historical charts with zoom, pan, and custom statistical aggregations.',
      'Alerting system that triggers sound alerts and push notifications on critical threshold breaches.',
      'Exportable CSV and PDF reports generated on-the-fly from the dashboard.'
    ],
    challenges: [
      'Memory leaks and browser lag caused by rendering thousands of data points per second in real-time.',
      'Maintaining state consistency across multiple widgets and dashboard sub-panels.'
    ],
    solutions: [
      'Utilized chart data buffering and requestAnimationFrame throttling to limit canvas repaints. Used chart.js streaming plugins.',
      'Implemented a centralized Redux store with optimized selectors to prevent unnecessary component re-renders.'
    ]
  },
  {
    id: 2,
    title: 'Nebula Portal',
    category: 'Full-Stack / Web3',
    image: projectNebulaPortal,
    desc: 'A decentralized spatial portal enabling users to mint unique generative star systems and trade ownership via smart contracts.',
    fullDesc: 'Nebula Portal merges generative art with Web3 technology, allowing space enthusiasts to explore and trade custom star systems. Each system is procedurally generated using p5.js based on its unique blockchain token seed, ensuring no two star systems are alike. The backend interacts directly with Ethereum smart contracts for ownership verification.',
    role: 'Full Stack Web3 Developer',
    date: 'Sep 2024 - Oct 2024',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Solidity', 'Ethers.js', 'Node.js', 'GLSL Shaders', 'p5.js'],
    glow: 'rgba(168, 85, 247, 0.15)', // Purple glow
    color: 'var(--accent-purple)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    features: [
      'Procedural star system generation based on ERC-721 token seeds.',
      'Interactive 3D viewport for inspecting generated star systems inside the browser.',
      'Decentralized trading marketplace with real-time bidding and history charts.',
      'Metamask and WalletConnect integration with custom smart contract listeners.'
    ],
    challenges: [
      'High gas fees during procedural generation metadata storage directly on the Ethereum blockchain.',
      'Synchronizing blockchain transaction confirmations with the centralized web server state.'
    ],
    solutions: [
      'Adopted IPFS for decentralized metadata storage, keeping only the 256-bit seed on-chain to minimize transaction costs.',
      'Developed a reliable Node.js listener service that polls blockchain events and updates the web database asynchronously.'
    ]
  },
  {
    id: 3,
    title: 'Star Map Explorer',
    category: 'Astronomy / Data Vis',
    image: projectStarMap,
    desc: 'Interactive 3D starmap rendering nearby stars and constellations using custom astronomical databases.',
    fullDesc: 'Star Map Explorer is a detailed data visualization tool mapping over 10,000 stellar objects near our solar system. Using actual Hipparcos catalog data, it maps star coordinates, absolute magnitudes, and spectral classes into a fully interactive 3D WebGL space.',
    role: 'Frontend & Data Developer',
    date: 'Jul 2024 - Aug 2024',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Three.js', 'D3.js', 'Canvas', 'Astronomy API', 'JSON'],
    glow: 'rgba(99, 102, 241, 0.15)', // Indigo glow
    color: 'var(--accent-indigo)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    features: [
      '3D Constellation mapping based on historical astronomical coordinates.',
      'Star spectral class coloring based on temperature and color index (B-V).',
      'Search utility capable of locating specific stars and centering the camera on them.',
      'Logarithmic distance zooming allowing navigation between immediate solar neighbors and distant stars.'
    ],
    challenges: [
      'Loading and parsing large astronomical datasets in the browser without freezing the user interface.',
      'Drawing constellation lines dynamically between moving relative nodes.'
    ],
    solutions: [
      'Loaded raw data as compressed binary files and parsed them on-the-fly using WebAssembly streams.',
      'Used Three.js line segments updating positions inside the rendering loop via optimized buffers.'
    ]
  },
  {
    id: 4,
    title: 'Event Horizon Raytracer',
    category: 'WebGL / Physics Shaders',
    image: projectBlackHole,
    desc: 'A real-time black hole raytracer demonstrating gravitational lensing effects on background starlight.',
    fullDesc: 'The Event Horizon Raytracer is a numerical relativity physics visualizer. Running completely inside a fragment shader, it calculates photon trajectories in the vicinity of a Schwarzschild and Kerr black hole, demonstrating how light bends (gravitational lensing) to form Einstein Rings.',
    role: 'GLSL / Shader Engineer',
    date: 'May 2024 - Jun 2024',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['GLSL', 'Shaders', 'React Three Fiber', 'Math.js', 'Vite'],
    glow: 'rgba(236, 72, 153, 0.15)', // Pink glow
    color: 'var(--accent-pink)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6a6 6 0 1 0 6 6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    features: [
      'Real-time Schwarzschild raymarching with adjustable black hole mass parameters.',
      'Accretion disk rendering with doppler beaming, relativistic shift, and temperature glows.',
      'Background stars gravitational lensing using custom spherical map integration.',
      'Interactive orbit mode allowing the camera to dive beyond the event horizon.'
    ],
    challenges: [
      'Writing non-linear gravity equations inside a fragment shader where standard recursion is unsupported.',
      'Creating realistic accretion disk materials that reactRelativistically to speed.'
    ],
    solutions: [
      'Solved numerical integration (Runge-Kutta 4th order) using structured loops inside the GLSL main function.',
      'Coded a custom multi-layered noise algorithm that calculates velocity vectors and applies a relativistic Doppler shifts directly in-shader.'
    ]
  },
  {
    id: 5,
    title: 'Quantum Orbital Modeler',
    category: 'Rust / WebAssembly',
    image: projectQuantumOrbital,
    desc: 'An electron orbital visualization modeling quantum probability clouds in real-time with WebAssembly.',
    fullDesc: 'The Quantum Orbital Modeler renders electron probability density functions (orbitals) for the hydrogen atom. By solving the Schrodinger equation in WebAssembly, it allows real-time rendering of high-order quantum orbitals (s, p, d, f) inside an interactive 3D WebGL view.',
    role: 'Wasm & Frontend Developer',
    date: 'Mar 2024 - Apr 2024',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['WebGL', 'WebAssembly', 'Rust', 'React', 'Rust-Wasm'],
    glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
    color: 'var(--accent-cyan)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(30 12 5)" />
        <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(-30 12 5)" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    features: [
      'Interactive Schrodinger wave function solver for any set of quantum numbers (n, l, m).',
      'High-performance 3D point cloud generation using WebAssembly compiled from Rust.',
      'Real-time orbital transition animation demonstrating quantum state jumps.',
      'Fully customizable visual parameters including phase colors, density scales, and slice planes.'
    ],
    challenges: [
      'Computing complex spherical harmonics and Laguerre polynomials on 50,000+ points at 60 FPS in JavaScript.',
      'Transferring massive arrays of points between WebAssembly memory and WebGL buffers efficiently.'
    ],
    solutions: [
      'Ported math solvers entirely to Rust, achieving a 15x computational speedup over standard JS libraries.',
      'Used direct memory sharing via WebAssembly.Memory, updating WebGL buffer data pointer offsets without doing array copies.'
    ]
  }
];

export default projectsList;
