import html2canvas from 'html2canvas';
import Canvas2Image from 'wd-canvas2image';
import html2PDF from 'jspdf-html2canvas';
import auth from './FirebaseAuth';
import '../styles/constructor.scss';
import DOM from './DOMLinks';
import { createMain } from '../index';

const menuElements = ['< Main', 'File'];
const mainMenuElements = ['Home', 'Features', 'Learning'];

class Header {

  createMainHeader () {
    const dom = DOM.getHTMLElements();

    mainMenuElements.map((item, i) => {
      console.log(11);
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item');
      listItem.innerHTML = `
            <a 
            class="nav-link btn btn-lg ${i === 0 ? 'active' : ''}" 
            type="button" 
            data-bs-toggle="modal" 
            data-bs-target="#developingModal">${item}
            <span class="material-icons">keyboard_arrow_down</span></a>
            `;

      dom.menuControlsList.append(listItem);
    });
  }

  createHeader () {
    const dom = DOM.getHTMLElements();

    menuElements.map(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
            <a class="btn btn-lg no-shadow">${item}</a>
            `;
      dom.menuControlsList.append(listItem);
    });

    dom.headerControls.innerHTML = `
            <li><a class='btn no-shadow' id='download-button0' type="button" data-bs-toggle="modal" data-bs-target="#saveToCloudModal">Save to cloud</a></li>
            <li><a class='btn no-shadow' id='download-button1'>Save as img</a></li>
            <li><a class='btn no-shadow' id='download-button2'>Save as pdf</a></li>            
            <div class="modal fade" id="saveToCloudModal" tabindex="-1" aria-labelledby="saveToCloudModal" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Save image to cloud</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="save-form">
                        <label for="save-name"></label>
                        <input type="text" class="form-control" id="save-name" placeholder="Image name" required>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-lg btn-primary" form="save-form">Save</button>
                  </div>
                </div>
              </div>
            </div>
        `;

    document.getElementById('download-button0').addEventListener('click', function () {

      const saveForm = document.querySelector('#save-form');
      saveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const imgName = saveForm['save-name'].value;

        html2canvas(document.querySelector('.sheet__container')).then(function (canvas) {
          const myModalEl = document.getElementById('saveToCloudModal');
          bootstrap.Modal.getInstance(myModalEl).hide();
          saveForm.reset();
          auth.saveImgToCloud(canvas, imgName);
        });
      });
    });

    document.getElementById('download-button1').addEventListener('click', function () {
      html2canvas(document.querySelector('.sheet__container')).then(function (canvas) {
        Canvas2Image.saveAsJPEG(canvas);
      });
    });

    document.getElementById('download-button2').addEventListener('click', function () {
      html2canvas(document.querySelector('.sheet__container')).then(function () {
        // document.body.appendChild(canvas);
        return html2PDF(document.querySelector('.sheet__container'), {
          jsPDF: {
            format: 'a4',
          },
          html2canvas: {
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
          },
          imageType: 'image/jpeg',
          output: './pdf/generate.pdf',
        });
      });
    });

    if (document.querySelector('.constructor__header')){
      document.querySelector('.constructor__header').addEventListener('click', (event) => {
        if (event.target.textContent === '< Main') {
          createMain(true)
        }
      });
    }
  }

  saveToLocalStorage (img) {
    let showImg = JSON.parse(localStorage.getItem('showImg') || '[]');
    let newImg = {
      image: img,
    };
    showImg.push(newImg);
    localStorage.setItem('showImg', JSON.stringify(showImg));
  }
}

const header = new Header();

export default header;
