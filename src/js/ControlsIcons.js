import DOM from './DOMLinks';
import ControlsElements from './ControlsElements';
import workSpace from './WorkSpace';

const templateIcons = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Background', 'Music'];
const templateImages = ['table_chart', 'cloud_upload', 'photo_size_select_actual', 'art_track', 'text_fields', 'brush', 'texture', 'audiotrack', 'ondemand_video', 'folder_special', 'more_horiz'];
const implementedIcons = 7;

class ControlsIcons {

  createControlPanel () {
    const dom = DOM.getHTMLElements();

    templateIcons.map((item, index) => {

      const listItem = document.createElement('li');
      listItem.setAttribute('id', `controls__icons-${item}`);
      listItem.classList.add('list__icon');
      if (index === 0) {
        listItem.classList.add('active_icon');
      }
      if (index === 1) {
        listItem.classList.add('before__active');
      }
      if (index >= implementedIcons) {
        listItem.dataset.bsToggle = 'modal';
        listItem.dataset.bsTarget = '#developingModal';
      }
      const templateImage = templateImages[index];
      listItem.innerHTML = `
                <span class='material-icons' data-targetid='${item}'>${templateImage}</span>
                <p data-targetId='${item}'>${item}</p>
                `;
      dom.controlsIconsList.append(listItem);
      dom.controlsIconsList.addEventListener('click', (event) => {

        if (event.target.dataset.targetid === `${item}` || event.target.getAttribute('id') === `controls__icons-${item}`) { // || event.target.parentNode.parentNode.getAttribute('class') == 'controls__icons-list') {
          this.switchToIcon(`${item}`);
        }
      });
    });
  }

  switchToIcon (icon) {
    switch (icon) {
      case `${templateIcons[0]}`:
        this.changeIcons(0);
        this.changeElemets(`${templateIcons[0]}`);
        break;
      case `${templateIcons[1]}`:
        this.changeIcons(1);
        this.changeUpload(`${templateIcons[1]}`);
        break;
      case `${templateIcons[2]}`:
        this.changeIcons(2);
        this.changeElemets(`${templateIcons[2]}`);
        break;
      case `${templateIcons[3]}`:
        this.changeIcons(3);
        this.changeElemets(`${templateIcons[3]}`);
        break;
      case `${templateIcons[4]}`:
        this.changeIcons(4);
        this.changeText(`${templateIcons[4]}`);
        break;
      case `${templateIcons[5]}`:
        this.changeIcons(5);
        this.changeDrawing(`${templateIcons[5]}`);
        break;
      case `${templateIcons[6]}`:
        this.changeIcons(6);
        this.changeBackground(`${templateIcons[6]}`);
        break;
      case `${templateIcons[7]}`:
        this.changeIcons(7);
        break;
      case `${templateIcons[8]}`:
        this.changeIcons(8);
        break;
      case `${templateIcons[9]}`:
        this.changeIcons(9);
        break;
      case `${templateIcons[10]}`:
        this.changeIcons(10);
        break;
      case `${templateIcons[11]}`:
        this.changeIcons(11);
        break;
    }
  }

  changeIcons (index) {
    if (index < implementedIcons) {
      templateIcons.forEach((item, i) => {
        if (i < implementedIcons + 1) {
          document.getElementById(`controls__icons-${templateIcons[i]}`).classList.remove('active_icon');
          document.getElementById(`controls__icons-${templateIcons[i]}`).classList.remove('before__active');
          document.getElementById(`controls__icons-${templateIcons[i]}`).classList.remove('after__active');
        }
      });
      if (index !== 0 && (templateIcons.length - 1) !== index) {
        document.getElementById(`controls__icons-${templateIcons[index]}`).classList.add('active_icon');
        document.getElementById(`controls__icons-${templateIcons[index - 1]}`).classList.add('after__active');
        document.getElementById(`controls__icons-${templateIcons[index + 1]}`).classList.add('before__active');
      } else if (index === 0) {
        document.getElementById(`controls__icons-${templateIcons[index]}`).classList.add('active_icon');
        document.getElementById(`controls__icons-${templateIcons[index + 1]}`).classList.add('before__active');
      } else {
        document.getElementById(`controls__icons-${templateIcons[index]}`).classList.add('active_icon');
        document.getElementById(`controls__icons-${templateIcons[index - 1]}`).classList.add('after__active');
      }

      const controlsElements = document.querySelector('.controls__elements');
      const controls = document.querySelector('.controls');
      if (controlsElements.classList.contains('hide')) {
        controlsElements.classList.remove('hide');
        controls.classList.add('show__controls');
        document.querySelector('.hide__panel__container').classList.remove('hide');
        workSpace.calculateScale();
      }
    }
  }

  changeElemets (icon) {
    workSpace.deactivateCanvas();
    const controlsElements = new ControlsElements(icon);
    controlsElements.createControlElementsPanel();
  }

  changeUpload (icon) {
    workSpace.deactivateCanvas();
    const controlsElements = new ControlsElements(icon);
    controlsElements.createUploadPanel();
  }

  changeText (icon) {
    workSpace.deactivateCanvas();
    const controlsElements = new ControlsElements(icon);
    controlsElements.createTextPanel();
    controlsElements.createControlElementsPanel();
  }

  changeDrawing (icon) {
    workSpace.activateCanvas();
    const controlsElements = new ControlsElements(icon);
    controlsElements.createDrawingPanel();
  }

  changeBackground (icon) {
    workSpace.deactivateCanvas();
    const controlsElements = new ControlsElements(icon);
    controlsElements.createBackgroundPanel();
    controlsElements.createControlElementsPanel();
  }
}

const controls = new ControlsIcons();

export default controls;
