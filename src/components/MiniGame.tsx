import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Trophy, Shield, Swords, Sparkles, HelpCircle, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'lava_block' | 'creeper_block' | 'netherite' | 'diamond' | 'emerald';
  speedY: number;
  sliced?: boolean;
}

export const MiniGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [gameState, setGameState] = useState<'title' | 'playing' | 'paused' | 'gameover'>('title');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [health, setHealth] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false); // Off by default as required
  const [isNewHigh, setIsNewHigh] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Audio Context reference for Web Audio API retro SFX
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Internal mutable state for high performance 60fps loop
  const gameRef = useRef({
    player: {
      x: 180,
      y: 330,
      width: 28,
      height: 42,
      vx: 0,
      vy: 0,
      isJumping: false,
      isSlashing: false,
      slashTimer: 0,
      facing: 'right' as 'left' | 'right',
    },
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    keys: { left: false, right: false, up: false, slash: false },
    score: 0,
    health: 3,
    level: 1,
    spawnTimer: 0,
    lastFrameTime: 0,
    animationId: 0,
    isNewHighScoreAwarded: false,
  });

  // Sound generator using Web Audio API
  const playSound = useCallback((type: 'jump' | 'slash' | 'collect' | 'hit' | 'gameover') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'slash') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'collect') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  // Load High Score on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('swordgamer_minigame_highscore');
      if (stored) {
        setHighScore(parseInt(stored, 10));
      }
    } catch {
      // ignore
    }
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameRef.current.keys.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameRef.current.keys.right = true;
      }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        gameRef.current.keys.up = true;
      }
      if (['KeyF', 'KeyX', 'ShiftLeft', 'ShiftRight'].includes(e.code)) {
        triggerSlash();
      }
      if (e.code === 'KeyP' && (gameState === 'playing' || gameState === 'paused')) {
        togglePause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameRef.current.keys.left = false;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameRef.current.keys.right = false;
      }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        gameRef.current.keys.up = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const triggerSlash = useCallback(() => {
    if (gameState !== 'playing') return;
    const p = gameRef.current.player;
    p.isSlashing = true;
    p.slashTimer = 12; // active for 12 frames
    playSound('slash');
  }, [gameState, playSound]);

  const triggerJump = useCallback(() => {
    if (gameState !== 'playing') return;
    const p = gameRef.current.player;
    if (!p.isJumping) {
      p.vy = -10.5;
      p.isJumping = true;
      playSound('jump');
    }
  }, [gameState, playSound]);

  // Start new game
  const startGame = () => {
    const canvas = canvasRef.current;
    const initialX = canvas ? canvas.width / 2 - 14 : 180;
    const initialY = 320;

    gameRef.current = {
      player: {
        x: initialX,
        y: initialY,
        width: 28,
        height: 42,
        vx: 0,
        vy: 0,
        isJumping: false,
        isSlashing: false,
        slashTimer: 0,
        facing: 'right',
      },
      obstacles: [],
      particles: [],
      keys: { left: false, right: false, up: false, slash: false },
      score: 0,
      health: 3,
      level: 1,
      spawnTimer: 0,
      lastFrameTime: performance.now(),
      animationId: 0,
      isNewHighScoreAwarded: false,
    };

    setScore(0);
    setHealth(3);
    setIsNewHigh(false);
    setGameState('playing');
  };

  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };

  // Add explosion particles
  const addParticles = (x: number, y: number, color: string, count = 12) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      gameRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 3 + Math.random() * 4,
        color,
        alpha: 1,
        life: 25 + Math.floor(Math.random() * 15),
      });
    }
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const g = gameRef.current;
      const p = g.player;
      const width = canvas.width;
      const height = canvas.height;
      const groundY = height - 50;

      // Update Player Movement
      const moveSpeed = 4.2;
      if (g.keys.left) {
        p.vx = -moveSpeed;
        p.facing = 'left';
      } else if (g.keys.right) {
        p.vx = moveSpeed;
        p.facing = 'right';
      } else {
        p.vx *= 0.8;
      }

      // Jump
      if (g.keys.up && !p.isJumping) {
        p.vy = -10.5;
        p.isJumping = true;
        playSound('jump');
      }

      // Gravity & Physics
      p.vy += 0.55;
      p.x += p.vx;
      p.y += p.vy;

      // Bound within canvas
      if (p.x < 10) p.x = 10;
      if (p.x > width - p.width - 10) p.x = width - p.width - 10;

      // Ground collision
      if (p.y >= groundY - p.height) {
        p.y = groundY - p.height;
        p.vy = 0;
        p.isJumping = false;
      }

      // Sword slash timer
      if (p.isSlashing) {
        p.slashTimer--;
        if (p.slashTimer <= 0) {
          p.isSlashing = false;
        }
      }

      // Spawning Obstacles & Collectibles
      g.spawnTimer++;
      const currentSpawnThreshold = Math.max(35, 75 - g.level * 4);
      if (g.spawnTimer >= currentSpawnThreshold) {
        g.spawnTimer = 0;
        const randomVal = Math.random();
        let type: Obstacle['type'] = 'lava_block';

        if (randomVal < 0.35) {
          type = 'lava_block';
        } else if (randomVal < 0.6) {
          type = 'creeper_block';
        } else if (randomVal < 0.75) {
          type = 'diamond';
        } else if (randomVal < 0.9) {
          type = 'emerald';
        } else {
          type = 'netherite';
        }

        const size = type.includes('block') ? 26 : 20;
        const spawnX = 20 + Math.random() * (width - 40 - size);
        const baseSpeed = 2.2 + g.level * 0.3;

        g.obstacles.push({
          x: spawnX,
          y: -30,
          width: size,
          height: size,
          type,
          speedY: baseSpeed + Math.random() * 1.5,
        });
      }

      // Update Obstacles
      for (let i = g.obstacles.length - 1; i >= 0; i--) {
        const obs = g.obstacles[i];
        obs.y += obs.speedY;

        // Player Slash Hitbox Check
        let swordHit = false;
        if (p.isSlashing) {
          const slashX = p.facing === 'right' ? p.x + p.width : p.x - 30;
          const slashWidth = 32;
          const slashY = p.y + 6;
          const slashHeight = 30;

          if (
            slashX < obs.x + obs.width &&
            slashX + slashWidth > obs.x &&
            slashY < obs.y + obs.height &&
            slashY + slashHeight > obs.y
          ) {
            swordHit = true;
          }
        }

        // Handle Sword Strike
        if (swordHit) {
          if (obs.type === 'lava_block') {
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#f97316', 14);
            g.score += 20;
            playSound('hit');
          } else if (obs.type === 'creeper_block') {
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#22c55e', 14);
            g.score += 25;
            playSound('hit');
          } else {
            // Slicing gem gives bonus points
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#38bdf8', 10);
            g.score += 35;
            playSound('collect');
          }
          g.obstacles.splice(i, 1);
          setScore(g.score);
          continue;
        }

        // Player Body Collision Check
        const isColliding =
          p.x + 4 < obs.x + obs.width &&
          p.x + p.width - 4 > obs.x &&
          p.y + 4 < obs.y + obs.height &&
          p.y + p.height > obs.y;

        if (isColliding) {
          if (obs.type === 'lava_block' || obs.type === 'creeper_block') {
            // Damage!
            g.health--;
            setHealth(g.health);
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#ef4444', 16);
            playSound('hit');

            if (g.health <= 0) {
              // Game Over
              playSound('gameover');
              setGameState('gameover');
              if (g.score > highScore) {
                setHighScore(g.score);
                setIsNewHigh(true);
                try {
                  localStorage.setItem('swordgamer_minigame_highscore', g.score.toString());
                  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                } catch {
                  // ignore
                }
              }
              return;
            }
          } else if (obs.type === 'netherite') {
            g.score += 50;
            setScore(g.score);
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#64748b', 12);
            playSound('collect');
          } else if (obs.type === 'emerald') {
            g.score += 30;
            setScore(g.score);
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#10b981', 12);
            playSound('collect');
          } else if (obs.type === 'diamond') {
            g.score += 20;
            setScore(g.score);
            addParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#38bdf8', 12);
            playSound('collect');
          }

          g.obstacles.splice(i, 1);
          continue;
        }

        // Reached Ground
        if (obs.y > groundY - 10) {
          if (obs.type === 'lava_block') {
            addParticles(obs.x + obs.width / 2, groundY, '#f97316', 6);
          }
          g.obstacles.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.15;
        pt.life--;
        pt.alpha = pt.life / 30;
        if (pt.life <= 0) {
          g.particles.splice(i, 1);
        }
      }

      // Update Level every 100 points
      const newLevel = 1 + Math.floor(g.score / 100);
      if (newLevel !== g.level) {
        g.level = newLevel;
      }

      // RENDER CANVAS
      ctx.clearRect(0, 0, width, height);

      // 1. Background Nether/Dungeon Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0c0714');
      skyGrad.addColorStop(0.7, '#1b0d2a');
      skyGrad.addColorStop(1, '#2d1138');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Background decorative glowing pillars / fortress bricks
      ctx.fillStyle = 'rgba(76, 29, 149, 0.2)';
      ctx.fillRect(40, 60, 45, height - 110);
      ctx.fillRect(width - 85, 40, 45, height - 90);

      // 2. Obsidian Bedrock Ground Platform
      const groundGrad = ctx.createLinearGradient(0, groundY, 0, height);
      groundGrad.addColorStop(0, '#1c1c28');
      groundGrad.addColorStop(1, '#0a0a10');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, groundY, width, height - groundY);

      // Bedrock pattern / grid line
      ctx.fillStyle = '#6b21a8';
      ctx.fillRect(0, groundY, width, 3);
      for (let x = 0; x < width; x += 32) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(x, groundY + 3, 1, height - groundY);
      }

      // 3. Render Particles
      for (const pt of g.particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        ctx.restore();
      }

      // 4. Render Obstacles
      for (const obs of g.obstacles) {
        ctx.save();
        if (obs.type === 'lava_block') {
          // Orange magma block with crust
          ctx.fillStyle = '#ea580c';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#facc15';
          ctx.fillRect(obs.x + 3, obs.y + 3, obs.width - 6, obs.height - 6);
          ctx.fillStyle = '#7c2d12';
          ctx.fillRect(obs.x + 6, obs.y + 6, obs.width - 12, obs.height - 12);
        } else if (obs.type === 'creeper_block') {
          // Green explosive pixel block
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#15803d';
          ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, obs.height - 4);
          ctx.fillStyle = '#052e16';
          // Skull eyes & mouth
          ctx.fillRect(obs.x + 5, obs.y + 5, 4, 4);
          ctx.fillRect(obs.x + obs.width - 9, obs.y + 5, 4, 4);
          ctx.fillRect(obs.x + 7, obs.y + 11, obs.width - 14, 5);
        } else if (obs.type === 'netherite') {
          // Netherite ingot / dark metal block with violet gleam
          ctx.fillStyle = '#334155';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#475569';
          ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, obs.height - 4);
          ctx.fillStyle = '#c084fc';
          ctx.fillRect(obs.x + 5, obs.y + 5, 4, 4);
        } else if (obs.type === 'emerald') {
          // Glowing Emerald gem
          ctx.fillStyle = '#10b981';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#34d399';
          ctx.fillRect(obs.x + 3, obs.y + 3, obs.width - 6, obs.height - 6);
          ctx.fillStyle = '#a7f3d0';
          ctx.fillRect(obs.x + 6, obs.y + 6, 4, 4);
        } else if (obs.type === 'diamond') {
          // Glowing Diamond gem
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(obs.x + 3, obs.y + 3, obs.width - 6, obs.height - 6);
          ctx.fillStyle = '#e0f2fe';
          ctx.fillRect(obs.x + 6, obs.y + 6, 4, 4);
        }
        ctx.restore();
      }

      // 5. Render Player Character (Voxel Knight with Sword)
      ctx.save();
      // Body / Armor
      ctx.fillStyle = '#1e1b4b'; // Dark blue tunic
      ctx.fillRect(p.x, p.y + 12, p.width, 18);

      // Pants / Boots
      ctx.fillStyle = '#312e81';
      ctx.fillRect(p.x + 2, p.y + 30, 10, 12);
      ctx.fillRect(p.x + 16, p.y + 30, 10, 12);

      // Head / Skin
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(p.x + 4, p.y, 20, 12);
      // Hair / Hood
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(p.x + 2, p.y - 2, 24, 6);

      // Eyes
      ctx.fillStyle = '#38bdf8';
      if (p.facing === 'right') {
        ctx.fillRect(p.x + 14, p.y + 4, 3, 3);
        ctx.fillRect(p.x + 20, p.y + 4, 3, 3);
      } else {
        ctx.fillRect(p.x + 5, p.y + 4, 3, 3);
        ctx.fillRect(p.x + 11, p.y + 4, 3, 3);
      }

      // Sword & Slash Arc
      if (p.isSlashing) {
        const slashRight = p.facing === 'right';
        const swordX = slashRight ? p.x + p.width : p.x - 24;
        const swordY = p.y + 8;

        // Glowing Diamond Sword Blade
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 12;
        ctx.fillRect(swordX, swordY, 26, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(swordX + 4, swordY + 1, 20, 4);
        ctx.shadowBlur = 0;

        // Slash Arc trail
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (slashRight) {
          ctx.arc(p.x + p.width, p.y + 16, 26, -Math.PI / 4, Math.PI / 3);
        } else {
          ctx.arc(p.x, p.y + 16, 26, (3 * Math.PI) / 4, (5 * Math.PI) / 4);
        }
        ctx.stroke();
      } else {
        // Idle Sheathed Sword on back / side
        ctx.fillStyle = '#0ea5e9';
        if (p.facing === 'right') {
          ctx.fillRect(p.x + p.width - 2, p.y + 8, 4, 20);
        } else {
          ctx.fillRect(p.x - 2, p.y + 8, 4, 20);
        }
      }
      ctx.restore();

      g.animationId = requestAnimationFrame(loop);
    };

    gameRef.current.animationId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(gameRef.current.animationId);
    };
  }, [gameState, playSound, highScore]);

  return (
    <section id="minigame" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-2">
          <span>Browser Experience</span>
          <span aria-hidden="true">·</span>
          <span>Zero Installation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Nether Blade: Survival Slicer
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          An original blocky survival mini-game built for desktop and mobile touchscreens. Slice hazards, mine falling Netherite, and beat the high score.
        </p>
      </div>

      {/* Main Game Card */}
      <div className="max-w-2xl mx-auto glass-panel rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl relative">
        
        {/* Game Top Status Bar */}
        <div className="px-5 py-3.5 bg-black/60 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Score */}
            <div className="flex items-center gap-1.5 font-mono-numbers">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="text-sm font-bold text-white bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.08]">
                {score}
              </span>
            </div>

            {/* High Score */}
            <div className="flex items-center gap-1.5 font-mono-numbers">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-slate-400">Best:</span>
              <span className="text-xs font-bold text-amber-300">
                {highScore}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Health Hearts */}
            <div className="flex items-center gap-1" aria-label={`Health: ${health} hearts`}>
              {[1, 2, 3].map((h) => (
                <span
                  key={h}
                  className={`text-sm transition-transform ${
                    h <= health ? 'text-rose-500 scale-100' : 'text-slate-600 scale-90 opacity-40'
                  }`}
                >
                  ❤
                </span>
              ))}
            </div>

            {/* Sound Toggle (Off by default as requested) */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                soundEnabled 
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' 
                  : 'bg-white/[0.04] text-slate-500 border-white/[0.08] hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute Game SFX' : 'Enable 8-bit Game SFX'}
              aria-label="Toggle Game Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Instructions toggle */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
              title="Game Instructions"
              aria-label="View Game Controls"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Instructions Banner (Conditional) */}
        {showInstructions && (
          <div className="p-4 bg-purple-950/40 border-b border-purple-500/30 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between text-purple-200 font-semibold mb-1">
              <span>Game Controls:</span>
              <button 
                onClick={() => setShowInstructions(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p><strong>Keyboard:</strong> [A / Left Arrow] Move Left, [D / Right Arrow] Move Right, [W / Space] Jump, [F / X / Shift] Sword Slash, [P] Pause.</p>
            <p><strong>Mobile:</strong> Use the on-screen touch buttons below the canvas to move, jump, and slash.</p>
            <p><strong>Goal:</strong> Slice hazard blocks (Lava, Creeper) before they hit you! Collect Netherite & Diamonds for massive bonus points!</p>
          </div>
        )}

        {/* Canvas Game Area */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#0a0712] overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            className="w-full h-full object-contain pixelated"
          />

          {/* Title Screen Overlay */}
          {gameState === 'title' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-rose-600 p-[1px] mb-4 shadow-xl shadow-purple-900/40">
                <div className="w-full h-full bg-[#0b0b14] rounded-[15px] flex items-center justify-center">
                  <Swords className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
                NETHER BLADE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mb-6">
                Slice explosive blocks, collect rare Netherite ores, and test your reaction times!
              </p>

              <button
                onClick={startGame}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-900/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Game</span>
              </button>

              <div className="mt-6 text-[11px] text-slate-500 flex items-center gap-3">
                <span>Sound: {soundEnabled ? 'Enabled' : 'Off (Toggle Above)'}</span>
                <span>·</span>
                <span>Touch & Keyboard Supported</span>
              </div>
            </div>
          )}

          {/* Paused Screen Overlay */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <h3 className="text-2xl font-bold text-white font-display mb-4">
                GAME PAUSED
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePause}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume</span>
                </button>
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-slate-300 font-medium text-xs transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="text-rose-500 text-4xl mb-2 font-bold font-display">
                YOU DIED
              </div>
              <p className="text-xs text-slate-400 mb-4">
                The Nether depths proved too hazardous this time!
              </p>

              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.1] mb-6 w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono-numbers">
                  <span>Final Score:</span>
                  <span className="font-bold text-white text-sm">{score}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono-numbers">
                  <span>All-Time Best:</span>
                  <span className="font-bold text-amber-400 text-sm">{highScore}</span>
                </div>
                {isNewHigh && (
                  <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NEW HIGH SCORE!</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={() => setGameState('title')}
                  className="px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 font-medium text-xs transition-colors"
                >
                  Title Screen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / Responsive On-Screen Touch Controls */}
        <div className="p-4 bg-black/60 border-t border-white/[0.08] flex items-center justify-between select-none">
          {/* Movement buttons (Left / Right) */}
          <div className="flex items-center gap-2">
            <button
              onPointerDown={() => { gameRef.current.keys.left = true; }}
              onPointerUp={() => { gameRef.current.keys.left = false; }}
              onPointerLeave={() => { gameRef.current.keys.left = false; }}
              className="w-12 h-12 rounded-xl bg-white/[0.06] active:bg-purple-600/40 text-slate-300 active:text-white border border-white/[0.1] flex items-center justify-center transition-colors"
              aria-label="Move Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onPointerDown={() => { gameRef.current.keys.right = true; }}
              onPointerUp={() => { gameRef.current.keys.right = false; }}
              onPointerLeave={() => { gameRef.current.keys.right = false; }}
              className="w-12 h-12 rounded-xl bg-white/[0.06] active:bg-purple-600/40 text-slate-300 active:text-white border border-white/[0.1] flex items-center justify-center transition-colors"
              aria-label="Move Right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Action buttons (Jump / Slash / Pause) */}
          <div className="flex items-center gap-2">
            {gameState === 'playing' && (
              <button
                onClick={togglePause}
                className="w-10 h-10 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08] flex items-center justify-center text-xs"
                title="Pause Game"
                aria-label="Pause Game"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={triggerJump}
              className="px-3.5 h-12 rounded-xl bg-white/[0.08] active:bg-indigo-600/40 text-slate-200 active:text-white border border-white/[0.12] flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Jump"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Jump</span>
            </button>

            <button
              onClick={triggerSlash}
              className="px-4 h-12 rounded-xl bg-purple-600 active:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition-transform active:scale-95"
              aria-label="Slash Sword"
            >
              <Swords className="w-4 h-4" />
              <span>Slash!</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
