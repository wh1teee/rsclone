import createMainDOM from '../pages/main';
import auth from './FirebaseAuth';
import slider from './Slider';

import '../styles/constructor.scss';

import DOM from './DOMLinks';

const menuElements = ['< Main', 'File'];
const mainMenuElements = ['Home', 'Templates', 'Features', 'Learn', 'Plans'];


class Header {

    createMainHeader() {
        const dom = DOM.getHTMLElements();

        mainMenuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a class="waves-effect waves-light btn">${item}
            <span class="material-icons">keyboard_arrow_down</span></a>
            `;
            dom.menuControlsList.append(listItem); 
        });      
    }
      
    createHeader() {
        const dom = DOM.getHTMLElements();

        menuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a class="waves-effect waves-light btn white teal-text text-lighten-2">${item}</a>
            `;
            dom.menuControlsList.append(listItem);        
        })

        if (document.querySelector('.constructor'))
        document.querySelector('.constructor').addEventListener('click', (event) => {
            console.log(event.target.textContent);
            if (event.target.textContent == '< Main') {
                console.log('555');
                createMainDOM();
                this.createMainHeader();
                auth.createAuthPanelMain();

                const getCurrentQuantity = () => {
                    let quantity = 1;
                    if (document.body.clientWidth >= 1280) { 
                        quantity = 7;
                        } else if (document.body.clientWidth >= 768) {
                            quantity = 5;
                        } else if (document.body.clientWidth >= 520) {
                            quantity = 3;
                            };
                    return quantity;
                }
                slider.generateCards('left', slider.getCurrentQuantity());
            }
});


     /*   dom.menuControlsList.addEventListener('click', (event) => {
            console.log(event.target.textContent);
            if (event.target.textContent == '< Main') {
                console.log(event.target.textContent); //!!!
            }
        });*/
        
        dom.headerControls.innerHTML = `
            <input type='text' size='20'>
            <li><a class="waves-effect waves-light btn white teal-text text-lighten-2" id='download-button'>Download</a></li>
            <li><a class="waves-effect waves-light btn white teal-text text-lighten-2">...</a></li>
        `;     

    }
}

const header = new Header();

export default header;
