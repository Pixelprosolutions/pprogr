import React, { useEffect, useRef, useState } from 'react';

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  fixed: boolean; // Note: We might rely less on 'fixed' and more on physics for stability
  rotating: boolean; // Used for mouse interaction only
  rotationAngle: number;
  rotationalVelocity: number;
  opacity: number;
  mass: number;
  elasticity: number; // Reduced for less bounce
  friction: number; // Increased for stability
  lastCollision: number;
  angularDamping: number;
  isLogo: boolean;
  connectedBlocks?: number[];
  connectionStrength?: number;
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

          block.x = e.clientX - block.width / 2;
          block.y = e.clientY - block.height / 2;
          block.velocityX = dx * 0.3;
          block.velocityY = dy * 0.3;
          block.rotationalVelocity = dx * 0.01;
          block.glowIntensity = 0.025;
          block.fixed = false; // Ensure block is not fixed when grabbed

          if (block.isLogo && block.connectedBlocks) {
            block.connectedBlocks.forEach(connectedIndex => {
              if (connectedIndex < blocksRef.current.length) {
                const connectedBlock = blocksRef.current[connectedIndex];
                const relativeX = connectedBlock.x - block.x; // Store initial relative pos? No, update dynamically
                const relativeY = connectedBlock.y - block.y;

                connectedBlock.x = block.x + relativeX;
                connectedBlock.y = block.y + relativeY;
                connectedBlock.velocityX = block.velocityX;
                connectedBlock.velocityY = block.velocityY;
                connectedBlock.rotationalVelocity = block.rotationalVelocity;
                connectedBlock.glowIntensity = 0.02;
                connectedBlock.fixed = false; // Ensure connected blocks are also not fixed
              }
            });
          }
        }
      } else {
        const mouseVelocityX = e.clientX - prevX;
        const mouseVelocityY = e.clientY - prevY;
        const mouseSpeed = Math.sqrt(mouseVelocityX * mouseVelocityX + mouseVelocityY * mouseVelocityY);

        if (mouseSpeed > 5) {
          blocksRef.current.forEach(block => {
            const dx = e.clientX - (block.x + block.width / 2);
            const dy = e.clientY - (block.y + block.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionRange = block.isLogo ? 200 : 100;

            if (distance < interactionRange) {
              const forceMagnitude = (1 - distance / interactionRange) * mouseSpeed * 0.2;
              const forceX = (mouseVelocityX / mouseSpeed) * forceMagnitude;
              const forceY = (mouseVelocityY / mouseSpeed) * forceMagnitude;
              const accelerationX = forceX / block.mass;
              const accelerationY = forceY / block.mass;
              const responseFactor = block.isLogo ? 1.5 : 1.0;

              block.velocityX += accelerationX * responseFactor;
              block.velocityY += accelerationY * responseFactor;

              const offCenterX = (dx / block.width) * 0.5;
              block.rotationalVelocity += offCenterX * forceMagnitude * 0.01 * responseFactor;
              block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);

              // Unfix block if force is strong enough
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
        block.velocityY = 0; // Stop gravity temporarily
        block.velocityX = 0;
        block.rotationalVelocity = 0; // Stop rotation temporarily
        block.glowIntensity = 0.025;
      }
    };

    const handleMouseUp = () => {
      if (selectedBlockRef.current !== null) {
        const block = blocksRef.current[selectedBlockRef.current];
        if (block) {
          block.rotating = false; // Stop visual rotation cue
          // Velocity is already set by mouse move, let physics take over
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
    const GRAVITY = 0.08; // Slightly stronger gravity
    const AIR_RESISTANCE = 0.99; // Slightly less air resistance
    const GROUND_FRICTION = 0.7; // Friction coefficient with ground
    const BLOCK_FRICTION = 0.6; // Friction coefficient between blocks
    const ELASTICITY = 0.15; // Lower elasticity for less bounce
    const ANGULAR_DAMPING = 0.97; // Dampen rotation

    // Create logo blocks pattern
    const createLogoBlock = () => {
      const blockSize = Math.min(dimensions.width, dimensions.height) * 0.02;
      const logoPattern = [
        [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 0]
      ];
      const margin = blockSize * 5;
      const minX = margin;
      const maxX = dimensions.width - blockSize * 3 - margin;
      const startX = minX + Math.random() * (maxX - minX);
      const blocks: Block[] = [];
      const blockIndices: number[] = [];
      const startIndex = blocksRef.current.length;
      const hue = Math.random() * 30 - 15;
      const baseColor = `hsl(${hue}, 10%, 90%)`;

      for (let row = 0; row < logoPattern.length; row++) {
        for (let col = 0; col < logoPattern[row].length; col++) {
          if (logoPattern[row][col] === 1) {
            const blockIndex = startIndex + blockIndices.length;
            blockIndices.push(blockIndex);
            blocks.push({
              x: startX + col * blockSize,
              y: -blockSize * (4 - row),
              width: blockSize,
              height: blockSize,
              velocityX: 0,
              velocityY: 0.3 + Math.random() * 0.3,
              fixed: false,
              rotating: false,
              rotationAngle: 0,
              rotationalVelocity: 0,
              opacity: 0.2 + Math.random() * 0.2,
              mass: 1 + Math.random() * 0.5,
              elasticity: ELASTICITY + Math.random() * 0.1, // Logo slightly more elastic
              friction: BLOCK_FRICTION + Math.random() * 0.1,
              lastCollision: 0,
              angularDamping: ANGULAR_DAMPING,
              isLogo: true,
              connectedBlocks: blockIndices.filter(i => i !== blockIndex),
              connectionStrength: 0.8 + Math.random() * 0.2,
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
        velocityY: 0.3 + Math.random() * 0.3,
        fixed: false,
        rotating: false,
        rotationAngle: 0,
        rotationalVelocity: 0,
        opacity: 0.2 + Math.random() * 0.2,
        mass: 1 + Math.random() * 0.5,
        elasticity: ELASTICITY, // Use base elasticity
        friction: BLOCK_FRICTION, // Use base friction
        lastCollision: 0,
        angularDamping: ANGULAR_DAMPING,
        isLogo: false,
        color: color,
        glowIntensity: 0.02
      };
    };

    // Check if two blocks are colliding (AABB)
    const checkCollision = (block1: Block, block2: Block) => {
      if (block1.isLogo && block2.isLogo &&
          block1.connectedBlocks?.includes(blocksRef.current.indexOf(block2))) {
        return false;
      }
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
      if (timestamp - block1.lastCollision < 16 || timestamp - block2.lastCollision < 16) {
         return;
      }
      block1.lastCollision = timestamp;
      block2.lastCollision = timestamp;

      // Make blocks non-fixed on collision
      block1.fixed = false;
      block2.fixed = false;

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
      const invMass1 = 1 / block1.mass;
      const invMass2 = 1 / block2.mass;

      let j = -(1 + restitution) * velocityAlongNormal;
      j /= invMass1 + invMass2;

      const impulseX = j * nx;
      const impulseY = j * ny;

      block1.velocityX -= impulseX * invMass1;
      block1.velocityY -= impulseY * invMass1;
      block2.velocityX += impulseX * invMass2;
      block2.velocityY += impulseY * invMass2;

      // Add rotational impulse (simplified)
      const hitOffsetX1 = (dx / block1.width) * 0.5;
      const hitOffsetY1 = (dy / block1.height) * 0.5;
      block1.rotationalVelocity -= (hitOffsetX1 * impulseY - hitOffsetY1 * impulseX) * 0.05 * invMass1;

      const hitOffsetX2 = (dx / block2.width) * 0.5;
      const hitOffsetY2 = (dy / block2.height) * 0.5;
      block2.rotationalVelocity += (hitOffsetX2 * impulseY - hitOffsetY2 * impulseX) * 0.05 * invMass2;


      // Friction Impulse
      const tangentX = -ny;
      const tangentY = nx;
      const relativeVelocityTangential = relativeVelocityX * tangentX + relativeVelocityY * tangentY;
      let jt = -relativeVelocityTangential;
      jt /= invMass1 + invMass2;

      const frictionCoefficient = Math.sqrt(block1.friction * block2.friction); // Geometric mean
      const maxFriction = Math.abs(j) * frictionCoefficient;
      jt = Math.max(-maxFriction, Math.min(maxFriction, jt));

      const frictionImpulseX = jt * tangentX;
      const frictionImpulseY = jt * tangentY;

      block1.velocityX -= frictionImpulseX * invMass1;
      block1.velocityY -= frictionImpulseY * invMass1;
      block2.velocityX += frictionImpulseX * invMass2;
      block2.velocityY += frictionImpulseY * invMass2;


      // Positional Correction (Further Improved for Stacking)
      const overlapX = (block1.width + block2.width) / 2 - Math.abs(dx);
      const overlapY = (block1.height + block2.height) / 2 - Math.abs(dy);

      if (overlapX > 0 && overlapY > 0) {
          const percent = 0.8; // Correction percentage per iteration (kept at 0.8, increasing iterations is often better)
          const slop = 0.05;   // Allowed overlap

          // Correct along the axis of minimum penetration
          if (overlapX < overlapY) {
              // Horizontal correction
              const correctionAmount = Math.max(overlapX - slop, 0);
              const correction = (correctionAmount / (invMass1 + invMass2)) * percent;
              const correctionSign = dx > 0 ? 1 : -1;
              block1.x -= correction * invMass1 * correctionSign;
              block2.x += correction * invMass2 * correctionSign;
          } else {
              // Vertical correction
              const correctionAmount = Math.max(overlapY - slop, 0);
              const correction = (correctionAmount / (invMass1 + invMass2)) * percent;
              const correctionSign = dy > 0 ? 1 : -1;
              block1.y -= correction * invMass1 * correctionSign;
              block2.y += correction * invMass2 * correctionSign;

              // If correcting vertically and relative velocity is low, dampen vertical velocity further
              if (Math.abs(relativeVelocityY) < GRAVITY * 10) {
                  block1.velocityY *= 0.7; // Increased dampening
                  block2.velocityY *= 0.7; // Increased dampening
              }
          }
      }
    };

    // Maintain connections between logo blocks (simplified force)
    const maintainConnections = () => {
      blocksRef.current.forEach((block) => {
        if (block.isLogo && block.connectedBlocks) {
          block.connectedBlocks.forEach(connectedIndex => {
            if (connectedIndex < blocksRef.current.length) {
              const connectedBlock = blocksRef.current[connectedIndex];
              // Simple spring-like force (could be improved)
              const dx = connectedBlock.x - block.x;
              const dy = connectedBlock.y - block.y;
              const distance = Math.sqrt(dx*dx + dy*dy);
              const targetDistance = block.width * 1.1; // Approx target distance
              const diff = distance - targetDistance;
              const forceMagnitude = diff * 0.005 * (block.connectionStrength || 0.5);

              if (distance > 0) {
                const forceX = (dx / distance) * forceMagnitude;
                const forceY = (dy / distance) * forceMagnitude;

                block.velocityX += forceX;
                block.velocityY += forceY;
                connectedBlock.velocityX -= forceX;
                connectedBlock.velocityY -= forceY;
              }
            }
          });
        }
      });
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
      if (timestamp - lastBlockTimeRef.current > 3000) {
        lastBlockTimeRef.current = timestamp;
        if (Math.random() < 0.1) {
          blocksRef.current = [...blocksRef.current, ...createLogoBlock()];
        } else {
          blocksRef.current.push(createBlock());
        }
        if (blocksRef.current.length > 80) { // Reduced max blocks slightly
          blocksRef.current = blocksRef.current.slice(-80);
        }
      }

      // Maintain logo connections (optional, can be intensive)
      maintainConnections();

      // Update and draw blocks
      blocksRef.current.forEach((block, index) => {
        drawBlockGlow(ctx, block);

        // Skip physics update if selected by mouse
        if (selectedBlockRef.current === index) {
          // Draw selected block outline
          ctx.save();
          ctx.translate(block.x + block.width / 2, block.y + block.height / 2);
          if (block.rotating) { // Only rotate if mouse interaction flag is set
             block.rotationAngle += 0.1; // Visual cue rotation
             ctx.rotate(block.rotationAngle);
          } else {
             ctx.rotate(block.rotationAngle); // Keep current physics rotation
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.03)';
          ctx.shadowBlur = 5;
          ctx.strokeRect(-block.width / 2, -block.height / 2, block.width, block.height);
          ctx.restore();
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
          block.rotationalVelocity *= block.angularDamping;

          // Update position
          block.x += block.velocityX;
          block.y += block.velocityY;

          // Update rotation
          block.rotationAngle += block.rotationalVelocity;

          // --- Ground Collision (Improved) ---
          if (block.y + block.height >= dimensions.height) {
            block.y = dimensions.height - block.height; // Set position exactly

            // Apply bounce only if velocity is significant
            if (Math.abs(block.velocityY) > GRAVITY * 2) { // Bounce threshold
              block.velocityY *= -block.elasticity;

              // Apply friction during bounce
              block.velocityX *= GROUND_FRICTION * block.friction;

              // Add rotational velocity on bounce
              if (Math.abs(block.velocityX) > 0.05) {
                 block.rotationalVelocity += block.velocityX * 0.005 * (block.velocityX > 0 ? -1 : 1);
              }
              block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);

            } else {
              // Block is resting or sliding
              block.velocityY = 0; // Stop vertical movement

              // Apply stronger ground friction
              const restingFriction = GROUND_FRICTION * 1.3; // Further increased friction when resting
              block.velocityX *= restingFriction;
              block.rotationalVelocity *= restingFriction;

              // Optional: Consider making block 'fixed' if velocity is extremely low for performance
              // if (Math.abs(block.velocityX) < 0.01 && Math.abs(block.rotationalVelocity) < 0.005) {
              //    block.fixed = true;
              // }
            }
          }

          // --- Wall Collisions ---
          if (block.x <= 0) {
            block.x = 0;
            block.velocityX *= -block.elasticity;
            block.rotationalVelocity -= 0.01 * block.elasticity * (block.velocityY > 0 ? 1 : -1); // Spin based on vertical movement
            block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);
          } else if (block.x + block.width >= dimensions.width) {
            block.x = dimensions.width - block.width;
            block.velocityX *= -block.elasticity;
            block.rotationalVelocity += 0.01 * block.elasticity * (block.velocityY > 0 ? 1 : -1); // Spin based on vertical movement
            block.glowIntensity = Math.min(0.03, (block.glowIntensity || 0) + 0.01);
          }
        }
      });

      // --- Block-to-Block Collisions (Iterative) ---
      const collisionIterations = 6; // Increased iterations for more stability
      for (let iter = 0; iter < collisionIterations; iter++) {
          for (let i = 0; i < blocksRef.current.length; i++) {
              for (let j = i + 1; j < blocksRef.current.length; j++) {
                  const block1 = blocksRef.current[i];
                  const block2 = blocksRef.current[j];

                  // Skip check if both are somehow fixed (shouldn't happen often now)
                  // if (block1.fixed && block2.fixed) continue;
                  // Skip check if one is selected
                  if (selectedBlockRef.current === i || selectedBlockRef.current === j) continue;


                  if (checkCollision(block1, block2)) {
                      resolveCollision(block1, block2, timestamp);
                  }
              }
          }
      }

      // Draw blocks
      blocksRef.current.forEach(block => {
        // Don't redraw selected block if already handled above
        if (selectedBlockRef.current === blocksRef.current.indexOf(block)) return;

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

      // Draw connections (optional)
      // blocksRef.current.forEach(block => { ... });

      // Remove blocks out of bounds (optional// Remove blocks out of bounds (optional, might remove resting blocks)
      // blocksRef.current = blocksRef.current.filter(block => ...);

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
