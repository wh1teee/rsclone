import DOM from './DOMLinks';
import elements from '../data/elements';
import WorkSpace from './WorkSpace';

const templateElements = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Background', 'Music', 'Videos', 'Folders', 'More'];
const templateElementsNumber = [12, 10, 13, 18, 10, 20, 20, 20, 10, 10, 10];

const workSpace = new WorkSpace('resume');
let countFiles = 0;
let fileStyle;

let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');


class ControlsElements {

    constructor(template){
        this.template = template;
    }

    createControlElementsPanel() {
        const dom = DOM.getHTMLElements();
        const number = templateElements.indexOf(this.template);
        dom.controlsElementsList.innerHTML = '';
        if (dom.controlsElementsUploadDiv)
        dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
        if (dom.controlsElementsTextDiv && this.template !== 'Text')
        dom.controlsElements.removeChild(dom.controlsElementsTextDiv);
        if (dom.controlsElementsPanelDiv)
        dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
        if (dom.controlsElementsBackgroundDiv && this.template !== 'Background')
        dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

        dom.workSpaceHeaderLeft.innerHTML = '';

        if (this.template.endsWith('s')) {
            fileStyle = this.template.substring(0, this.template.length - 1).toLowerCase();
            console.log(fileStyle);
        } else fileStyle = this.template.toLowerCase();


        for (let i = 1; i <= templateElementsNumber[number]; i += 1) {
            const listItem = document.createElement('li');
           
            if (this.template === 'Elements') {
                listItem.innerHTML = `<img src='data:image/svg+xml,${elements[1][i - 1].src}' class='element-${fileStyle}' id='element-${fileStyle}${i}'>`;                       
            } else if (this.template === 'Text') {
                listItem.innerHTML = `<img src='../images/${this.template}/${fileStyle}${i}.png' class='element-${fileStyle}' id='element-${fileStyle}${i}'>`;                       
            } else {
                listItem.innerHTML = `<img src='../images/${this.template}/${fileStyle}${i}.jpg' class='element-${fileStyle}' id='element-${fileStyle}${i}'>`;
            }
                        
            dom.controlsElementsList.append(listItem);       
        } 
    }

    createUploadPanel() {
        const dom = DOM.getHTMLElements();

        dom.controlsElementsList.innerHTML = '';
        if (dom.controlsElementsTextDiv && this.template !== 'Text')
        dom.controlsElements.removeChild(dom.controlsElementsTextDiv);
        if (dom.controlsElementsPanelDiv)
        dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
        if (dom.controlsElementsBackgroundDiv)
        dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

        dom.workSpaceHeaderLeft.innerHTML = '';

        if (! document.querySelector('.controls__elements-upload-div')) {
        const divUpload = document.createElement('div');
        divUpload.setAttribute('class', 'controls__elements-upload-div');
      /*  divUpload.innerHTML = `
        <input type='file' id='input-upload' name='file' multiple onchange="this.handleFiles(this.files)">
        <button type='button' id='upload-button'>Upload your media</button>
        `;*/
        divUpload.innerHTML = `
        <input type='file' id='input-upload' multiple accept='image/*' name='file' >
        <label for='input-upload'>Upload your media</label>
        `;
        //document.getElementById('input-upload').onchange = this.handleFiles();
        dom.controlsElements.prepend(divUpload);
/*
        document.getElementById('upload-button').addEventListener('click', function (event) {
            event.preventDefault();
            if (document.getElementById('upload-button')) {
                document.getElementById('upload-button').click();
                console.log('01');
            }
        }, false);*/

        document.getElementById('input-upload').addEventListener('change', (event) => this.handleFiles(event)); 
/*
      
        document.getElementById('upload-button').addEventListener('click', function (event) {
            if (document.getElementById('upload-button')) {
                document.getElementById('upload-button').click();
                console.log('01');
            }
            event.preventDefault();
        }, false);

        document.getElementById('input-upload').addEventListener('change', function handleFiles(files) {                        
           // const files = this.files;
            console.log('02');
            dom.controlsElementsList.innerHTML = '';
            for (let i = 0; i < files.length; i += 1) {
                let file = files[i];

                if (file.type.startsWith('image/')){ 
                    let uploadImage = document.createElement('img');
                    uploadImage.classList.add('upload-image');
                    uploadImage.setAttribute('id', 'upload-image'+ countFiles);
                    uploadImage.file = file;

                    let reader = new FileReader();
                    reader.onload = (function(aImg) {  return function(e) { aImg.src = e.target.result; }; })(uploadImage);
                    reader.readAsDataURL(file);

                    const listItem = document.createElement('li');  
                    listItem.innerHTML = uploadImage;
                    listItem.append(uploadImage);     
                    dom.controlsElementsList.append(listItem);         
                    
                }
                countFiles += 1;
            }

        });*/
        console.log('01111');
    }
    }

    handleFiles(event) {   
        const dom = DOM.getHTMLElements();                     
        // const files = this.files;
        let files = event.target.files;
         console.log('02');
       //  dom.controlsElementsList.innerHTML = '';

         if (!files.length) {
            dom.controlsElementsList.innerHTML = "<p>No files selected!</p>";
          } else {

         for (let i = 0; i < files.length; i++) {

       //  let file = document.querySelector('input[type=file]').files[0];
        
        //     if (file.type.startsWith('image/')){ 
                 let uploadImage = document.createElement('img');
                 uploadImage.src = window.URL.createObjectURL(files[i]);
              //   uploadImage.style.maxHeight = '100px';
                 uploadImage.onload = function() {
                 //   window.URL.revokeObjectURL(this.src);
                 }
                              
/*
                 let reader = new FileReader();
                // reader.onloadend = function() {  
                //     uploadImage.src = reader.result; 
                 //   };
                    reader.onloadend = (function(aImg) { 
                        return function(e) { 
                            console.log('03');
                            console.log(e.target.result);
                            
                            aImg.src = reader.result; 
                        };
                       })(uploadImage);
                 if (file)
                        reader.readAsDataURL(file);
                    else
                        uploadImage.src = "";
*/
                uploadImage.classList.add('upload-image');
                uploadImage.setAttribute('id', 'upload-image'+ countFiles);
                dom.controlsElementsList.append(uploadImage);         
                countFiles += 1;

       //  }
                   
        }
    }
    }

    createTextPanel(){
        const dom = DOM.getHTMLElements();

        dom.controlsElementsList.innerHTML = '';
        if (dom.controlsElementsUploadDiv)
        dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
      /*  if (dom.controlsElementsPanelDiv)
        dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
*/
        if (dom.controlsElementsBackgroundDiv)
        dom.controlsElements.removeChild(dom.controlsElementsBackgroundDiv);

        dom.workSpaceHeaderLeft.innerHTML = '';

        if (! document.querySelector('.controls__elements-text-div')) {
            
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
                console.log('888888');
                console.log(event.target);
                workSpace.showTemplateOnScreen(event.target); 
                }
            });
        }    
    }

    createDrawingPanel(){
        console.log('44');
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
        panelButton.setAttribute('class', 'controls__elements-panel-div_button');       
        panelButton.innerHTML = 'Clear drawings';
        panelButton.addEventListener('click', (() => workSpace.clearAllDrawing()));
        panel.prepend(panelButton);



        for (let r = 0, max = 5; r <= max; r += 1) {
            for (var g = 0; g <= max; g += 1) {
              for (var b = 0; b <= max; b += 1) {
                let paletteBlock = document.createElement('div');
                paletteBlock.className = 'button-draw';
                paletteBlock.addEventListener('click', ((event) => workSpace.draw(event)));
     
                paletteBlock.style.backgroundColor = (
                  'rgb(' + Math.round(r * 255 / max) + ", "
                  + Math.round(g * 255 / max) + ", "
                  + Math.round(b * 255 / max) + ")"
                );
     
                panel.appendChild(paletteBlock);
              }
            }
        }        
        dom.controlsElements.prepend(panel);    
    }

    createBackgroundPanel() {
        const dom = DOM.getHTMLElements();

        dom.controlsElementsList.innerHTML = '';
        if (dom.controlsElementsUploadDiv)
        dom.controlsElements.removeChild(dom.controlsElementsUploadDiv);
      /*  if (dom.controlsElementsPanelDiv)
        dom.controlsElements.removeChild(dom.controlsElementsPanelDiv);
*/
        dom.workSpaceHeaderLeft.innerHTML = '';

        if (! document.querySelector('.controls__elements-background-div')) {
            
            const divBackground = document.createElement('div');
            divBackground.setAttribute('class', 'controls__elements-background-div');
            
            divBackground.innerHTML = `
            <input type='color' id='background-color' name='background-color' value='#e66465'>
            <label for='background-color'>Background</label>
            `;
            dom.controlsElements.prepend(divBackground);    
            document.querySelector('.controls__elements-background-div').addEventListener('input', (event) => {
              //  if (event.target.classList.contains('controls__elements-text-div__inner')) {
              //  console.log('888888');
              //  console.log(event.target);
                dom.sheetContainer.style.backgroundColor = event.target.value;
                dom.sheetContainer.style.backgroundImage = 'none';
                // workSpace.showTemplateOnScreen(event.target); 
            // }
            });
        }    
    }
}



/*const controlsElements = new ControlsElements();*/

export default ControlsElements;
