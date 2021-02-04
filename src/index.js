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
import { startMovable } from './js/moveable';

const dom = DOM.getHTMLElements();
let moveableItems;
M.AutoInit();


createMainDOM();
header.createMainHeader();
auth.createAuthPanelMain();

slider.start()

document.getElementById('create-design').addEventListener('click', (event) => {
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
        if (moveableItems) moveableItems[1].destroy()

        workSpace.showTemplateOnScreen(event.target);
        moveableItems = startMovable()  //start moveable

    });

});

export {moveableItems}
