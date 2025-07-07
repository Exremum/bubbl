const bubbleCount = 100;
  const bubbles = [];
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  let time = 0;

  for (let i = 0; i < bubbleCount; i++) {
    const el = document.createElement('div');
    el.classList.add('bubble');

    const size = Math.random() * 60 + 30;
    el.style.width = el.style.height = size + 'px';

    const bubble = {
      el,
      size,
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight + 200),
      vx: 0,
      vy: -0.8 - Math.random() * 0.5,
      tx: 0,
      ty: 0,
      baseX: 0,
      oscillationPhase: Math.random() * Math.PI * 2
    };

    bubble.baseX = bubble.x;

    el.style.left = bubble.x + 'px';
    el.style.top = bubble.y + 'px';
    document.body.appendChild(el);
    bubbles.push(bubble);
  }

  function animate() {
    time += 0.02;

    for (const b of bubbles) {
      const oscillation = Math.sin(time + b.oscillationPhase) * 10;
      b.x = b.baseX + oscillation;

      const dx = b.x + b.size / 2 - mouse.x;
      const dy = b.y + b.size / 2 - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const force = (100 - dist) / 100;
        const angle = Math.atan2(dy, dx);
        b.tx += Math.cos(angle) * force * 3;
        b.ty += Math.sin(angle) * force * 3;
      }

      b.tx *= 0.95;
      b.ty *= 0.95;

      b.y += b.vy;

      if (b.y + b.size < 0) {
        b.y = window.innerHeight + 50;
        b.baseX = Math.random() * window.innerWidth;
      }

      b.el.style.transform = `translate(${b.tx}px, ${b.ty}px)`;
      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  animate();
