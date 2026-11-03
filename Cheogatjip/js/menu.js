(() => {
 const tabs=[...document.querySelectorAll('.menu-catalog .menu-tab')];
 const cards=[...document.querySelectorAll('#menu-grid .menu-card')];
 const count=document.getElementById('menu-count');
 function setCategory(category,focus=false){
  let visible=0;
  cards.forEach(card=>{
   const categories=(card.dataset.categories||'').split(/\s+/);
   const show=category==='all'||categories.includes(category);
   card.hidden=!show;if(show)visible++;
  });
  count.textContent=visible;
  tabs.forEach(tab=>{
   const active=tab.dataset.filter===category;
   tab.classList.toggle('is-active',active);
   tab.setAttribute('aria-selected',String(active));
   tab.tabIndex=active?0:-1;
  });
  if(focus)tabs.find(tab=>tab.dataset.filter===category)?.focus();
 }
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>setCategory(tab.dataset.filter));
  tab.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
   if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
   setCategory(tabs[next].dataset.filter,true);
  });
 });
 setCategory('all');
})();