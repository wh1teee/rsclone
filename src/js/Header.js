import '../styles/constructor.scss';

import DOM from './DOMLinks';

const menuElements = ['< Main', 'File'];


class Header {

      
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