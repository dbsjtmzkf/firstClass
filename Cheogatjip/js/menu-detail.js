(() => {
 const data={
  "supreme-black":{name:"슈프림양념치킨 블랙라벨",category:"치킨",description:"달콤한 양념과 부드러운 소스가 어우러진 처갓집의 대표 메뉴입니다.",price:"19,000원 + 추가금",image:"img/image%2033.png",alt:"슈프림양념치킨 블랙라벨"},
  "supreme":{name:"슈프림 양념치킨",category:"신메뉴 · 치킨",description:"풍성한 소스와 바삭한 치킨의 조화를 즐겨보세요.",price:"19,000원 + 추가금",image:"img/image%2034.png",alt:"슈프림 양념치킨"},
  "k-mala":{name:"K-마라 양념치킨",category:"신메뉴 · 치킨",description:"매콤한 마라 풍미를 더해 색다르게 즐기는 양념치킨입니다.",price:"19,000원 + 추가금",image:"img/thumb-1926160956_nRZEOJGp_615ce8c889ffa791d38572416244402b079e12c4_280x0%201.png",alt:"K-마라 양념치킨"},
  "meat-chili":{name:"미트칠리 양념치킨",category:"신메뉴 · 치킨",description:"매콤달콤한 미트칠리 풍미를 담은 메뉴입니다.",price:"19,000원 + 추가금",image:"img/thumb-2944075207_iEoYJC2D_4ca15e36798c0af67c0f0a10ec836015492c7dd0_280x0%201.png",alt:"미트칠리 양념치킨"},
  "fried":{name:"후라이드 치킨",category:"치킨",description:"바삭하고 담백한 클래식 치킨 메뉴입니다.",price:"매장별 확인",placeholder:true},
  "side":{name:"사이드 메뉴",category:"사이드",description:"치킨과 함께 즐기는 곁들임 메뉴를 만나보세요.",price:"매장별 확인",placeholder:true},
  "cheese-ball":{name:"치즈볼",category:"사이드",description:"한입에 즐기는 고소한 사이드 메뉴입니다.",price:"매장별 확인",placeholder:true},
  "drink":{name:"주류",category:"주류",description:"메뉴와 함께 즐기는 주류 메뉴입니다.",price:"매장별 확인",placeholder:true}
 };
 const id=new URLSearchParams(location.search).get('item')||'supreme-black';
 const item=data[id]||data["supreme-black"];
 document.title=item.name+" | 처갓집양념치킨";
 document.getElementById('detail-title').textContent=item.name;
 document.getElementById('detail-breadcrumb').textContent=item.name;
 document.getElementById('detail-category').textContent=item.category.toUpperCase();
 document.getElementById('detail-description').textContent=item.description;
 document.getElementById('detail-type').textContent=item.category;
 document.getElementById('detail-price').textContent=item.price;
 const visual=document.getElementById('detail-visual');
 if(!item.placeholder&&item.image){
  const img=document.createElement('img');img.src=item.image;img.alt=item.alt;img.loading='eager';visual.replaceChildren(img);
 }
})();