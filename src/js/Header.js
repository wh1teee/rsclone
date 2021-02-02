import createMainDOM from '../pages/main';
import html2canvas from 'html2canvas';
import Canvas2Image from 'wd-canvas2image';
import html2PDF from 'jspdf-html2canvas';
import auth from './FirebaseAuth';
import slider from './Slider';

import '../styles/constructor.scss';

import DOM from './DOMLinks';

const menuElements = ['< Main', 'File'];
const mainMenuElements = ['Home', 'Templates', 'Features', 'Learn', 'Plans'];


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
            
            <li><a class='waves-effect waves-light btn white teal-text text-lighten-2' id='download-button1'>Save as img</a></li>
            <li><a class='waves-effect waves-light btn white teal-text text-lighten-2' id='download-button2'>Save as pdf</a></li>
        `;  
               
       
        document.getElementById('download-button1').addEventListener('click', function() {
            html2canvas(document.querySelector('.sheet__container')).then(function(canvas) {
                                   // document.body.appendChild(canvas);
                  console.log('001');
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
              //  auth.createAuthPanelMain();
                auth.createAuth();

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
