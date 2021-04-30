import DOM from './DOMLinks';
import elements from '../data/elements';
import WorkSpace from './WorkSpace';

const templateElements = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Background', 'Music'];
const templateElementsNumber = [12, 10, 13, 18, 10, 20, 20, 20, 10, 10, 10];
const templatesDone = 4;
const workSpace = new WorkSpace('resume');
let countFiles = 0;
let fileStyle;
let fileLinks = [];

class ControlsElements {

  constructor (template) {
    this.template = template;
  }

  createControlElementsPanel () {
    const dom = DOM.getHTMLElements();
    const number = templateElements.indexOf(this.template);

    dom.controlsElementsList.innerHTML = '';

    if (dom.controlsElementsUploadDiv) {
      dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
    }
    if (dom.controlsElementsTextDiv && this.template !== 'Text') {
      dom.controlsElements.removeChild(dom.controlsElementsTextDiv);
    }
    if (dom.controlsElementsPanelDiv) {
      dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
    }
    if (dom.controlsElementsBackgroundDiv && this.template !== 'Background') {
      dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);
    }

    dom.workSpaceHeaderLeft.innerHTML = '';

    if (this.template.endsWith('s')) {
      fileStyle = this.template.substring(0, this.template.length - 1).toLowerCase();
    } else fileStyle = this.template.toLowerCase();

    for (let i = 1; i <= templateElementsNumber[number]; i += 1) {
      const listItem = document.createElement('li');

      if (this.template === 'Templates') {
        if (i > templatesDone) {
          listItem.dataset.bsToggle = 'modal';
          listItem.dataset.bsTarget = '#developingModal';
        }
        listItem.innerHTML = `<img src='../images/${this.template}/${fileStyle}${i}.jpg' class='element-${fileStyle}' data-index='${i}' data-identificator='${fileStyle}${i}' id='element-${fileStyle}${i}' alt="templates">`;
      } else if (this.template === 'Elements') {
        if (i === 16) break;
        listItem.innerHTML = `<img src='data:image/svg+xml,${elements[1][i].src}' class='element-${fileStyle}' id='element-${fileStyle}${i}' alt="svg element">`;
      } else if (this.template === 'Text') {
        listItem.innerHTML = `<img src='../images/${this.template}/${fileStyle}${i}.png' class='element-${fileStyle}' id='element-${fileStyle}${i}' alt="svg element">`;
      } else {
        listItem.innerHTML = `<img src='../images/${this.template}/${fileStyle}${i}.jpg' class='element-${fileStyle}' id='element-${fileStyle}${i}' alt="svg element">`;
      }

      dom.controlsElementsList.append(listItem);
    }

    const hideControlPanelButton = document.querySelector('.hide__panel__container');
    const controls = document.querySelector('.controls');
    const listItems = document.querySelectorAll('.list__icon');
    hideControlPanelButton.addEventListener('click', () => {
      dom.controlsElements.classList.add('hide');
      hideControlPanelButton.classList.add('hide');
      controls.classList.remove('show__controls');
      listItems.forEach(listItem => listItem.classList.remove('active_icon', 'after__active', 'before__active'));
    });
  }

  createUploadPanel () {
    const dom = DOM.getHTMLElements();

    dom.controlsElementsList.innerHTML = '';
    if (dom.controlsElementsTextDiv && this.template !== 'Text')
      dom.controlsElements.removeChild(dom.controlsElementsTextDiv);
    if (dom.controlsElementsPanelDiv)
      dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
    if (dom.controlsElementsBackgroundDiv)
      dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

    dom.workSpaceHeaderLeft.innerHTML = '';

    if (!document.querySelector('.controls__elements-upload-div')) {
      const divUpload = document.createElement('div');
      divUpload.setAttribute('class', 'controls__elements-upload-div');
      divUpload.innerHTML = `
        <input type='file' id='input-upload' multiple accept='image/*' name='file' >
        <label for='input-upload'>Upload your media</label>
        `;
      dom.controlsElements.prepend(divUpload);

      document.getElementById('input-upload').addEventListener('change', (event) => this.handleFiles(event));
    }
  }

  handleFiles (event) {
    const dom = DOM.getHTMLElements();
    let files = event.target.files;

    if (!files.length) {
      dom.controlsElementsList.innerHTML = '<p>No files selected!</p>';
    } else {

      for (let i = 0; i < files.length; i++) {
        let uploadImage = document.createElement('img');
        const src = window.URL.createObjectURL(files[i]);
        uploadImage.src = src;
        fileLinks.push(src);
        if (!fileLinks.includes(src)) fileLinks.push(src);
        uploadImage.onload = function () {
        };

        uploadImage.classList.add('upload-image');
        uploadImage.setAttribute('id', 'upload-image' + countFiles);
        dom.controlsElementsList.append(uploadImage);
        countFiles += 1;
      }

      localStorage.setItem('filesLinks', JSON.stringify(fileLinks));
    }
  }

  createTextPanel () {
    const dom = DOM.getHTMLElements();

    dom.controlsElementsList.innerHTML = '';
    if (dom.controlsElementsUploadDiv)
      dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);

    if (dom.controlsElementsBackgroundDiv)
      dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

    dom.workSpaceHeaderLeft.innerHTML = '';

    if (!document.querySelector('.controls__elements-text-div')) {

      const divText = document.createElement('div');
      divText.setAttribute('class', 'controls__elements-text-div');

      divText.innerHTML = `
            <div class='controls__elements-text-div__inner' id='heading'>Add a heading</div>
            <div class='controls__elements-text-div__inner' id='subheading'>Add a subheading</div>
            <div class='controls__elements-text-div__inner' id='body-text'>Add a little bit of body text</div>
            `;
      dom.controlsElements.prepend(divText);
      document.querySelector('.controls__elements-text-div').addEventListener('click', (event) => {
        if (event.target.classList.contains('controls__elements-text-div__inner')) {
          workSpace.showTemplateOnScreen(event.target);
        }
      });
    }
  }

  createDrawingPanel () {
    const dom = DOM.getHTMLElements();

    dom.controlsElementsList.innerHTML = '';
    if (dom.controlsElementsUploadDiv)
      dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
    if (dom.controlsElementsTextDiv && this.template !== 'Text')
      dom.controlsElements.removeChild(dom.controlsElementsTextDiv);
    if (dom.controlsElementsBackgroundDiv)
      dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

    dom.workSpaceHeaderLeft.innerHTML = '';

    const panel = document.createElement('div');
    panel.setAttribute('class', 'controls__elements-panel-div');
    dom.controlsElements.prepend(panel);

    const panelButton = document.createElement('div');
    panelButton.classList.add('controls__elements-panel-div_button');
    panelButton.innerHTML = 'Clear drawings';
    panelButton.addEventListener('click', workSpace.clearAllDrawing);
    panel.prepend(panelButton);

    for (let r = 0, max = 5; r <= max; r += 1) {
      for (let g = 0; g <= max; g += 1) {
        for (let b = 0; b <= max; b += 1) {
          const paletteBlock = document.createElement('div');
          paletteBlock.className = 'button-draw';
          paletteBlock.addEventListener('click', workSpace.draw);

          paletteBlock.style.backgroundColor = (
            'rgb(' + Math.round(r * 255 / max) + ', '
            + Math.round(g * 255 / max) + ', '
            + Math.round(b * 255 / max) + ')'
          );

          panel.appendChild(paletteBlock);
        }
      }
    }
    dom.controlsElements.prepend(panel);
  }

  createBackgroundPanel () {
    const dom = DOM.getHTMLElements();

    dom.controlsElementsList.innerHTML = '';
    if (dom.controlsElementsUploadDiv)
      dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
    dom.workSpaceHeaderLeft.innerHTML = '';

    if (!document.querySelector('.controls__elements-background-div')) {

      const divBackground = document.createElement('div');
      divBackground.classList.add('controls__elements-background-div');

      divBackground.innerHTML = `
            <input type='color' id='background-color' name='background-color' value='#563d7c' title='Choose your color'>
            <label for='background-color' class='form-label'>Background</label>
            `;
      dom.controlsElements.prepend(divBackground);
      divBackground.addEventListener('input', (event) => {
        dom.sheetContainer.style.backgroundColor = event.target.value;
        dom.sheetContainer.style.backgroundImage = 'none';
      });
    }
  }
}

export default ControlsElements;
