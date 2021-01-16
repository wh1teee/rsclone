import DOM from './js/DOMLinks';
import createMainDOM from './pages/main';
import createConstructorDOM from './pages/constructor';
import header from './js/Header';
import WorkSpace from './js/WorkSpace';
import controls from './js/ControlsIcons';
import ControlsElements from './js/ControlsElements';
import editor from './js/Editor';


import {template1, template2} from './templates';

import './style.scss';


const dom = DOM.getHTMLElements(); 

createConstructorDOM();
header.createHeader();

controls.createControlPanel();

const controlsElements = new ControlsElements('Templates');
controlsElements.createControlElementsPanel();

const workSpace = new WorkSpace('resume');
workSpace.createWorkSpace();

window.addEventListener('resize', (event) => workSpace.calculateScale(event));


document.querySelector('.controls__elements-list').addEventListener('click', (event) => {
        console.log(event);
        console.log(event.target);
        console.log(event.target.getAttribute('id'));
        console.log(event.target.getAttribute('id').match(/([^\-]+$)/gm).toString());
        const elementStyle = event.target.getAttribute('id').match(/([^\-]+$)/gm).toString();
        
        workSpace.showTemplateOnScreen(elementStyle);
});
/*
if (document.querySelector('.template1__wrapper'))
document.querySelector('.left__section').addEventListener('click', (event) => editor.createContainer(event));
*/





/*document.body.innerHTML = `${template1}`;*/
