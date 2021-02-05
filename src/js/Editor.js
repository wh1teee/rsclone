import DOM from './DOMLinks';
import ActionContainer from './ActionContainer';
import '../styles/editor.scss';

let actionContainer;
let selectedElement;
let dragObj;
let count=0;
const dom = DOM.getHTMLElements();

class Editor {

    clear() {
            const dom = DOM.getHTMLElements();
            if (actionContainer != undefined) {               //если есть акт. конт. в поле
                actionContainer.savePicture();                          //сохраняем картину и удаляем ак.конт.
                actionContainer = undefined;                                   //удаляем ссылку на объект
            }
            return;
    }

    mDouwn(event){                     //клик по рабочему полю
        const dom = DOM.getHTMLElements();
        if (event.which != 1) return;           //если клик правой то выходим

        if (event.target.className !== 'logo' ) {            //если попали по картинке
            if (event.target.parentNode.className != 'resize-container') {    //если картинка без контейнера
                if (actionContainer != undefined) {                                //если есть акт. конт. в поле
                    actionContainer.savePicture(dom.sheetContainer);                          //сохраняем картину и удаляем ак.конт.
                    actionContainer = undefined;                                   //удаляем ссылку на объект
                }

                if (event.target.tagName === 'line') {
                    actionContainer = new ActionContainer(event.target.parentNode, dom.sheetContainer);            //создаем новый объект - активный контейнер
                    } else {
                        actionContainer = new ActionContainer(event.target, dom.sheetContainer);            //создаем новый объект - активный контейнер
                }
            }

            actionContainer.cont.ondragstart = function() {                         //отключаем стандартный драг
                return false;
            };

            actionContainer.ready = true;
            actionContainer.move_type = 'move';
            actionContainer.downX = event.pageX;
            actionContainer.downY = event.pageY;

            let coords = actionContainer.getElementPos(actionContainer.cont);
            actionContainer.shiftX = actionContainer.downX - coords.left;                  //считает дельту мыши от начала объекта
            actionContainer.shiftY = actionContainer.downY - coords.top;

            if (event.target.className == 'text' ) {
                event.target.contentEditable == 'true';
            }
            return
        }

        if (event.target.className = 'workspace__field') {    //если это чистое поле
            if (actionContainer != undefined) {               //если есть акт. конт. в поле
                actionContainer.savePicture(dom.sheetContainer);                          //сохраняем картину и удаляем ак.конт.
                actionContainer = undefined;                                   //удаляем ссылку на объект
            }
            return;
        }

        if (event.target.className == 'resize-container-btn') { // если управляющий элемент
            actionContainer.cont.ondragstart = function() {          //отключаем стандартный драг
                return false;
            };

            actionContainer.ready = true;
            actionContainer.move_type = 'rotate';
            actionContainer.downX = event.pageX;
            actionContainer.downY = event.pageY;

            return;
        }
    }

    mMove(event){
        if ( !actionContainer || !actionContainer.ready) return;  // элемент не зажат

        if (actionContainer.move_type == 'move' ) {
            actionContainer.move(event.pageX, event.pageY, event.target.parentNode);
        }

        if (actionContainer.move_type == 'rotate' ) {
            actionContainer.rotate(event.pageX, event.pageY);
        }
    }

    mUp(event){
        const dom = DOM.getHTMLElements();
        if (actionContainer) {
            actionContainer.ready = false;
        }
        dom.sheetContainer.onmousemove = null;
        dom.sheetContainer.onmousedown = null;
    }

    mLeave(event) {                           //если мышка покинула рабочее поле - отпускаем картинку
        const dom = DOM.getHTMLElements();
        if (actionContainer) {
            actionContainer.ready = false;
        }
        dom.sheetContainer.onmousemove = null;
        dom.sheetContainer.onmousedown = null;
    }
}

const editor = new Editor();

export default editor;
