import DOM from './DOMLinks';
import workSpaceHeader from './WorkSpaceHeader';
import templates from '../templates';
import '../styles/editor.scss';

let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
const availableResumeTemplates = 4

canvas.setAttribute('class', 'canvas');

class WorkSpace {

  constructor (type) {
    this.type = type;
  }

  // style - ex: templates1
  createWorkSpace () {
    document.querySelector('.workspace__field').innerHTML = `
            <div class='sheet ${this.type}'>
                <div class='sheet__container'>                    
                </div>    
            </div>
        `;
    }

  calculateScale (event) {
    document.querySelector('.sheet').style.width = (event === window ? event.innerWidth : event.target.innerWidth) * 0.48 / 10 + 'rem';
    document.querySelector('.sheet').style.height = document.querySelector('.sheet').clientWidth * 29.7 / 21 / 10 + 'rem';

    // const newSize = event.target.innerWidth * 0.56 / 10;
    // document.querySelector('.sheet').style.width = newScale + 'rem';
    // document.querySelector('.sheet').style.height = newScale + 'rem';
    const newScale = document.querySelector('.sheet').clientWidth / document.querySelector('.sheet__container').clientWidth;
    document.querySelector('.sheet__container').style.transform = `translateX(-50%) translateY(-50%) scale(${newScale})`;
    }

    showTemplateOnScreen(element){
        const dom = DOM.getHTMLElements();

        canvas.setAttribute('style', 'pointer-events: none;  position:relative;');

        if (element.classList.contains('element-template')) {
            const innerCount = element.dataset.index
          if (innerCount <= availableResumeTemplates) {
            dom.sheetContainer.innerHTML = `${(templates[innerCount - 1])}`;
          }

        } else if (element.classList.contains('element-element') || this.checkClassOfChildren(element, 'element-element')) {
          let svgInner;
                if (element.src) {
                  svgInner = element.src.match(/<svg([^']*)svg>/gm).toString();
                 } else {
                  svgInner = element.childNodes[0].src.match(/<svg([^']*)svg>/gm).toString();
                }
                dom.sheetContainer.insertAdjacentHTML('beforeend', `<div class='svg-element moveable'>${svgInner}</div>`);
                workSpaceHeader.createWorkSpaceHeaderLeft();
            } else if (element.parentNode.classList.contains('controls__elements-text-div') || element.classList.contains('controls__elements-text-div')) {
                dom.sheetContainer.insertAdjacentHTML('beforeend', `<div class='text-inner moveable ${element.id}'>${element.textContent}</div>`);
            } else if (element.classList.contains('element-background')) {
                let innerID = element.getAttribute('id').match(/([^\-]+$)/gm).toString();
                dom.sheetContainer.style.backgroundImage = `url('../images/Background/${innerID}.jpg')`;
                dom.sheetContainer.style.backgroundSize = 'cover';
            } else {
                const imageUpload = document.createElement('img');
                imageUpload.classList.add('uploaded-image');
                imageUpload.classList.add('moveable');
                imageUpload.src = element.src;
                dom.sheetContainer.append(imageUpload);
            }

    dom.workSpaceField.addEventListener('dblclick', (e) => { // set contenteditable attribute to target
      if (e.target.classList.contains('moveable') && e.target.className.includes('text')) { //if target can be moveable
        if (e.target.contentEditable !== 'true') {
          e.target.contentEditable = 'true';
          e.target.focus();
        } else {
          e.target.focus();
        }
      }
    });
    }

    checkClassOfChildren(element, classOfChildren) {
      let consist = false
      if (element.childNodes){
        element.childNodes.forEach( el => {
          if (!el.classList) {
            return
          }
          if (el.classList.contains(classOfChildren))  {
            consist = true
          }
        })
      }
      return consist
    }

    activateCanvas() {
        const dom = DOM.getHTMLElements();
        canvas.setAttribute('style', 'position: absolute; top: 0; left: 0;');
        dom.sheetContainer.appendChild(canvas);

        if (dom.main.offsetWidth > '600' ) {
            canvas.width=793;
            canvas.height=1122.5;
            } else {
            canvas.width=600;
            canvas.height=800;
        }
    }

    deactivateCanvas() {
        canvas.setAttribute('style', 'pointer-events: none;  position:relative;');
    }

    draw(event){
        context.lineCap = 'round';                                           // переменные для рисования
        context.lineWidth = 6;
        context.strokeStyle = event.target.style.backgroundColor;
        context.globalCompositeOperation = 'source-over';

        canvas.onmousemove = function drawIfPressed(event) {                                  // На любое движение мыши по canvas будет выполнятся эта функция
            const x = event.offsetX;                                                                                    // в "e"  попадает экземпляр MouseEvent
            const y = event.offsetY;
            const dx = event.movementX;
            const dy = event.movementY;

           // console.log('x='+x+'y='+y+'dx=' + dx+'dy=' + dy);

            if (event.buttons > 0) {                                                                                     // Проверяем зажата ли какая-нибудь кнопка мыши (если да - то рисуем)
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x - dx, y - dy);
                context.stroke();
                context.closePath();
            }
       };
    }

    clearAllDrawing() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default WorkSpace;
