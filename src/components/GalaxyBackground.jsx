import { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Projection configuration
    const fov = 750;
    const cameraDistance = 900;

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Calculate mouse displacement relative to center
      mouse.targetX = e.clientX - width / 2;
      mouse.targetY = e.clientY - height / 2;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Class for 3D Stars
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        // Logarithmic distribution: denser near the core, tapering off at the edges
        this.rSpace = Math.pow(Math.random(), 3) * 500 + 10;
        
        // 4 spiral arms
        this.arms = 4;
        this.arm = Math.floor(Math.random() * this.arms);
        
        const armAngle = (this.arm * 2 * Math.PI) / this.arms;
        const spiralFactor = 0.007; // how tightly wound the spiral is
        
        // Arm angle + winding factor + random spread
        this.angle = armAngle + this.rSpace * spiralFactor + (Math.random() - 0.5) * 0.4;
        
        // Disk thickness profile: thicker in core, thinner in arms
        const diskThickness = 15 + this.rSpace * 0.06;
        this.ySpace = (Math.random() - 0.5) * (Math.random() - 0.5) * diskThickness;

        // Orbital speed decreases with distance (flat-ish galaxy rotation curve)
        this.speed = 0.004 + (8 / (this.rSpace + 60));
        this.speed *= (Math.random() * 0.3 + 0.85);

        // Particle size
        this.sizeBase = Math.random() * 1.6 + 0.3;
        if (Math.random() > 0.98) {
          this.sizeBase = Math.random() * 2 + 1.6; // supergiant stars
        }

        // Star colors based on distance to core (warmer/white in center, cyan/indigo/purple in arms)
        const colors = [
          'rgba(244, 63, 94, ',   // Pink / Rose
          'rgba(168, 85, 247, ',  // Purple
          'rgba(99, 102, 241, ',  // Indigo
          'rgba(6, 182, 212, ',   // Cyan (Sky Blue)
          'rgba(255, 255, 255, ', // Pure White
        ];

        let colorIdx;
        if (this.rSpace < 60) {
          colorIdx = Math.random() > 0.4 ? 4 : 0; // mostly white/rose core
        } else if (this.rSpace < 220) {
          colorIdx = Math.random() > 0.5 ? 1 : 2; // purple/indigo mid-section
        } else {
          const rand = Math.random();
          colorIdx = rand > 0.65 ? 3 : (rand > 0.3 ? 2 : 4); // cyan/indigo/white arms
        }

        this.colorBase = colors[colorIdx];
        
        // Setup blinking/twinkling configuration
        // Enable blinking/twinkling for all star colors (pink, purple, indigo, cyan, white) at randomized rates
        this.isBlinker = Math.random() > 0.15; // 85% of all stars blink dynamically
        if (this.isBlinker) {
          this.pulseSpeed = Math.random() * 0.045 + 0.015; // Sparkling rate
          this.minAlpha = Math.random() * 0.15 + 0.03; // Fades out significantly
          this.maxAlpha = Math.random() * 0.2 + 0.8; // Reaches high brightness
        } else {
          this.pulseSpeed = Math.random() * 0.01 + 0.003; // Gentle slow transition
          this.minAlpha = 0.25;
          this.maxAlpha = 0.8;
        }

        this.alpha = Math.random() * (this.maxAlpha - this.minAlpha) + this.minAlpha;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;

        // Projection properties
        this.x3d = 0;
        this.y3d = 0;
        this.z3d = 0;
        this.projX = 0;
        this.projY = 0;
        this.projScale = 0;
        this.depth = 0;
      }

      update(tiltX, tiltY) {
        // Increment orbit angle
        this.angle += this.speed * 0.25;

        // Calculate raw position in galaxy coordinate system
        const xSpace = this.rSpace * Math.cos(this.angle);
        const zSpace = this.rSpace * Math.sin(this.angle);
        const ySpace = this.ySpace;

        // 3D rotation: step 1, rotate around X-axis (incline tilt)
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const yRot1 = ySpace * cosX - zSpace * sinX;
        const zRot1 = ySpace * sinX + zSpace * cosX;

        // 3D rotation: step 2, rotate around Y-axis (spinning)
        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const xRot2 = xSpace * cosY + zRot1 * sinY;
        const zRot2 = -xSpace * sinY + zRot1 * cosY;

        this.x3d = xRot2;
        this.y3d = yRot1;
        this.z3d = zRot2;

        // Project onto 2D viewport
        this.projScale = fov / (cameraDistance + this.z3d);
        this.projX = width / 2 + this.x3d * this.projScale;
        this.projY = height / 2 + this.y3d * this.projScale;
        this.depth = this.z3d;

        // Twinkle pulse logic
        this.alpha += this.pulseSpeed * this.pulseDir;
        if (this.alpha > this.maxAlpha) {
          this.alpha = this.maxAlpha;
          this.pulseDir = -1;
        } else if (this.alpha < this.minAlpha) {
          this.alpha = this.minAlpha;
          this.pulseDir = 1;
        }
      }

      draw() {
        if (
          this.projX < -50 ||
          this.projX > width + 50 ||
          this.projY < -50 ||
          this.projY > height + 50 ||
          this.projScale <= 0
        ) {
          return;
        }

        const size = this.sizeBase * this.projScale * 1.35;
        const opacity = this.alpha * Math.min(this.projScale * 1.6, 1);

        ctx.beginPath();
        ctx.arc(this.projX, this.projY, size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${opacity})`;

        // Glow effect for large closer stars
        if (size > 2.2 && opacity > 0.45) {
          ctx.shadowBlur = size * 3.5;
          ctx.shadowColor = this.colorBase.replace('rgba', 'rgb').split(',').slice(0, 3).join(',') + ')';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
    }

    // 3D Nebula Cloud Class
    class Nebula3D {
      constructor() {
        this.reset();
      }

      reset() {
        this.rSpace = Math.random() * 340 + 20;
        this.angle = Math.random() * Math.PI * 2;
        this.ySpace = (Math.random() - 0.5) * 45;
        this.speed = 0.0006 + (0.4 / (this.rSpace + 80));
        
        // Large footprint cloud sizes
        this.baseSize = Math.random() * 130 + 90;

        const colors = [
          'rgba(76, 29, 149, ',  // Deep Violet
          'rgba(14, 116, 144, ', // Cyan / Teal
          'rgba(131, 24, 73, ',  // Magenta / Pink
          'rgba(30, 27, 75, ',   // Deep Indigo
        ];
        
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.maxOpacity = Math.random() * 0.06 + 0.025; // extremely faint blending

        this.x3d = 0;
        this.y3d = 0;
        this.z3d = 0;
        this.projX = 0;
        this.projY = 0;
        this.projScale = 0;
        this.depth = 0;
      }

      update(tiltX, tiltY) {
        this.angle += this.speed * 0.2;

        const xSpace = this.rSpace * Math.cos(this.angle);
        const zSpace = this.rSpace * Math.sin(this.angle);
        const ySpace = this.ySpace;

        // Perform 3D tilts
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const yRot1 = ySpace * cosX - zSpace * sinX;
        const zRot1 = ySpace * sinX + zSpace * cosX;

        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const xRot2 = xSpace * cosY + zRot1 * sinY;
        const zRot2 = -xSpace * sinY + zRot1 * cosY;

        this.x3d = xRot2;
        this.y3d = yRot1;
        this.z3d = zRot2;

        this.projScale = fov / (cameraDistance + this.z3d);
        this.projX = width / 2 + this.x3d * this.projScale;
        this.projY = height / 2 + this.y3d * this.projScale;
        this.depth = this.z3d;
      }

      draw() {
        const size = this.baseSize * this.projScale;
        if (
          this.projX < -size ||
          this.projX > width + size ||
          this.projY < -size ||
          this.projY > height + size ||
          this.projScale <= 0
        ) {
          return;
        }

        ctx.shadowBlur = 0;
        const grad = ctx.createRadialGradient(
          this.projX, this.projY, 0,
          this.projX, this.projY, size
        );
        
        grad.addColorStop(0, `${this.colorBase}${this.maxOpacity})`);
        grad.addColorStop(0.45, `${this.colorBase}${this.maxOpacity * 0.4})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(this.projX, this.projY, size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Glowing Shooting Star Class
    class ShootingStar {
      constructor() {
        this.reset();
        this.active = false;
        // Stagger spawn delay
        this.spawnTimer = Math.random() * 300 + 50;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.5);
        this.length = Math.random() * 90 + 40;
        this.speedX = -(Math.random() * 11 + 6);
        this.speedY = Math.random() * 3.5 + 1.5;
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.025 + 0.015;
        this.active = false;
        this.spawnTimer = Math.random() * 500 + 350;
      }

      update() {
        if (!this.active) {
          this.spawnTimer--;
          if (this.spawnTimer <= 0) {
            this.active = true;
          }
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0 || this.x < -150 || this.y > height + 150) {
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;

        ctx.shadowBlur = 0;
        const grad = ctx.createLinearGradient(
          this.x, this.y,
          this.x - this.length * (this.speedX / 10), this.y - this.length * (this.speedY / 10)
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        grad.addColorStop(0.15, `rgba(6, 182, 212, ${this.opacity * 0.75})`);
        grad.addColorStop(0.55, `rgba(168, 85, 247, ${this.opacity * 0.25})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.random() * 1.5 + 1;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.length * (this.speedX / 12),
          this.y - this.length * (this.speedY / 12)
        );
        ctx.stroke();
      }
    }

    // Populate stars and nebulae
    const starCount = 650;
    const nebulaCount = 12;
    const stars = [];
    const nebulae = [];
    const shootingStars = [new ShootingStar(), new ShootingStar()];

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push(new Nebula3D());
    }

    let time = 0;
    let curTiltX = 0.55; // Base angle inclination (tilt relative to X-axis)
    let curTiltY = 0;

    const animate = () => {
      time += 0.001;

      // Track target tilts (base orbital angle + mouse hover displacement)
      const targetTiltX = 0.65 + (mouse.targetY / height) * 0.22;
      const targetTiltY = time + (mouse.targetX / width) * 0.22;

      // Smooth interpolation (lerp)
      curTiltX += (targetTiltX - curTiltX) * 0.055;
      curTiltY += (targetTiltY - curTiltY) * 0.055;

      // Clear the canvas completely so stars can twinkle sharply without trailing accumulation
      ctx.clearRect(0, 0, width, height);

      // Reset shadows
      ctx.shadowBlur = 0;

      // Update positions
      stars.forEach(s => s.update(curTiltX, curTiltY));
      nebulae.forEach(n => n.update(curTiltX, curTiltY));
      shootingStars.forEach(s => s.update());

      // Z-Buffer depth sorting: sort all elements so back objects are rendered first
      const drawList = [...stars, ...nebulae];
      drawList.sort((a, b) => b.depth - a.depth);

      // Render elements in sorted order
      drawList.forEach(item => item.draw());

      // Render shooting stars overlay on top
      shootingStars.forEach(s => s.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, #0e0a21 0%, #040209 100%)',
      }}
    />
  );
};

export default GalaxyBackground;
