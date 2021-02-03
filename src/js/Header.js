import createMainDOM from '../pages/main';
import html2canvas from 'html2canvas';
import Canvas2Image from 'wd-canvas2image';
import html2PDF from 'jspdf-html2canvas';
import auth from './FirebaseAuth';
import slider from './Slider';

import '../styles/constructor.scss';

import DOM from './DOMLinks';

const menuElements = ['< Main', 'File'];
const mainMenuElements = ['Home', 'Features', 'Learning'];


class Header {

    createMainHeader() {
        const dom = DOM.getHTMLElements();

        mainMenuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a class="waves-effect waves-light btn">${item}
            <span class="material-icons">keyboard_arrow_down</span></a>
            `;
            dom.menuControlsList.append(listItem); 
        });      
    }
      
    createHeader() {
        const dom = DOM.getHTMLElements();

        menuElements.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a class="waves-effect waves-light btn white teal-text text-lighten-2">${item}</a>
            `;
            dom.menuControlsList.append(listItem);        
        })

        


     /*   dom.menuControlsList.addEventListener('click', (event) => {
            console.log(event.target.textContent);
            if (event.target.textContent == '< Main') {
                console.log(event.target.textContent); //!!!
            }
        });*/
        
        dom.headerControls.innerHTML = `
            
            <li><a href="#modal-saveToCloud" class='waves-effect waves-light btn white teal-text text-lighten-2 modal-trigger' id='download-button0'>Save to cloud</a></li>
            <li><a class='waves-effect waves-light btn white teal-text text-lighten-2' id='download-button1'>Save as img</a></li>
            <li><a class='waves-effect waves-light btn white teal-text text-lighten-2' id='download-button2'>Save as pdf</a></li>
            
            <!-- SIGN UP MODAL -->
             <div id="modal-saveToCloud" class="modal">
                <div class="modal-content">
                <h4>Input image name</h4><br />
                <form id="save-form">
                    <div class="input-field">
                        <input type="text" id="save-name" required />
                        <label for="save-name">Image name</label>
                    </div>
                    <button class="white-text flow-text waves-effect waves-light btn orange lighten-2 z-depth-0">Submit</button>
                </form>
                </div>
            </div>
        `;  
               
        // document.addEventListener('DOMContentLoaded', function() {
        //     let modals = document.querySelectorAll('.modal');
        //     M.Modal.init(modals);
        // });

        document.getElementById('download-button0').addEventListener('click', function() {
            const saveModal = document.querySelector('#modal-saveToCloud');
            M.Modal.init(saveModal);

            const saveForm = document.querySelector('#save-form');
            saveForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const imgName = saveForm['save-name'].value;
                
                html2canvas(document.querySelector('.sheet__container')).then(function(canvas) {
                    // document.body.appendChild(canvas);
                    // const modal = document.querySelector('#modal-saveToCloud');
                    M.Modal.getInstance(saveModal).close();
                    saveForm.reset();
                    auth.saveImgToCloud(canvas, imgName);
            });
            });
            
        });

        document.getElementById('download-button1').addEventListener('click', function() {
            html2canvas(document.querySelector('.sheet__container')).then(function(canvas) {
                                   // document.body.appendChild(canvas);
                  console.log('001');
                  console.log(canvas);
                  Canvas2Image.saveAsJPEG(canvas);
                  

            });
        });

        document.getElementById('download-button2').addEventListener('click', function() {
            html2canvas(document.querySelector('.sheet__container')).then(function() {
                                   // document.body.appendChild(canvas);
                  console.log('001');
                  return html2PDF(document.querySelector('.sheet__container'), {
                    jsPDF: {
                        format: 'a4',
                      },
                    html2canvas: {
                        scrollX: -window.scrollX,
                        scrollY: -window.scrollY,
                    },
                    imageType: 'image/jpeg',
                    output: './pdf/generate.pdf'
                  });
            });
        });



        if (document.querySelector('.constructor'))
        document.querySelector('.constructor').addEventListener('click', (event) => {
            console.log(event.target.textContent);
            if (event.target.textContent == '< Main') {
                console.log('555');
                createMainDOM();
                this.createMainHeader();
                auth.createAuthPanelMain2(JSON.parse(localStorage.getItem('user')));
                
                auth. uiControlVision(JSON.parse(localStorage.getItem('user')));
               

                const getCurrentQuantity = () => {
                    let quantity = 1;
                    if (document.body.clientWidth >= 1280) { 
                        quantity = 7;
                        } else if (document.body.clientWidth >= 768) {
                            quantity = 5;
                        } else if (document.body.clientWidth >= 520) {
                            quantity = 3;
                            };
                    return quantity;
                }
                slider.generateCards('left', slider.getCurrentQuantity());
            }
        });
        

    }    
    
    
        
   
    
    saveToLocalStorage(img) {
        let showImg = JSON.parse(localStorage.getItem('showImg') || "[]");
        let newImg = {
          image: img
        };
        showImg.push(newImg);
        localStorage.setItem('showImg', JSON.stringify(showImg));
    }

}

const header = new Header();

export default header;
