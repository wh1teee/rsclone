import DOM from './DOMLinks';
import {template1, template2} from '../templates';
import {moveableItems} from '../index';

let canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');

class WorkSpaceHeader {
    createWorkSpaceHeaderRight(){
        const dom = DOM.getHTMLElements();
        dom.workSpaceHeaderRight.innerHTML = `
        <span class='material-icons' id='delete__element'>delete_outline</span>
        <span class='material-icons' id='delete__all'>delete</span>
        <span class="material-icons" id="volume">volume_off</span>
        `;
        document.getElementById('delete__all').addEventListener('click', function() {
            const dom = DOM.getHTMLElements();
            dom.sheetContainer.innerHTML = '';
            dom.sheetContainer.style.backgroundColor = 'white';
            dom.sheetContainer.style.backgroundImage = 'none';
            moveableItems[0].updateRect()
        });
        document.getElementById('delete__element').addEventListener('click', () => {
            if (!moveableItems[0].target) return; // if there are no selected objects
            moveableItems[0].target.forEach( el => {
                el.remove()
            })
            moveableItems[0].updateRect()
            dom.workSpaceHeaderLeft.innerHTML = ''
        })
        document.addEventListener('keydown', (e) => {
            if (e.code === "Delete") {
                if (!moveableItems[0].target) return; // if there are no selected objects
                moveableItems[0].target.forEach( el => {
                    el.remove()
                })
                moveableItems[0].updateRect()
                dom.workSpaceHeaderLeft.innerHTML = ''
            }
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
    }
}

const workSpaceHeader = new WorkSpaceHeader;

export default workSpaceHeader;
