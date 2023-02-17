import * as flsFunctions from "./modules/functions.js";
import { slider_1, slider_2 } from "./modules/mocks.js";
flsFunctions.isWebp();
import Swiper from "swiper";
const swiper = new Swiper();

//логика для слайдера ****************************************************************
const btnPrevFeedbacks = document.querySelector(".slider__btn.btn-prev"),
  btnNextFeedbacks = document.querySelector(".slider__btn.btn-next"),
  titleFeedbacks = document.querySelector(".slider__title"),
  textFeedbacks = document.querySelector(".slider__text"),
  imgFeedbacks = document.querySelector(".slider__photo"),
  pointsFeedbacks = document.querySelectorAll(
    ".slider__points-list .slider__point-item"
  );
let numberFeedbacks = 0;
let urlFeedbacks;

if (imgFeedbacks) {
  urlFeedbacks = imgFeedbacks.src.slice(0, -15);
  btnNextFeedbacks.addEventListener("click", (event) => {
    numberFeedbacks === 2 ? (numberFeedbacks = 0) : numberFeedbacks++;
    getPointFeedback();
    getValuesFeedback(event);
  });

  btnPrevFeedbacks.addEventListener("click", (event) => {
    numberFeedbacks === 0 ? (numberFeedbacks = 2) : numberFeedbacks--;
    getPointFeedback();
    getValuesFeedback(event);
  });
  function getValuesFeedback(elem) {
    let dataAttribute = elem.target.dataset.slider;
    let arr;

    // тут дописываем появившиеся слайдеры
    if (dataAttribute === "slider_1") {
      arr = slider_1;
    } else if (dataAttribute === "slider_2") {
      arr = slider_2;
    }

    if (
      dataAttribute === titleFeedbacks.dataset.slider &&
      dataAttribute === textFeedbacks.dataset.slider &&
      dataAttribute === imgFeedbacks.dataset.slider
    ) {
      titleFeedbacks.innerText = arr[numberFeedbacks]["title"];
      textFeedbacks.innerText = arr[numberFeedbacks]["text"];
      imgFeedbacks.src = `${urlFeedbacks}${arr[numberFeedbacks]["img"]}`;
    }
  }

  function getPointFeedback() {
    pointsFeedbacks.forEach((item, index) => {
      if (index === numberFeedbacks) {
        item.classList.add("active-point");
      } else {
        item.classList.remove("active-point");
      }
    });
  }
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
const header = document.querySelector(".header");
const headerDark = document.querySelector(".header__dark");
const headerLight = document.querySelector(".header__light");
const mainBanner = document.querySelector(".main__banner");
const about = document.querySelector(".about");
if (about) {
  let heightAbout = about.offsetHeight;
  let offsetAbout = offset(about).top;
  let offsetBanner = offset(mainBanner).top;
  let heightBanner = mainBanner.offsetHeight;
  const animStart = 0.8;
  const anim = 0.9;
  let animItemPoint = window.innerHeight - heightAbout / animStart;
  let animItemPointBanner = window.innerHeight - heightBanner / anim;

  //ligth header с секции about *******************************************
  window.addEventListener("scroll", () => {
    if (
      scrollY > offsetAbout - animItemPoint &&
      screenY < offsetAbout + heightAbout
    ) {
      header.classList.remove("banner-version");
      header.classList.add("light-version");
      headerDark.style.display = "none";
      headerLight.style.display = "block";
    } else {
      header.classList.remove("light-version");
      header.classList.add("banner-version");
      headerDark.style.display = "block";
      headerLight.style.display = "none";
    }
  });
  //dark header на баннере*************************************
  window.addEventListener("scroll", () => {
    if (
      scrollY > offsetBanner - animItemPointBanner &&
      screenY < offsetBanner + heightBanner
    ) {
      header.classList.add("banner-version");
    } else {
      header.classList.remove("banner-version");
    }
  });
  //функция для определения местоположения
  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}

//аккордион
const accordionTitles = document.querySelectorAll(
    ".faq__accordion-block-title"
  ),
  accordionContents = document.querySelectorAll(".faq__accordion-content");

accordionTitles.forEach((item) => {
  item.addEventListener("click", (event) => {
    let targetItem = event.target.closest(".faq__accordion-block-title");

    openContent(targetItem);
    activeBtn(targetItem);
  });
});

function activeBtn(elem) {
  if (elem.classList.contains("active-acc")) {
    elem.classList.remove("active-acc");
  } else {
    accordionTitles.forEach((item) => {
      item.classList.remove("active-acc");
    });
    elem.classList.add("active-acc");
  }
}

function openContent(elem) {
  let contentItem = elem.nextElementSibling;
  if (contentItem.style.height) {
    accordionContents.forEach((item) => {
      item.style.height = null;
    });
  } else {
    accordionContents.forEach((item) => {
      item.style.height = null;
    });
    contentItem.style.height = contentItem.scrollHeight + 20 + "px";
  }
}
