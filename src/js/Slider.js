import '../styles/slider.scss';
import DOM from './DOMLinks';
import { Keyboard, Navigation, Pagination, Swiper } from 'swiper';
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination, Keyboard]);
const dom = DOM.getHTMLElements();
const examples = [
  {
    'type': 'Resume',
    'img': '../images/Types/resume.jpg',
  },
  {
    'type': 'Letter',
    'img': '../images/Types/letter.jpg',
  },
  {
    'type': 'Report',
    'img': '../images/Types/report.jpg',
  },
  {
    'type': 'Card',
    'img': '../images/Types/card.jpg',
  },
  {
    'type': 'Business card',
    'img': '../images/Types/business-card.jpg',
  },
  {
    'type': 'Certificate',
    'img': '../images/Types/certificate.jpg',
  },
  {
    'type': 'Facebook post',
    'img': '../images/Types/facebook-post.jpg',
  },
  {
    'type': 'Instagram post',
    'img': '../images/Types/instagram-post.jpg',
  },
];

class Slider {
  init (
    container = '.swiper-container',
    keyboard = false, nextEl = '.swiper-button-next.next1',
    prevEl = '.swiper-button-prev.prev1',
    pagination = '.swiper-pagination.pagination1',
    loop = true,
  ) {

    const slider = new Swiper(container, {
      slidesPerView: 1,
      speed: 400,
      // centeredSlides: true,
      // centeredSlidesBounds: true,
      loop: loop,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        570: {
          slidesPerView: 2,
        },
        930: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
      },
      keyboard: {
        enabled: keyboard,
        onlyInViewport: true,
      },

    });
    examples.forEach((item, index) => {
      slider[0].addSlide(index, `
<div class="swiper-slide">
    <div class="card__container modal-trigger" data-type="${examples[index].type}" href="#modal${this.getIndexOfModal(item)}">
        <div class='slider__card-header'>
            <img class='slider__card-header-img' src='${examples[index].img}'>
        </div>
        <div class='slider__card-title'>
            <h4 class='slider__card-title-h4'>${examples[index].type}</h4>
        </div>
    </div>
</div>`);
    });
  }

  secondSlider() {
    return new Swiper('#ffff', {
      slidesPerView: 3,
      speed: 400,
      navigation: {
        nextEl: '.swiper-button-next.next2',
        prevEl: '.swiper-button-prev.prev2',
      },
      // pagination: {
      //   el: '.swiper-pagination.pagination2',
      //   type: 'bullets',
      //   clickable: true,
      // },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        570: {
          slidesPerView: 2,
        },
        930: {
          slidesPerView: 3,
        },
        1100: {
          slidesPerView: 4,
        },
      },

    })

  }


  addSlides (swiper, slides) {
    swiper.appendSlide(slides);
  }

  getIndexOfModal (el) {
    return el.type === 'Resume' ? 1 : 2;
  }

}

const slider = new Slider();
export default slider;
