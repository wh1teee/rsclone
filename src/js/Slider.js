import '../styles/slider.scss';
import DOM from './DOMLinks';
import { Keyboard, Navigation, Pagination, Swiper } from 'swiper';
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination, Keyboard]);
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
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });

    examples.forEach((item, index) => {
      slider.addSlide(index, `
<div class="swiper-slide">
    <div class="card__container" data-bs-toggle="modal" data-bs-target="#${this.getIndexOfModal(item)}Modal" data-type="${examples[index].type}">
        <div class='slider__card-header'>
            <img class='slider__card-header-img' src='${examples[index].img}' alt="slider image">
        </div>
        <div class='slider__card-title'>
            <h4 class='slider__card-title-h4'>${examples[index].type}</h4>
        </div>
    </div>
</div>`);
    });
  }

  secondSlider () {
    const dom = DOM.getHTMLElements();
    dom.exampleInner.innerHTML = `
                <h4 class='examples__inner-title'>Examples</h4>
                <div class="swiper-container" id="ffff">
                  <div class="swiper-wrapper" id="examples"></div>
                  <div class="swiper-pagination pagination2"></div>
                  <div class="swiper-button-prev prev2"></div>
                  <div class="swiper-button-next next2"></div>
                </div>
             </div>
    `;
    return new Swiper('#ffff', {
      slidesPerView: 3,
      speed: 400,
      navigation: {
        nextEl: '.swiper-button-next.next2',
        prevEl: '.swiper-button-prev.prev2',
      },
      pagination: {
        el: '.swiper-pagination.pagination2',
        type: 'bullets',
        clickable: true,
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

    });
  }

  addSlides (swiper, slides) {
    swiper.appendSlide(slides);
  }

  getIndexOfModal (el) {
    return el.type === 'Resume' ? 'existing' : 'developing';
  }
}

const slider = new Slider();
export default slider;
