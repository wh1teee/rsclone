import DOM from './js/DOMLinks';
import createMainDOM from './pages/main';
import createConstructorDOM from './pages/constructor';
import header from './js/Header';
import WorkSpace from './js/WorkSpace';
import workSpaceHeader from './js/WorkSpaceHeader';
import controls from './js/ControlsIcons';
import ControlsElements from './js/ControlsElements';
import editor from './js/Editor';
import slider from './js/Slider';
import auth from './js/FirebaseAuth';


import {template1, template2} from './templates';

import './styles/main.scss';
//import './styles/constructor.scss';
//import './styles/editor.scss';
import './style.scss';

const dom = DOM.getHTMLElements(); 

M.AutoInit();

/*
createMainDOM();
header.createMainHeader();
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

*/


// для вывода страницы конструктор раскомментируй эти строки и закомментируй начиная со стр.22
createConstructorDOM();

header.createHeader();


controls.createControlPanel();

const controlsElements = new ControlsElements('Templates');
controlsElements.createControlElementsPanel();

const workSpace = new WorkSpace('resume');
workSpace.createWorkSpace();
workSpaceHeader.createWorkSpaceHeaderRight();

window.addEventListener('resize', (event) => workSpace.calculateScale(event));


document.querySelector('.controls__elements-list').addEventListener('click', (event) => {
        console.log(event);
        console.log(event.target);
    //    console.log(event.target.getAttribute('id'));
    //    console.log(event.target.getAttribute('class'));
    //    console.log(event.target.getAttribute('id').match(/([^\-]+$)/gm).toString());
    //    const element = event.target.getAttribute('id').match(/([^\-]+$)/gm).toString();
        
        workSpace.showTemplateOnScreen(event.target);
});

/*if (document.querySelector('.controls__elements-text-div'))

document.querySelector('.controls__elements-text-div').addEventListener('click', (event) => {
    console.log('888888');
    console.log(event.target);
    workSpace.showTemplateOnScreen(event.target);
});*/

// document.getElementById('input-upload').addEventListener('change', ControlsElements.handleFiles(this.files)); 

/*


document.getElementById('next').addEventListener('click', (event) => {
    slider.addListenerForSlider('right');
    console.log('right');
});

document.getElementById('prev').addEventListener('click', (event) => {
    slider.addListenerForSlider('left');
    console.log('left');
});

window.addEventListener('resize', (event) => {
        slider.changeSlider(event);
    });    
*/
