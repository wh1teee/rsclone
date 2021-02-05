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
const workSpace = new WorkSpace('resume');

let moveableItems;
function startMain(ifLoggedIn = false) {
    M.AutoInit();
    createMainDOM();
    header.createMainHeader();
    auth.createAuthPanelMain(ifLoggedIn);
    window.removeEventListener('resize', resizeWindowListener);
    slider.init()
    document.getElementById('create-design').addEventListener('click', createEditorPage);
}

startMain()

function createEditorPage() {
    createConstructorDOM();
    header.createHeader();
    controls.createControlPanel();

    const controlsElements = new ControlsElements('Templates');
    controlsElements.createControlElementsPanel();
    workSpace.createWorkSpace();
    workSpaceHeader.createWorkSpaceHeaderRight();

    window.addEventListener('resize', resizeWindowListener);
    document.querySelector('.controls__elements-list').addEventListener('click', (event) => {

     workSpace.showTemplateOnScreen(event.target);

        if (moveableItems.length > 0) {
            moveableItems[0].updateTarget()
        }
        // moveableItems[1].findSelectableTargets()
        // moveableItems = startMovable()  //start moveable
    });
    moveableItems = startMovable()  //start moveable
}

function resizeWindowListener(e){
    workSpace.calculateScale(e)
}
export {moveableItems, createEditorPage, startMain}
