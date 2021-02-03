import DOM from './DOMLinks';
import editor from './Editor';
import {template1, template2} from '../templates';
import {moveableItems} from '../index';

let inner = template1;

let canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');
let context = canvas.getContext('2d');

class WorkSpaceHeader {

    createWorkSpaceHeaderRight(){
        const dom = DOM.getHTMLElements(); 
        dom.workSpaceHeaderRight.innerHTML = `
        <span class='material-icons' id='rubbish-bin'>delete_outline</span>
        `; 
        document.getElementById('rubbish-bin').addEventListener('click', function() {
            dom.sheetContainer.innerHTML = '';
            dom.sheetContainer.style.backgroundColor = 'white';
            dom.sheetContainer.style.backgroundImage = 'none';
        });      
    }

    createWorkSpaceHeaderLeft(){
        const dom = DOM.getHTMLElements();
        dom.workSpaceHeaderLeft.innerHTML = `
        <input type='color' id='head' name='head' value='#e66465'>
        <label for='head'>Color</label>
        `;
        document.querySelector('#head').addEventListener("input", (e) => {
        moveableItems[0].target.forEach( el => {
                el.querySelector('path').style.fill = `${e.target.value}`
            })
        })
    }





}

const workSpaceHeader = new WorkSpaceHeader;

export default workSpaceHeader;
