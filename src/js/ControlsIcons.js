import DOM from './DOMLinks';
import ControlsElements from './ControlsElements';
import WorkSpace from './WorkSpace';

const templateIcons = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Background', 'Music', 'Videos',  'Folders', 'More'];
const templateImages = ['table_chart', 'cloud_upload', 'photo_size_select_actual', 'art_track', 'text_fields', 'brush', 'texture', 'audiotrack', 'ondemand_video', 'folder_special', 'more_horiz'];
const highLightColor = '#FDD41B';
const color = '#FAE172';

const workSpace = new WorkSpace('resume');

class ControlsIcons {

      
    createControlPanel() {
        const dom = DOM.getHTMLElements();


        templateIcons.map((item, index) => {
            
            const listItem = document.createElement('li');
            listItem.setAttribute('id', `controls__icons-${item}`);
            const templateImage = templateImages[index];
            listItem.innerHTML = `
                <span class='material-icons' id='${item}'>${templateImage}</span>${item}`;
          //  listItem.innerHTML = `<a class='icon-button' id='${item}'>
          //      <span class="material-icons">${templateImage}</span>${item}</a>`;
            dom.controlsIconsList.append(listItem);  
            dom.controlsIconsList.addEventListener('click', (event) => {
              //  console.log(item);
                if (event.target.getAttribute('id') == `${item}` || event.target.getAttribute('id') == `controls__icons-${item}` ) { // || event.target.parentNode.parentNode.getAttribute('class') == 'controls__icons-list') {
                    console.log(event.target);
                    this.switchToIcon(`${item}`);
                } else console.log('not');
            });      
        })
      
    }

    switchToIcon(icon) {
        switch(icon) {
            case `${templateIcons[0]}`:
                console.log('0');
                this.changeIcons(0);
                this.changeElemets(`${templateIcons[0]}`);
                break;
            case `${templateIcons[1]}`:
                console.log('1');
                this.changeIcons(1);
                this.changeUpload(`${templateIcons[1]}`);
                break;
            case `${templateIcons[2]}`:
                console.log('2');
                this.changeIcons(2);
                this.changeElemets(`${templateIcons[2]}`);
                break;
            case `${templateIcons[3]}`:
                console.log('3');
                this.changeIcons(3);
                this.changeElemets(`${templateIcons[3]}`);
                break;
            case `${templateIcons[4]}`:
                console.log('4');
                this.changeIcons(4);
                this.changeText(`${templateIcons[4]}`);
                break;
            case `${templateIcons[5]}`:
                console.log('5');
                this.changeIcons(5);
                this.changeDrawing(`${templateIcons[5]}`);
                break;  
            case `${templateIcons[6]}`:
                console.log('6');
                this.changeIcons(6);
                this.changeBackground(`${templateIcons[6]}`);
                break;
            case `${templateIcons[7]}`:
                console.log('7');
                this.changeIcons(7);
                break;
            case `${templateIcons[8]}`:
                console.log('8');
                this.changeIcons(8);
                break; 
            case `${templateIcons[9]}`:
                console.log('9');
                this.changeIcons(9);
                break;
            case `${templateIcons[10]}`:
                console.log('10');
                this.changeIcons(10);
                break;
            case `${templateIcons[11]}`:
                console.log('11');
                this.changeIcons(11);
                break;         
        }

    }

    changeIcons(index) {
        document.getElementById(`controls__icons-${templateIcons[index]}`).style.background = highLightColor;
        if (index === 0) {
            for (let i = 1; i < index ; i += 1) {
                document.getElementById(`controls__icons-${templateIcons[i]}`).style.background = color;
            }
        } else {
        for (let i = 0; i < index ; i += 1) {
            document.getElementById(`controls__icons-${templateIcons[i]}`).style.background = color;
        }
        }
        for (let i = index + 1; i < templateIcons.length; i += 1) {
            document.getElementById(`controls__icons-${templateIcons[i]}`).style.background = color;
        }        
    }

    changeElemets(icon) {
        console.log(icon);
        workSpace.deactivateCanvas();
        const controlsElements = new ControlsElements(icon);
        controlsElements.createControlElementsPanel();
    }

    changeUpload(icon) {
        workSpace.deactivateCanvas();
        const controlsElements = new ControlsElements(icon);
        controlsElements.createUploadPanel();
    }

    changeText(icon) {
        console.log(icon);
        workSpace.deactivateCanvas();
        const controlsElements = new ControlsElements(icon);
        controlsElements.createTextPanel();
        controlsElements.createControlElementsPanel(); 
    }

    changeDrawing(icon) {
        workSpace.activateCanvas();
        const controlsElements = new ControlsElements(icon);
        controlsElements.createDrawingPanel();
    }

    changeBackground(icon) {
        workSpace.deactivateCanvas();
        const controlsElements = new ControlsElements(icon);
        controlsElements.createBackgroundPanel();
        controlsElements.createControlElementsPanel(); 
    }
}

const controls = new ControlsIcons();

export default controls;
