const projects = [
 {name:'Carona Universitária',key:'carona',count:4,tags:['Mobilidade','FullStack'],description:'Conectando estudantes que compartilham o mesmo caminho. Uma plataforma para organizar caronas e aproximar a comunidade universitária.',repos:[['Frontend','carona-frontend'],['Backend','carona-backend']]},
 {name:'CTD Flipbook',key:'flipbook',count:2,tags:['Documentos','FullStack'],description:'Uma nova forma de explorar documentos. Arquivos PDF ganham uma experiência de leitura interativa, com biblioteca e compartilhamento.',repos:[['Ver código','flipbook']]},
 {name:'CTD Resource',key:'resource',count:3,tags:['Conhecimento','Monorepo'],description:'Conhecimento organizado em um só lugar. Um portal de documentação, guias e recursos para o dia a dia do desenvolvimento.',repos:[['Ver código','ctd-resource']]},
 {name:'CTD Animal',key:'animal',count:3,tags:['Adoção','FullStack'],description:'Tecnologia a serviço de novos encontros. Um hub digital para apresentar animais, organizar informações e apoiar o processo de adoção.',repos:[['Frontend','ctd-animal-frontend'],['Backend','ctd-animal-backend']]}
];
const viewer=document.querySelector('#viewer');
projects.forEach((p,index)=>{
 const article=document.createElement('article'); article.className='project';
 article.innerHTML=`<div class="project-heading"><div class="project-title"><span class="project-number">0${index+1}</span><h3>${p.name}</h3></div><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="gallery" role="region" aria-label="Telas de ${p.name}" aria-roledescription="carrossel" tabindex="0">${Array.from({length:p.count},(_,i)=>`<div class="slide ${i===0?'active':''}"><button class="image-button" aria-label="Ampliar tela ${i+1} de ${p.name}"><img src="assets/${p.key}-${i+1}.png" alt="${p.name} — tela ${i+1}" loading="lazy"></button></div>`).join('')}<div class="gallery-bar"><span class="gallery-label">EXPLORE AS TELAS · CLIQUE PARA AMPLIAR</span><div class="gallery-controls"><button class="prev" aria-label="Tela anterior de ${p.name}">←</button><span class="counter" aria-live="polite">01 / 0${p.count}</span><button class="next" aria-label="Próxima tela de ${p.name}">→</button></div></div></div><div class="project-info"><p>${p.description}</p><div class="repo-links">${p.repos.map(([label,repo])=>`<a href="https://github.com/Renn4nn/${repo}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div></div>`;
 document.querySelector('#project-list').append(article);
 let current=0; const slides=[...article.querySelectorAll('.slide')];
 function change(direction){slides[current].classList.remove('active');current=(current+direction+p.count)%p.count;slides[current].classList.add('active');article.querySelector('.counter').textContent=`0${current+1} / 0${p.count}`;}
 article.querySelector('.prev').onclick=()=>change(-1); article.querySelector('.next').onclick=()=>change(1);
 article.querySelector('.gallery').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();change(e.key==='ArrowLeft'?-1:1)}});
 let touchX;const gallery=article.querySelector('.gallery');gallery.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});gallery.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>50)change(d<0?1:-1)},{passive:true});
 article.querySelectorAll('.image-button').forEach(button=>button.onclick=()=>{const img=button.querySelector('img');viewer.querySelector('img').src=img.src;viewer.querySelector('img').alt=img.alt;viewer.querySelector('p').textContent=img.alt;viewer.showModal()});
});
viewer.querySelector('.close').onclick=()=>viewer.close();viewer.onclick=e=>{if(e.target===viewer)viewer.close()};
