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
        <span class='material-icons' id='delete__element'>delete_outline</span>
        <span class='material-icons' id='delete__all'>delete</span>
        <span class="material-icons" id="volume">volume_off</span>
        `;
        document.getElementById('delete__all').addEventListener('click', function() {
            dom.sheetContainer.innerHTML = '';
            dom.sheetContainer.style.backgroundColor = 'white';
            dom.sheetContainer.style.backgroundImage = 'none';
        });
        document.getElementById('delete__element').addEventListener('click', () => {

            moveableItems[0].target.forEach( el => {
                el.remove()
            })
            moveableItems[0].updateRect()
            dom.workSpaceHeaderLeft.innerHTML = ''
        })
        document.getElementById('volume').addEventListener('click', (e) => {
            if (e.target.textContent === 'volume_off') {
                e.target.textContent = 'volume_up'
                document.addEventListener('click', clickSound)
                document.addEventListener('keydown', clickSound)
            } else {
                e.target.textContent = 'volume_off'
                document.removeEventListener('click', clickSound)
                document.removeEventListener('keydown', clickSound)
            }
        })

        function clickSound() {
            document.querySelector('audio').play()
        }
    }

    createWorkSpaceHeaderLeft(){
        const dom = DOM.getHTMLElements();
        dom.workSpaceHeaderLeft.innerHTML = `
        <input type='color' id='head' name='head' value='#e66465'>
        <label for='head'>Color</label>
        `;
        document.querySelector('#head').addEventListener("input", (e) => {
            if (!moveableItems[0].target) return;
        moveableItems[0].target.forEach( el => {
                el.querySelector('path').style.fill = `${e.target.value}`
            })
        })
    }





}

const workSpaceHeader = new WorkSpaceHeader;

export default workSpaceHeader;
