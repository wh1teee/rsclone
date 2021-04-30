import DOM from './DOMLinks';
import slider from './Slider';
import { createEditorPage } from '../index';
import modals from './Modals';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

class Authentication {
  constructor () {
    this.storageRef = '';
    this.dbRef = '';
    this.userID = '';
    this.login = false;
  }

  createAuthPanelMain (ifLoggedIn) {
    const dom = DOM.getHTMLElements();
    if (ifLoggedIn) {
      dom.accountInfo.innerHTML = `
      <button type="button" class="btn account-btn btn-lg" data-bs-toggle="modal" data-bs-target="#accountModal">
                      Account
      </button>
      <button type="button" class="btn account-btn btn-lg" id="create-design">
                      create a design
      </button>
      
      `;
    } else {
      dom.accountInfo.innerHTML = `
      <button type="button" class="btn account-btn btn-lg" data-bs-toggle="modal" data-bs-target="#authenticationModal">
                      Account
      </button>
      `;
    }
  }

  firebaseSetup (ifLoggedIn) {
    const firebaseConfig = {
      apiKey: 'AIzaSyDN0wezpiBV4GkLNgFxjngQikBCIyGrGBg',
      authDomain: 'canva-clone-wh1teee.firebaseapp.com',
      projectId: 'canva-clone-wh1teee',
      storageBucket: 'canva-clone-wh1teee.appspot.com',
      messagingSenderId: '717173726400',
      appId: '1:717173726400:web:2f622211618c00214b2125',
      measurementId: 'G-BHPEHCRLFY',
    };

    if (!ifLoggedIn) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    }

    //Store and Auth references
    const authRef = firebase.auth();
    this.dbRef = firebase.firestore();
    this.storageRef = firebase.storage();

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('InputEmailLogin').value;
      const password = document.getElementById('InputPasswordLogin').value;
      authRef.signInWithEmailAndPassword(email, password).then((cred) => {

        this.closeAuthModal();
        loginForm.reset();
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/user-not-found') {
          console.log('Invalid user name, please try again');
        }
        if (errorCode === 'auth/wrong-password') {
          console.log('Invalid password, please try again');
        }

        console.log('err', errorCode);
        console.log('mess', errorMessage);
      });
    });

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      authRef.signOut();
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      //get user info
      const email = document.getElementById('InputEmailSignup').value;
      const password = document.getElementById('InputPasswordSignup').value;

      //sign up user
      authRef.createUserWithEmailAndPassword(email, password).then(userCred => {
        this.closeAuthModal();
        signupForm.reset();
      });
    });

    authRef.onAuthStateChanged(user => {
      this.uiControlVision(user);
      if (user) {
        this.userID = user.uid;
        this.getExamplesFromCloud(user);
        this.createAuthPanelMain(true);
        document.getElementById('create-design')
          .addEventListener('click', createEditorPage);
      } else {
        const dom = DOM.getHTMLElements();
        dom.exampleInner.innerHTML = `
        <div class="out__of__login__container">
            <h4 class="out__of__login__title">
                Log in to see saved images of all users and get max experience of Canva!
            <h4>
        </div>`;
        this.createAuthPanelMain(false);
      }
    });

  }

  closeAuthModal () {
    const myModalEl = document.getElementById('authenticationModal');
    const modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  uiControlVision (user) {
    const accountInfo = document.querySelector('.account-details');

    if (user) {
      accountInfo.innerHTML = `You email: ${user.email}`;
      this.login = true;
    } else {
      accountInfo.innerHTML = '';
      this.login = false;
    }
  }

  getExamplesFromCloud (user) {
    const stRef = this.storageRef;
    const dataRef = this.dbRef;
    this.changeExistingSlidesDatasets();
    const slides = [];
    const swiper = slider.secondSlider();
    dataRef.collection(`${user.uid}`).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const imgName = doc.data().name;
        const imgPath = stRef.ref().child(`users/${user.uid}/${imgName}.jpg`);
        imgPath.getDownloadURL().then((url) => {
          const card = `
                          <div class="swiper-slide">
                              <div class="card__container" data-bs-toggle="modal" data-bs-target="#idOfcard${imgName.split(' ').join('')}">
                                  <div class='slider__card-header'>
                                       <img class='slider__card-header-img' src='${url}' style="width:100%" alt="slider card">
                                  </div>
                              </div>`;
          const modal = `
                          <div class="modal fade" id="idOfcard${imgName.split(' ').join('')}" tabindex="-1" aria-labelledby="idOfcard${imgName.split(' ').join('')}Label" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h3 class="modal-title" id="exampleModalLabel">The image of the user</h3>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <img src="${url}" alt="you design">
                                </div>
                                <div class="modal-footer">
                                  <a href="${url}" type="button" class="btn btn-primary btn-lg" target="_blank" class="btn btn-secondary">Open in net tab</a>
                                  <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>`;

          modals.appendModals(modal);
          slider.addSlides(swiper, card);
        });
      });
    });
  }

  changeExistingSlidesDatasets () {
    const cardsContainers = document.querySelectorAll('.card__container');
    cardsContainers.forEach(item => {
      if (item.dataset.type === 'Resume') {
        item.removeAttribute('data-bs-toggle');
        item.removeAttribute('data-bs-target');
        item.addEventListener('click', () => {
          createEditorPage();
        }, { once: true });
      }
    });
  }

  saveImgToCloud (canvas, imgName) {
    const stRef = this.storageRef.ref();
    const databaseRef = this.dbRef;
    const uid = this.userID;

    databaseRef.collection(`${uid}`).add({
      name: imgName,
    }).then(() => {

    });

    canvas.toBlob(function (blob) {
      var image = new Image();
      image.src = blob;
      var metadata = {
        contentType: 'image/jpg',
      };

      stRef.child(`users/${uid}/${imgName}.jpg`).put(blob, metadata).then((snapshot) => {
      });
    });
  }

  userLoggedIn () {
    return this.login;
  }
}

const auth = new Authentication();

export default auth;
