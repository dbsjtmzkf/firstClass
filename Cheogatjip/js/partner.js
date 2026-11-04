(() => {
 const header=document.querySelector('.site-header');
 if(!header)return;
 let openTimer,closeTimer;
 header.addEventListener('mouseenter',()=>{clearTimeout(closeTimer);clearTimeout(openTimer);openTimer=setTimeout(()=>header.classList.add('is-menu-open'),280)});
 header.addEventListener('mouseleave',()=>{clearTimeout(openTimer);closeTimer=setTimeout(()=>header.classList.remove('is-menu-open'),100)});
 header.addEventListener('focusin',()=>{clearTimeout(openTimer);header.classList.add('is-menu-open')});
 header.addEventListener('focusout',e=>{if(!header.contains(e.relatedTarget))header.classList.remove('is-menu-open')});
})();