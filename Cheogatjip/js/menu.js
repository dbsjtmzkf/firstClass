(() => {
 const tabs=[...document.querySelectorAll('.menu-catalog .menu-tab')];
 const cards=[...document.querySelectorAll('#menu-grid .menu-card')];
 const count=document.getElementById('menu-count');
 const grid=document.getElementById('menu-grid');
 cards.forEach(card=>{
  const open=()=>{location.href='menu-detail.html?item='+encodeURIComponent(card.dataset.menuId||'supreme');};
  card.addEventListener('click',open);
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
 });
 const categories=new Set(tabs.map(tab=>tab.dataset.filter));
 function categoryFromHash(){
  const key=decodeURIComponent(location.hash.slice(1)).toLowerCase();
  return categories.has(key)?key:'all';
 }
 function setCategory(category,focus=false){
  if(!categories.has(category))category='all';
  let visible=0;
  cards.forEach(card=>{
   const cardCategories=(card.dataset.categories||'').split(/\\s+/);
   const show=category==='all'||cardCategories.includes(category);
   card.hidden=!show;
   if(show)visible++;
  });
  count.textContent=visible;
  tabs.forEach(tab=>{
   const active=tab.dataset.filter===category;
   tab.classList.toggle('is-active',active);
   tab.setAttribute('aria-selected',String(active));
   tab.tabIndex=active?0:-1;
  });
  grid.setAttribute('aria-labelledby',tabs.find(tab=>tab.dataset.filter===category)?.id||'tab-all');
  if(focus)tabs.find(tab=>tab.dataset.filter===category)?.focus();
 }
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>{
   const category=tab.dataset.filter;
   if(category==='all')history.replaceState(null,'',location.pathname+location.search+'#menu-list');
   else history.replaceState(null,'',location.pathname+location.search+'#'+category);
   setCategory(category);
  });
  tab.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
   if(event.key==='Home')next=0;
   if(event.key==='End')next=tabs.length-1;
   setCategory(tabs[next].dataset.filter,true);
  });
 });
 window.addEventListener('hashchange',()=>setCategory(categoryFromHash()));
 setCategory(categoryFromHash());
})();