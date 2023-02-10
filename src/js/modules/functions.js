export function isWebp(){
  function testWebP(callback){
    let webP = new Image();
    webP.onload = webP.onerror = function() {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
  }
  testWebP(function(support){
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className)
  })
}
const header = document.querySelector('.header');
const headerDark = document.querySelector('.header__dark');
const headerLight = document.querySelector('.header__light');
const mainBanner = document.querySelector('.main__banner')
const about = document.querySelector('.about');

let heightAbout = about.offsetHeight;
let offsetAbout = offset(about).top;
let offsetBanner = offset(mainBanner).top;
let heightBanner = mainBanner.offsetHeight;
const animStart = 0.8;
const anim = 0.9;
let animItemPoint = window.innerHeight - heightAbout / animStart;
let animItemPointBanner = window.innerHeight - heightBanner / anim;

//light header since about
window.addEventListener('scroll', () => {
  if (
    scrollY > offsetAbout - animItemPoint &&
    screenY < offsetAbout + heightAbout
  ) {
  header.classList.remove('banner-version')
  header.classList.add('light-version')
  headerDark.style.display = 'none'
  headerLight.style.display = 'block'
  } else {
  header.classList.remove('light-version')
  header.classList.add('banner-version')
  headerDark.style.display = 'block'
  headerLight.style.display = 'none'
  }
});
//dark header since banner
window.addEventListener('scroll', () => {
  if (
    scrollY > offsetBanner - animItemPointBanner &&
    screenY < offsetBanner + heightBanner
  ) {
  header.classList.add('banner-version')
  }else{
    header.classList.remove('banner-version') 
  }
});
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
