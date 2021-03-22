import createMainDOM from './pages/main';
import createConstructorDOM from './pages/constructor';
import header from './js/Header';
import WorkSpace from './js/WorkSpace';
import workSpaceHeader from './js/WorkSpaceHeader';
import controls from './js/ControlsIcons';
import ControlsElements from './js/ControlsElements';
import slider from './js/Slider';
import auth from './js/FirebaseAuth';
import './styles/main.scss';
import './style.scss';
import { startMovable } from './js/moveable';
import 'bootstrap/dist/css/bootstrap.min.css';
import modals from './js/Modals';

const workSpace = new WorkSpace('resume');
let moveableItems;

function createMain (ifLoggedIn = false) {
  createMainDOM();
  modals.injectModals();
  header.createMainHeader();
  auth.createAuthPanelMain(ifLoggedIn);
  auth.firebaseSetup(ifLoggedIn);
  window.removeEventListener('resize', resizeWindowListener);
  slider.init();
}

createMain();

function createEditorPage () {
    const controlsElements = new ControlsElements('Templates');
    createConstructorDOM();
    header.createHeader();
    workSpaceHeader.createWorkSpaceHeaderRight();
    controls.createControlPanel();
    controlsElements.createControlElementsPanel();
    workSpace.createWorkSpace();

  document.querySelector('.controls__elements-list').addEventListener('click', (event) => {

    workSpace.showTemplateOnScreen(event.target);
    if (moveableItems.length > 0) {
      moveableItems[0].updateTarget();
    }
  });

  window.addEventListener('resize', resizeWindowListener);
  moveableItems = startMovable();  //start moveable
  workSpace.calculateScale(window);
}

function resizeWindowListener (e) {
  workSpace.calculateScale(e);
}

export { moveableItems, createEditorPage, createMain };
