import DOM from './DOMLinks';
import editor from './Editor';
import workSpaceHeader from './WorkSpaceHeader';
import {template1, template2, template3, template4} from '../templates';

let inner = template1;
let canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');
let context = canvas.getContext('2d');

class WorkSpace {

  constructor (type) {
    this.type = type;

  }

  // style - ex: templates1
  createWorkSpace () {
    const dom = DOM.getHTMLElements();
    document.querySelector('.workspace__field').innerHTML = `
            <div class='sheet ${this.type}'>
                <div class='sheet__container'>
                    
                </div>    
            </div>

        `;
    }

  calculateScale (event) {
    document.querySelector('.sheet').style.width = event.target.innerWidth * 0.48 / 10 + 'rem';
    document.querySelector('.sheet').style.height = document.querySelector('.sheet').clientWidth * 29.7 / 21 / 10 + 'rem';

        const newSize = event.target.innerWidth * 0.56 / 10;
        document.querySelector('.sheet').style.width = newScale + 'rem';
        document.querySelector('.sheet').style.height = newScale + 'rem';
        const newScale = document.querySelector('.sheet').clientWidth / document.querySelector('.sheet__container').clientWidth;
        document.querySelector('.sheet__container').style.transform = `translateX(-50%) translateY(-50%) scale(${newScale})`;
    }

    showTemplateOnScreen(element){
        const dom = DOM.getHTMLElements();

        canvas.setAttribute('style', 'pointer-events: none;  position:relative;');

        if (element.classList.contains('element-template')) {
            inner = element.getAttribute('id').match(/([^\-]+$)/gm).toString();
            switch(inner) {
                    case 'template1':
                        dom.sheetContainer.innerHTML = `${template1}`;
                        break;
                    case 'template2':
                        dom.sheetContainer.innerHTML = `${template2}`;
                        break;
                    case 'template3':
                        dom.sheetContainer.innerHTML = `${template3}`;
                        break;
                    case 'template4':
                        dom.sheetContainer.innerHTML = `${template4}`;
                        break;
                    // case 'template5':
                    //     dom.sheetContainer.innerHTML = `${template5}`;
                    //     break;
                    // case 'template6':
                    //     dom.sheetContainer.innerHTML = `${template6}`;
                    //     break;
                    // case 'template7':
                    //     dom.sheetContainer.innerHTML = `${template7}`;
                    //     break;
                    // case 'template8':
                    //     dom.sheetContainer.innerHTML = `${template8}`;
                    //     break;
                    // case 'template9':
                    //     dom.sheetContainer.innerHTML = `${template9}`;
                    //     break;
                    // case 'template10':
                    //     dom.sheetContainer.innerHTML = `${template10}`;
                    //     break;
                    // case 'template11':
                    //     dom.sheetContainer.innerHTML = `${template11}`;
                    //     break;
                    // case 'template12':
                    //     dom.sheetContainer.innerHTML = `${template12}`;
                    //     break;
            }
        } else if (element.classList.contains('element-element')) {
                let svgInner = element.src.match(/<svg([^']*)svg>/gm).toString();
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
      if (e.target.classList.contains('moveable')) { //if target can be moveable
        if (e.target.contentEditable !== 'true') {
          e.target.contentEditable = 'true';
          e.target.focus();
        } else {
          e.target.contentEditable = 'false';
        }
      }
    });
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
        const dom = DOM.getHTMLElements();

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

    clear() {
        context.globalCompositeOperation = 'destination-out'; // изменяем параметр, чтобы стиралось
        context.fillStyle = 'rgba(255, 255, 255, 1)'; // зададим белый цвет, чтобы проверить, что не закрашивается
        context.beginPath();
        context.arc(120, 80, 70, 0, Math.PI*2, FALSE);
        context.closePath();
        context.fill();
        context.globalCompositeOperation = 'source-over';
    }

    clearAllDrawing() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export default WorkSpace;
