import React, { useRef, useEffect } from 'react';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const BULLET_RADIUS = 6;
const BIRD_SPEED = 2.5;
const BULLET_SPEED = 7;
const BIRD_SPAWN_INTERVAL = 1000; // ms

function GameCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const birdsRef = useRef([]);
  const bulletsRef = useRef([]);
  const scoreRef = useRef(0);
  const lastBirdSpawnRef = useRef(Date.now());

  // 새 생성
  function spawnBird() {
    const direction = Math.random() < 0.5 ? 'right' : 'left';
    const y = getRandomInt(30, CANVAS_HEIGHT / 2);
    let x, vx;
    if (direction === 'right') {
      x = -BIRD_WIDTH;
      vx = BIRD_SPEED;
    } else {
      x = CANVAS_WIDTH + BIRD_WIDTH;
      vx = -BIRD_SPEED;
    }
    // 방어: birdsRef.current가 배열이 아닐 경우 배열로 재설정
    if (!Array.isArray(birdsRef.current)) {
      birdsRef.current = [];
    }
    birdsRef.current.push({
      x,
      y,
      vx,
      vy: 0,
      width: BIRD_WIDTH,
      height: BIRD_HEIGHT,
    });
  }

  // 총알 생성
  function shootBullet(x, y) {
    // 방어: bulletsRef.current가 배열이 아닐 경우 배열로 재설정
    if (!Array.isArray(bulletsRef.current)) {
      bulletsRef.current = [];
    }
    bulletsRef.current.push({
      x,
      y,
      vy: -BULLET_SPEED,
      radius: BULLET_RADIUS,
    });
  }

  // 충돌 판정 (AABB vs 원)
  function isColliding(bird, bullet) {
    // 원의 중심이 사각형 내부에 있으면 충돌
    if (
      bullet.x > bird.x &&
      bullet.x < bird.x + bird.width &&
      bullet.y > bird.y &&
      bullet.y < bird.y + bird.height
    ) {
      return true;
    }
    // 사각형 네 변과 원의 거리 체크
    const closestX = Math.max(bird.x, Math.min(bullet.x, bird.x + bird.width));
    const closestY = Math.max(bird.y, Math.min(bullet.y, bird.y + bird.height));
    const dx = bullet.x - closestX;
    const dy = bullet.y - closestY;
    return dx * dx + dy * dy < bullet.radius * bullet.radius;
  }

  // 게임 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 고정
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // 마우스 클릭 시 총알 발사
    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      shootBullet(x, CANVAS_HEIGHT - 10); // 총구는 하단 중앙 근처
    }
    canvas.addEventListener('mousedown', handleClick);

    // 터치 지원
    function handleTouch(e) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        shootBullet(x, CANVAS_HEIGHT - 10);
      }
    }
    canvas.addEventListener('touchstart', handleTouch);

    function gameLoop() {
      // 새 생성 타이밍
      if (Date.now() - lastBirdSpawnRef.current > BIRD_SPAWN_INTERVAL) {
        spawnBird();
        lastBirdSpawnRef.current = Date.now();
      }

      // 새 이동
      birdsRef.current.forEach(bird => {
        bird.x += bird.vx;
      });

      // 총알 이동
      bulletsRef.current.forEach(bullet => {
        bullet.y += bullet.vy;
      });

      // 충돌 판정 및 제거
      let newBirds = [];
      let newBullets = [];
      birdsRef.current.forEach(bird => {
        let hit = false;
        bulletsRef.current.forEach(bullet => {
          if (isColliding(bird, bullet)) {
            hit = true;
            bullet._hit = true;
          }
        });
        if (!hit && bird.x + bird.width > 0 && bird.x < CANVAS_WIDTH) {
          newBirds.push(bird);
        }
        if (hit) {
          scoreRef.current += 1;
        }
      });
      bulletsRef.current.forEach(bullet => {
        if (
          !bullet._hit &&
          bullet.y + bullet.radius > 0
        ) {
          newBullets.push(bullet);
        }
      });
      birdsRef.current = newBirds;
      bulletsRef.current = newBullets;

      // 캔버스 클리어
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 새 그리기
      ctx.fillStyle = '#3498db';
      birdsRef.current.forEach(bird => {
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
      });

      // 총알 그리기
      ctx.fillStyle = '#e74c3c';
      bulletsRef.current.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      // 점수 표시
      ctx.fillStyle = '#222';
      ctx.font = '24px Arial';
      ctx.fillText(`점수: ${scoreRef.current}`, 20, 36);

      animationRef.current = requestAnimationFrame(gameLoop);
    }

    animationRef.current = requestAnimationFrame(gameLoop);

    // 정리
    return () => {
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousedown', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black', background: '#f0f0f0' }}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    />
  );
}

export default GameCanvas;