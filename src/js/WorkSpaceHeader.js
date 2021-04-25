import DOM from './DOMLinks';
import { moveableItems } from '../index';

let canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');

class WorkSpaceHeader {
  createWorkSpaceHeaderRight () {
    const dom = DOM.getHTMLElements();
    dom.workSpaceHeaderRight.innerHTML = `
        <span class='material-icons' id='zoom__out'>zoom_out</span>
        <span class='material-icons' id='zoom__in'>zoom_in</span>
        <span class='material-icons' id='delete__element'>delete_outline</span>
        <span class='material-icons' id='delete__all'>delete</span>
        <span class="material-icons" id="volume">volume_off</span>
        `;
    dom.workSpaceHeaderRight.addEventListener('click', workSpaceHeaderRightListeners);

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Delete') {
        if (!moveableItems[0].target) return; // if there are no selected objects
        moveableItems[0].target.forEach(el => {
          el.remove();
        });
        moveableItems[0].updateRect();
        dom.workSpaceHeaderLeft.innerHTML = '';
      }
    });

    function workSpaceHeaderRightListeners (e) {
      const idOfElement = e.target.getAttribute('id');

      if (idOfElement === 'delete__all') {
        deleteAll();
      } else if (idOfElement === 'delete__element') {
        deleteElement();
      } else if (idOfElement === 'volume') {
        changeSoundOfClicks(e);
      } else if (idOfElement === 'zoom__in') {
        zoomIn();
      } else if (idOfElement === 'zoom__out') {
        zoomOut();
      }
    }

    function deleteAll () {
      const dom = DOM.getHTMLElements();
      dom.sheetContainer.innerHTML = '';
      dom.sheetContainer.style.backgroundColor = 'white';
      dom.sheetContainer.style.backgroundImage = 'none';
      moveableItems[0].updateRect();
    }

    function deleteElement () {
      if (!moveableItems[0].target) return; // if there are no selected objects
      moveableItems[0].target.forEach(el => {
        el.remove();
      });
      moveableItems[0].updateRect();
      dom.workSpaceHeaderLeft.innerHTML = '';
    }

    function changeSoundOfClicks (e) {
      if (e.target.textContent === 'volume_off') {
        e.target.textContent = 'volume_up';
        document.addEventListener('click', clickSound);
        document.addEventListener('keydown', clickSound);
      } else {
        e.target.textContent = 'volume_off';
        document.removeEventListener('click', clickSound);
        document.removeEventListener('keydown', clickSound);
      }
    }

    function zoomIn () {
      changeScale(1.05);
    }

    function zoomOut () {
      changeScale(0.95);
    }

    function changeScale (multiplierForNewScale) {
      const container = document.querySelector('.sheet__container');
      const containerTransformProperty = container.style.transform;
      const currentScale = containerTransformProperty.split(' ').filter(property => property.includes('scale'))
        .join('').match(/\d/g).join('');

      const currentScaleInNumber = Number(`${currentScale.slice(0, 1)}.${currentScale.slice(1)}`);
      const newScale = currentScaleInNumber * multiplierForNewScale;
      const newTransformProperty = containerTransformProperty.split(' ').filter(property => !property.includes('scale')).join('')
        + `scale(${newScale})`;
      container.style.transform = newTransformProperty;
    }

    function clickSound () {
      document.querySelector('audio').play();
    }
  }

  createWorkSpaceHeaderLeft () {
  }
}

const workSpaceHeader = new WorkSpaceHeader;

export default workSpaceHeader;
