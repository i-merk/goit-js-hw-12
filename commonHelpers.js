import{a as b,S as w,i as a}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const E="44654368-4937825c1744fe72f2410636e",v="https://pixabay.com/api/";async function g(t,r=1,o=15){try{return(await b.get(v,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o}})).data.hits}catch{throw new Error("Failed to fetch images")}}const h=document.querySelector(".gallery");function S(){h.innerHTML=""}const q=new w(".gallery a",{captionsData:"alt",captionDelay:250});function p(t){const r=t.map(o=>P(o)).join("");h.insertAdjacentHTML("beforeend",r),q.refresh()}function P({webformatURL:t,largeImageURL:r,tags:o,likes:n,views:e,comments:s,downloads:i}){return`
    <div class="photo-card">
      <a href="${r}" class="gallery-link">
        <img src="${t}" alt="${o}" loading="lazy" class="gallery-image"/>
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${n}</p>
        <p class="info-item"><b>Views:</b> ${e}</p>
        <p class="info-item"><b>Comments:</b> ${s}</p>
        <p class="info-item"><b>Downloads:</b> ${i}</p>
      </div>
    </div>
  `}const M=document.querySelector(".search-form"),$=document.querySelector(".search-input"),f=document.querySelector(".load-more"),c=document.querySelector(".loader");let l=1,y="";const u=15;M.addEventListener("submit",x);f.addEventListener("click",A);async function x(t){t.preventDefault();const r=$.value.trim();if(!r){a.error({title:"Error",message:"Please enter a search query."});return}y=r,l=1,S(),m(),L();try{const o=await g(r,l,u);if(d(),o.length===0){a.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(o),a.success({title:"Success",message:`Found ${o.length} images.`}),o.length>=u&&O()}catch{d(),a.error({title:"Error",message:"An error occurred while searching for images. Please try again later."})}}async function A(){l+=1,L();try{const t=await g(y,l,u);if(d(),t.length===0){a.info({title:"End of List",message:"No more images for this search query."}),m();return}p(t),t.length<u&&m()}catch{d(),a.error({title:"Error",message:"An error occurred while loading more images. Please try again later."})}}function L(){c.textContent="Loading images, please wait...",c.classList.remove("hidden")}function d(){c.classList.add("hidden"),c.textContent=""}function O(){f.classList.remove("hidden")}function m(){f.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map
