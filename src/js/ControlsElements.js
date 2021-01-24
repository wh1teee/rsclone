import DOM from './DOMLinks';

const templateElements = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Music', 'Videos', 'Background', 'Folders', 'More'];
const templateElementsNumber = [12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];


class ControlsElements {

    constructor(template){
        this.template = template;
    }

    createControlElementsPanel() {
        const dom = DOM.getHTMLElements();
        const number = templateElements.indexOf(this.template);

        for (let i = 1; i <= templateElementsNumber[number]; i += 1) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src='../images/${this.template}/${this.template.toLowerCase()}${i}.webp' class='element-${this.template}' id='element-${this.template.toLowerCase().replace('s','')}${i}'>`;
            dom.controlsElementsList.append(listItem);       

        }
        
      
    }
}

/*const controlsElements = new ControlsElements();*/

export default ControlsElements;