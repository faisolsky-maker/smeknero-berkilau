/* ui.js - microinteractions */
document.addEventListener('DOMContentLoaded', ()=>{
  // ripple effect for buttons with class ripple
  document.querySelectorAll('.ripple').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const circle = document.createElement('span');
      const d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = d + 'px';
      circle.style.left = (e.clientX - this.getBoundingClientRect().left - d/2) + 'px';
      circle.style.top = (e.clientY - this.getBoundingClientRect().top - d/2) + 'px';
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.background = 'rgba(255,255,255,0.3)';
      circle.style.transform = 'scale(0)';
      circle.style.transition = 'transform 500ms, opacity 800ms';
      this.appendChild(circle);
      requestAnimationFrame(()=> circle.style.transform='scale(2)');
      setTimeout(()=> circle.style.opacity='0',600);
      setTimeout(()=> circle.remove(),900);
    });
  });

  // small hover tilt for cards
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${ -y * 3 }deg) rotateY(${ x * 3 }deg)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });

  // animate mood emoji on hover
  document.querySelectorAll('.mood-btn').forEach(b=>{
    b.addEventListener('mouseenter', ()=>{
      b.querySelector('.mood-emoji').style.transform='translateY(-6px) scale(1.06)';
    });
    b.addEventListener('mouseleave', ()=>{
      b.querySelector('.mood-emoji').style.transform='';
    });
  });
});
