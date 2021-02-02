import DOM from './DOMLinks';
import editor from './Editor';
import {template1, template2} from '../templates';
import { startMovable } from './moveable';

/* import templates from './templates';*/

class WorkSpace {

    constructor(type){
        this.type = type;
       
    }

    // style - ex: templates1
    createWorkSpace(){
        const dom = DOM.getHTMLElements(); 
        document.querySelector('.workspace__field').innerHTML = `
            <div class='sheet ${this.type}'>
                <div class='sheet__container'>
                    
                </div>    
            </div>
        `;

       
    }

    calculateScale(event){
        console.log(event.target.innerWidth);
        console.log(event.target.innerWidth * 0.35);
        console.log(document.querySelector('.sheet__container').clientWidth);
        console.log(document.querySelector('.sheet').clientWidth);
        document.querySelector('.sheet').style.width = event.target.innerWidth * 0.48 / 10 + 'rem';
        console.log(document.querySelector('.sheet').clientWidth);
        document.querySelector('.sheet').style.height = document.querySelector('.sheet').clientWidth * 29.7 / 21 / 10 + 'rem';
      /*  const newScale = event.target.innerWidth * 0.7 * 0.66;
        document.querySelector('.sheet__container').style.transform = `translateX(-50%) translateY(-50%) scale(${newScale})`;
        document.querySelector('.sheet').style.width = document.querySelector('.sheet__container').clientWidth * 0.6 / 10 + 'rem';
        document.querySelector('.sheet').style.height = document.querySelector('.sheet__container').clientHeight * 0.6 / 10 + 'rem';
*/
        const newSize = event.target.innerWidth * 0.56 / 10;
        document.querySelector('.sheet').style.width = newScale + 'rem';
        document.querySelector('.sheet').style.height = newScale + 'rem';
        const newScale = document.querySelector('.sheet').clientWidth / document.querySelector('.sheet__container').clientWidth;
        document.querySelector('.sheet__container').style.transform = `translateX(-50%) translateY(-50%) scale(${newScale})`;
            
    }

    
    showTemplateOnScreen(){
        const dom = DOM.getHTMLElements(); 
        dom.sheetContainer.innerHTML = `${template1}`;
       // dom.sheetContainer.addEventListener('click', (event) => editor.createContainer(event));

        dom.sheetContainer.addEventListener('mousedown',(event) => editor.mDouwn(event), false);
        dom.sheetContainer.addEventListener('mousemove',(event) => editor.mMove(event), false);
        dom.sheetContainer.addEventListener('mouseup',(event) => editor.mUp(event), false);
        dom.sheetContainer.addEventListener('mouseleave', (event) => editor.mLeave (event), false);
        dom.workSpaceField.addEventListener('click', editor.clear, false);
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

    startMovable(); //start moveable
  }

}

export default WorkSpace;
