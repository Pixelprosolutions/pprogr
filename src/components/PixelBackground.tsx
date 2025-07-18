import React, { useEffect, useRef, useState } from 'react';

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  fixed: boolean;
  rotationAngle: number;
  rotationalVelocity: number;
  opacity: number;
  mass: number;
  elasticity: number;
  friction: number;
  lastCollision: number;
  isLogo: boolean;
  color?: string;
  glowIntensity?: number;
}

interface BackgroundGlow {
  x: number;
  y: number;
  radius: number;
  angle: number;
  intensity: number;
}

const PixelBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastBlockTimeRef = useRef<number>(0);
  const mousePositionRef = useRef<{ x: number, y: number, prevX: number, prevY: number } | null>(null);
  const selectedBlockRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Background glow effect in bottom right corner
  const backgroundGlowRef = useRef<BackgroundGlow>({
    x: 0,
    y: 0,
    radius: 400,
    angle: 0,
    intensity: 0.025 // 2.5% transparency
  });

  // Initialize canvas and dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });

      // Update background glow position to bottom right
      backgroundGlowRef.current.x = window.innerWidth * 0.85;
      backgroundGlowRef.current.y = window.innerHeight * 0.85;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mousePositionRef.current?.x || e.clientX;
      const prevY = mousePositionRef.current?.y || e.clientY;

      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX,
        prevY
      };

      if (selectedBlockRef.current !== null) {
        const block = blocksRef.current[selectedBlockRef.current];
        if (block) {
          const dx = e.clientX - prevX;
          const dy = e.clientY - prevY;

          block.fixed = false;
          block.velocityX = dx * 0.5;
          block.velocityY = dy * 0.5;
          block.rotationalVelocity = 0;
          block.glowIntensity = 0.025;
          block.fixed = false;
        }
      } else {
        const mouseVelocityX = e.clientX - prevX;
        const mouseVelocityY = e.clientY - prevY;
        const mouseSpeed = Math.sqrt(mouseVelocityX * mouseVelocityX + mouseVelocityY * mouseVelocityY);

        if (mouseSpeed > 3) {
          blocksRef.current.forEach(block => {
            const dx = e.clientX - (block.x + block.width / 2);
            const dy = e.clientY - (block.y + block.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionRange = 120;

            if (distance < interactionRange) {
              const forceMagnitude = (1 - distance / interactionRange) * mouseSpeed * 0.3;
              const forceX = (mouseVelocityX / mouseSpeed) * forceMagnitude;
              const forceY = (mouseVelocityY / mouseSpeed) * forceMagnitude;

              block.velocityX += forceX;
              block.velocityY += forceY;

              block.rotationalVelocity += (dx / block.width) * forceMagnitude * 0.02;
              block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);

              if (block.fixed) {
                 block.fixed = false;
              }
            }
          });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const clickedBlockIndex = blocksRef.current.findIndex(block => {
        return (
          e.clientX >= block.x &&
          e.clientX <= block.x + block.width &&
          e.clientY >= block.y &&
          e.clientY <= block.y + block.height
        );
      });

      if (clickedBlockIndex !== -1) {
        selectedBlockRef.current = clickedBlockIndex;
        const block = blocksRef.current[clickedBlockIndex];
        block.rotating = true; // Start visual rotation cue
        block.fixed = false; // Make sure it can be moved
        block.velocityY = -2; // Give it a little upward push
        block.velocityX = 0;
        block.rotationalVelocity = 0; // Stop rotation temporarily
        block.glowIntensity = 0.025;
      }
    };

    const handleMouseUp = () => {
      if (selectedBlockRef.current !== null) {
        const block = blocksRef.current[selectedBlockRef.current];
        if (block) {
          setTimeout(() => {
            if (block) block.glowIntensity = 0.02;
          }, 300);
        }
        selectedBlockRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Create blocks and animation
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Tuned Physics constants for better stacking
    const GRAVITY = 0.4; // Balanced gravity
    const AIR_RESISTANCE = 0.96; // Slight air resistance
    const GROUND_FRICTION = 0.8; // Higher friction
    const ELASTICITY = 0.1; // Much lower bounce

    // Create logo blocks pattern
    const createLogoBlock = () => {
      const blockSize = Math.min(dimensions.width, dimensions.height) * 0.02;
      const logoPattern = [
        [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 0]
      ];
      const margin = blockSize * 3;
      const minX = margin;
      const maxX = dimensions.width - blockSize * 3 - margin;
      const startX = minX + Math.random() * (maxX - minX);
      const blocks: Block[] = [];
      const hue = Math.random() * 30 - 15;
      const baseColor = `hsl(${hue}, 10%, 90%)`;

      for (let row = 0; row < logoPattern.length; row++) {
        for (let col = 0; col < logoPattern[row].length; col++) {
          if (logoPattern[row][col] === 1) {
            blocks.push({
              x: startX + col * blockSize,
              y: -blockSize * (4 - row),
              width: blockSize,
              height: blockSize,
              velocityX: 0,
              velocityY: 0.5 + Math.random() * 0.2,
              fixed: false,
              rotationAngle: 0,
              rotationalVelocity: (Math.random() - 0.5) * 0.02,
              opacity: 0.2 + Math.random() * 0.2,
              mass: 1,
              elasticity: ELASTICITY,
              friction: GROUND_FRICTION,
              lastCollision: 0,
              isLogo: true,
              color: baseColor,
              glowIntensity: 0.02
            });
          }
        }
      }
      return blocks;
    };

    // Create a single block
    const createBlock = () => {
      const blockSize = Math.min(dimensions.width, dimensions.height) * 0.02;
      const brightness = 80 + Math.random() * 20;
      const color = `rgba(${brightness}%, ${brightness}%, ${brightness}%, 1)`;
      return {
        x: Math.random() * (dimensions.width - blockSize),
        y: -blockSize,
        width: blockSize,
        height: blockSize,
        velocityX: 0,
        velocityY: 0.5 + Math.random() * 0.2,
        fixed: false,
        rotationAngle: 0,
        rotationalVelocity: (Math.random() - 0.5) * 0.02,
        opacity: 0.2 + Math.random() * 0.2,
        mass: 1,
        elasticity: ELASTICITY,
        friction: GROUND_FRICTION,
        lastCollision: 0,
        isLogo: false,
        color: color,
        glowIntensity: 0.02
      };
    };

    // Check if two blocks are colliding (AABB)
    const checkCollision = (block1: Block, block2: Block) => {
      return (
        block1.x < block2.x + block2.width &&
        block1.x + block1.width > block2.x &&
        block1.y < block2.y + block2.height &&
        block1.y + block1.height > block2.y
      );
    };

    // Resolve collision between two blocks
    const resolveCollision = (block1: Block, block2: Block, timestamp: number) => {
      // Basic debounce
      if (timestamp - block1.lastCollision < 50 || timestamp - block2.lastCollision < 50) {
         return;
      }
      block1.lastCollision = timestamp;
      block2.lastCollision = timestamp;

      block1.glowIntensity = Math.min(0.03, (block1.glowIntensity || 0) + 0.01);
      block2.glowIntensity = Math.min(0.03, (block2.glowIntensity || 0) + 0.01);

      const dx = (block2.x + block2.width / 2) - (block1.x + block1.width / 2);
      const dy = (block2.y + block2.height / 2) - (block1.y + block1.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance === 0) return; // Avoid division by zero

      const nx = dx / distance;
      const ny = dy / distance;

      const relativeVelocityX = block1.velocityX - block2.velocityX;
      const relativeVelocityY = block1.velocityY - block2.velocityY;
      const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

      if (velocityAlongNormal > 0) return; // Moving away

      const restitution = Math.min(block1.elasticity, block2.elasticity);

      let j = -(1 + restitution) * velocityAlongNormal * 0.5; // Reduced impact

      const impulseX = j * nx;
      const impulseY = j * ny;

      block1.velocityX -= impulseX * 0.5;
      block1.velocityY -= impulseY * 0.5;
      block2.velocityX += impulseX * 0.5;
      block2.velocityY += impulseY * 0.5;

      // Simple separation
      const separationX = (dx / distance) * 2;
      const separationY = (dy / distance) * 2;
      block1.x -= separationX;
      block1.y -= separationY;
      block2.x += separationX;
      block2.y += separationY;
    };

    // Draw background glow effect
    const drawBackgroundGlow = (ctx: CanvasRenderingContext2D) => {
      const { x, y, radius, angle, intensity } = backgroundGlowRef.current;
      backgroundGlowRef.current.angle = (angle + 0.001) % (Math.PI * 2);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const pulseIntensity = (Math.sin(angle) * 0.005) + intensity;
      gradient.addColorStop(0, `rgba(100, 120, 255, ${pulseIntensity})`);
      gradient.addColorStop(0.5, `rgba(140, 100, 255, ${pulseIntensity * 0.7})`);
      gradient.addColorStop(1, 'rgba(80, 80, 120, 0)');
      const offsetX = Math.sin(angle * 0.5) * 50;
      const offsetY = Math.cos(angle * 0.7) * 30;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Draw block glow effect
    const drawBlockGlow = (ctx: CanvasRenderingContext2D, block: Block) => {
      if (!block.glowIntensity || block.glowIntensity <= 0) return;
      const centerX = block.x + block.width / 2;
      const centerY = block.y + block.height / 2;
      const glowRadius = block.width * 3;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${block.glowIntensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      block.glowIntensity = Math.max(0, block.glowIntensity - 0.001);
    };

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackgroundGlow(ctx);

      // Add new blocks
      if (timestamp - lastBlockTimeRef.current > 4000) {
        lastBlockTimeRef.current = timestamp;
        if (Math.random() < 0.3) {
          blocksRef.current = [...blocksRef.current, ...createLogoBlock()];
        } else {
          blocksRef.current.push(createBlock());
        }
        if (blocksRef.current.length > 50) {
          blocksRef.current = blocksRef.current.slice(-50);
        }
      }

      // Update and draw blocks
      blocksRef.current.forEach((block, index) => {
        drawBlockGlow(ctx, block);

        // Skip physics update if selected by mouse
        if (selectedBlockRef.current === index) {
          return; // Skip physics for this block
        }

        // Apply physics if not fixed
        if (!block.fixed) {
          // Apply gravity
          block.velocityY += GRAVITY; // No * mass here, handled in collision

          // Apply air resistance
          block.velocityX *= AIR_RESISTANCE;
          block.velocityY *= AIR_RESISTANCE;

          // Apply rotational damping
          block.rotationalVelocity *= 0.99;

          // Update position
          block.x += block.velocityX;
          block.y += block.velocityY;

          // Update rotation
          block.rotationAngle += block.rotationalVelocity;

          // --- Ground Collision (Improved) ---
          if (block.y + block.height >= dimensions.height) {
            block.y = dimensions.height - block.height; // Set position exactly

            if (Math.abs(block.velocityY) > 1) {
              block.velocityY *= -block.elasticity;
              block.velocityX *= GROUND_FRICTION;
              block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);
            } else {
              block.velocityY = 0;
              block.velocityX *= GROUND_FRICTION;
              block.rotationalVelocity *= GROUND_FRICTION;
              
              if (Math.abs(block.velocityX) < 0.1 && Math.abs(block.rotationalVelocity) < 0.01) {
                block.fixed = true;
              }
            }
          }

          // --- Wall Collisions ---
          if (block.x <= 0) {
            block.x = 0;
            block.velocityX *= -block.elasticity;
            block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);
          } else if (block.x + block.width >= dimensions.width) {
            block.x = dimensions.width - block.width;
            block.velocityX *= -block.elasticity;
            block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);
          }
        }
      });

      // Simple block-to-block collisions
      for (let i = 0; i < blocksRef.current.length; i++) {
        for (let j = i + 1; j < blocksRef.current.length; j++) {
          const block1 = blocksRef.current[i];
          const block2 = blocksRef.current[j];

          if (selectedBlockRef.current === i || selectedBlockRef.current === j) continue;
          if (block1.fixed && block2.fixed) continue;

          if (checkCollision(block1, block2)) {
            resolveCollision(block1, block2, timestamp);
          }
        }
      }

      // Draw blocks
      blocksRef.current.forEach(block => {
        ctx.save();
        ctx.translate(block.x + block.width / 2, block.y + block.height / 2);
        ctx.rotate(block.rotationAngle);

        const glowAmount = block.glowIntensity || 0;
        ctx.strokeStyle = block.color || `rgba(255, 255, 255, ${block.opacity + 0.2})`;
        ctx.lineWidth = 1;

        if (glowAmount > 0.01) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.03)';
          ctx.shadowBlur = glowAmount * 5;
        }

        ctx.strokeRect(-block.width / 2, -block.height / 2, block.width, block.height);
        ctx.restore();
      });

      // Remove blocks that are way off screen
      blocksRef.current = blocksRef.current.filter(block => 
        block.y < dimensions.height + 100 && block.x > -100 && block.x < dimensions.width + 100
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastBlockTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions]); // Rerun effect if dimensions change

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-black -z-10"
    />
  );
};

export default PixelBackground;
