import '../styles/slider.scss';

import DOM from './DOMLinks';

const dom = DOM.getHTMLElements(); 

const examples = [
    {
        'type':'Resume',
        'img':'../images/Types/resume.jpg'
    },
    {
        'type':'Letter',
        'img':'../images/Types/letter.jpg'
    },
    {
        'type':'Report',
        'img':'../images/Types/report.jpg'
    },    
    {
        'type':'Card',
        'img':'../images/Types/card.jpg'
    },    
    {
        'type':'Business card',
        'img':'../images/Types/business-card.jpg'
    },
    {
        'type':'Certificate',
        'img':'../images/Types/certificate.jpg'
    },
    {
        'type':'Facebook post',
        'img':'../images/Types/facebook-post.jpg'
    },
    {
        'type':'Instagram post',
        'img':'../images/Types/instagram-post.jpg'
    }
];



class Slider {
    constructor() {
        this.quantity = 4;

    }

    getCurrentQuantity() {
        let quantity = 1;
        if (document.body.clientWidth >= 1280) { 
            quantity = 4;
          } else if (document.body.clientWidth >= 768) {
              quantity = 3;
            } else if (document.body.clientWidth >= 520) {
                quantity = 2;
              };
        return quantity;
    }


    addListenerForSlider(side) {
        this.quantity = this.getCurrentQuantity();
        console.log(this.quantity);

        setTimeout(() => {
            this.prepareTrack(side);
        }, 0);

        setTimeout(() => {
            this.generateCards(side, this.quantity);
        }, 100);

        setTimeout(() => {
            this.finishScroll(side);
            this.removeCards(side, this.quantity);
        }, 400);

        setTimeout(() => {
            this.clearScroll();
        }, 410);
    }

    changeSlider(event) {
        let newQuantity = this.getCurrentQuantity();

        if (newQuantity !== this.quantity) {
            this.removeCards('left', this.quantity);
            this.generateCards('left', newQuantity);
            this.quantity = newQuantity;
        }
    }

    prepareTrack(side) {
        const dom = DOM.getHTMLElements(); 

        if (side === 'left') {
            dom.track.style.right = '0';
        } else {
            dom.track.style.left = '0';
        }

        dom.arrows.forEach((arrow) => {
            arrow.setAttribute('disabled', '');
        })
    }

    finishScroll(side) {
        const dom = DOM.getHTMLElements(); 

        if (side === 'left') {
            dom.track.style.left = '0';
            dom.track.style.right = 'auto';
        } else {
            dom.track.style.left = 'auto';
            dom.track.style.right = '0';
        }
    }

    clearScroll() {
        const dom = DOM.getHTMLElements(); 

        dom.track.style.left = '';
        dom.track.style.right = '';

        dom.arrows.forEach((arrow) => {
            arrow.removeAttribute('disabled');
        })
    }

    createCard(index) {
        const dom = DOM.getHTMLElements();

        const card = document.createElement('div');
        card.className = 'slider__card';
        card.setAttribute('data-id', index);
        card.innerHTML = `
        <div class='slider__card-header'>
            <img class='slider__card-header-img' src='${examples[index].img}'>
        </div>
        <div class='slider__card-title'>
            <h4 class='slider__card-title-h4'>${examples[index].type}<h4>
        </div>
        `;
        dom.track.append(card);

    /*    card.addEventListener('click', (event) => {
            
        });*/

        return card;
    }

    generateCards(side, quantity = 4) {
    
        let cardsIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        const dom = DOM.getHTMLElements();

        dom.track.childNodes.forEach((card) => {
            cardsIndex = cardsIndex.filter((item) => item != card.dataset.id);
        })

        const currentCardsIndex = cardsIndex.sort(() => Math.random() - 0.5).slice(0, quantity);
        console.log(quantity);

        for (let i = 0; i < quantity;  i += 1) {
            const card = this.createCard(currentCardsIndex[i]);

            if (side === 'left') {
                dom.track.prepend(card);
            } else {
                dom.track.append(card);
            }
        }
    }

    removeCards(side, quantity = 4) {
        const dom = DOM.getHTMLElements(); 

        for (let i = 0; i < quantity; i++) {
            const card = side === 'left' ? dom.track.lastChild : dom.track.firstChild;
            dom.track.removeChild(card);
        }
    }

}

const slider = new Slider();

export default slider;