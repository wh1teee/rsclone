import '../styles/constructor.scss';

import DOM from './DOMLinks';

const menuElements = ['< Main', 'File'];
const mainMenuElements = ['Home', 'Templates', 'Features', 'Learn', 'Plans'];


class Header {

    createMainHeader() {
        const dom = DOM.getHTMLElements();

        mainMenuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<button type='button'>${item}<span class="material-icons">keyboard_arrow_down</span></button>`;
            dom.menuControlsList.append(listItem);        
        })

        dom.authInfo.innerHTML = `
            <button type='button' id='download-button'>Download</button>
            <button type='button'>...</button>      

        `;

        
    }

      
    createHeader() {
        const dom = DOM.getHTMLElements();

        menuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<button type='button'>${item}</button>`;
            dom.menuControlsList.append(listItem);        
        })

        dom.headerControls.innerHTML = `
            <input type='text' size='20'>
            <button type='button' id='download-button'>Download</button>
            <button type='button'>...</button>       
        `;

        
    }


}

const header = new Header();

export default header;