import * as flsFunctions from "./modules/functions.js";
import { feedbacksHome } from "./modules/mocks.js";
flsFunctions.isWebp();
import Swiper, {Navigation, Pagination} from "swiper";
const swiper = new Swiper()


// логика для слайдера ****************************************************************
let numberFeedbacks = 0;

const btnPrevFeedbacksHome = document.querySelector(
    ".feedbacks-home .btn-prev"
  ),
  btnNextFeedbacksHome = document.querySelector(".feedbacks-home .btn-next"),
  imgFeedbacksHome = document.querySelector(".feedbacks-home .slider__photo"),
  titleFeedbacksHome = document.querySelector(".feedbacks-home .slider__title"),
  textFeedbacksHome = document.querySelector(".feedbacks-home .slider__text"),
  pointsFeedbacksHome = document.querySelectorAll(
    ".feedbacks-home .slider__point-item"
  ),
  urlFeedbacksHome = imgFeedbacksHome.src.slice(0, -19);

btnNextFeedbacksHome.addEventListener("click", () => {
  numberFeedbacks === feedbacksHome.length - 1
    ? (numberFeedbacks = 0)
    : numberFeedbacks++;

  getValuesFeedback();
  getPointFeedback();
});

btnPrevFeedbacksHome.addEventListener("click", () => {
  numberFeedbacks === 0
    ? (numberFeedbacks = feedbacksHome.length - 1)
    : numberFeedbacks--;

  getValuesFeedback();
  getPointFeedback();
});

function getValuesFeedback() {
  titleFeedbacksHome.innerText = feedbacksHome[numberFeedbacks]["title"];
  textFeedbacksHome.innerText = feedbacksHome[numberFeedbacks]["text"];
  imgFeedbacksHome.src = `${urlFeedbacksHome}${feedbacksHome[numberFeedbacks]["img"]}`;
}

function getPointFeedback() {
  pointsFeedbacksHome.forEach((item, index) => {
    if (index === numberFeedbacks) {
      item.classList.add("active-point");
    } else {
      item.classList.remove("active-point");
    }
  });
}

// открытие всех модалок ****************************************************************
const modalsOpenBtns = document.querySelectorAll(".modal-open"),
  modals = document.querySelectorAll(".modal"),
  body = document.body;

modalsOpenBtns.forEach((item) => {
  item.addEventListener("click", (event) => {
    let dataAttribute = event.target.dataset.modalOpen;
    modals.forEach((item) => {
      if (item.dataset.modal == dataAttribute) {
        openModal(item);
      }
    });
  });
});

modals.forEach((item) => {
  item.addEventListener("click", (event) => {
    closeModal(event);
  });
});

// закрытие по кнопке esc
window.addEventListener("keydown", (event) => {
  modals.forEach((item) => {
    if (event.key === "Escape" && item.classList.contains("active")) {
      item.classList.remove("active");
      body.classList.remove("locked-body");
    }
  });
});

function openModal(elem) {
  elem.classList.add("active");
  body.classList.add("locked-body");
}

function closeModal(event) {
  if (event.target.classList.contains("modal__bg")) {
    event.target.closest(".modal").classList.remove("active");
    body.classList.remove("locked-body");
  }
}

// открытие больших картинок Gallery ****************************************************************

const itemsImgOpen = document.querySelectorAll(".modal-open"),
  itemsBigImg = document.querySelectorAll(".big-img");

itemsImgOpen.forEach((item) => {
  item.addEventListener("click", (event) => {
    let dataAttribute = event.target.dataset.imgOpen;

    itemsBigImg.forEach((item) => {
      if (item.dataset.img === dataAttribute) {
        item.classList.add("active-photo");
      } else {
        item.classList.remove("active-photo");
      }
    });
  });
});

// смена header *********************************************************
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

//ligth header с секции about *******************************************
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
//dark header на баннере*************************************
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
//функция для определения местоположения
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
