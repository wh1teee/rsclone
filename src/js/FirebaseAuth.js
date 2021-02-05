import DOM from './DOMLinks';
import { createEditorPage } from '../index';
import slider from './Slider';

class Authentication {
  constructor () {
    this.storageRef = '';
    this.dbRef = '';
    this.userID = '';
    this.templateCount = 0;
    this.login = false;
  }

  createAuthPanelMain (ifLoggedIn) {
    // const mainLoginPanel = document.querySelector('#auth-info');
    const dom = DOM.getHTMLElements();
    dom.authInfo.innerHTML = `
            <!-- NAVBAR -->
                    <ul id="nav-mobile" class="right ">
                        <li class="logged-in" style="display:none">
                            <a href="#modal-account" class="white-text modal-trigger flow-text waves-effect waves-light btn">Account</a>
                        </li>    
                        <li class="logged-in" style="display:none">
                            <a href="#" class="white-text flow-text waves-effect waves-light btn" id='create-design'>Create a design</a>
                        </li>
                        <li class="logged-out" style="display:none">
                            <a href="#modal-login" class="white-text modal-trigger flow-text waves-effect waves-light btn">Log in</a>
                        </li>
                        <li class="logged-out" style="display:none">
                            <a href="#modal-signup" class="white-text modal-trigger flow-text waves-effect waves-light btn orange lighten-2">Sign up</a>
                        </li>
                        <li class="logged-in" style="display:none">
                            <a href="#" class="white-text flow-text waves-effect waves-light btn" id="logout" >Log out</a>
                        </li>
                    </ul>

             <!-- SIGN UP MODAL -->
             <div id="modal-signup" class="modal">
                <div class="modal-content">
                <h4>Sign up</h4><br />
                <form id="signup-form">
                    <div class="input-field">
                        <input type="email" id="signup-email" required />
                        <label for="signup-email">Email address</label>
                    </div>
                    <div class="input-field">
                        <input type="password" id="signup-password" required />
                        <label for="signup-password">Choose password</label>
                    </div>
                    <button class="white-text flow-text waves-effect waves-light btn orange lighten-2 z-depth-0">Sign up</button>
                </form>
                </div>
            </div>
            <!-- LOGIN MODAL -->
            <div id="modal-login" class="modal">
                <div class="modal-content">
                <h4>Login</h4><br />
                <form id="login-form">
                    <div class="input-field">
                        <input type="email" id="login-email" required />
                        <label for="login-email">Email address</label>
                    </div>
                    <div class="input-field">
                        <input type="password" id="login-password" required />
                        <label for="login-password">Your password</label>
                    </div>
                    <button class="white-text flow-text waves-effect waves-light btn orange lighten-2 z-depth-0">Log in</button>
                </form>
                </div>
            </div>
            <!-- ACCOUNT MODAL -->
            <div id="modal-account" class="modal">
              <div class="modal-content center-align">
                <h4>Account details</h4><br />
                <div class="account-details"></div>
                <div class="account-extras"></div>
              </div>
            </div>
        `;
    this.materializeSetup();
    this.firebaseSetup(ifLoggedIn);

  }

  materializeSetup () {
    // setup materialize components
    document.addEventListener('DOMContentLoaded', function () {
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals, {
        inDuration: '200',
        outDuration: '300',
        opacity: '0.7',
        onOpenStart (e) {
          if (auth.login && e.id === 'modal1') {
              createEditorPage();
              this.close()
          }
        },
      });
    });
  }

  firebaseSetup (ifLoggedIn) {
    // Your web app's Firebase configuration
    let firebaseConfig = {
      apiKey: 'AIzaSyBL689M3ZGwGQcBdor8l6ke3pzuB9fKq7Q',
      authDomain: 'fir-firestore-16cf7.firebaseapp.com',
      projectId: 'fir-firestore-16cf7',
      appId: '1:983573501773:web:03afb58169d26c41568904',
      storageBucket: 'fir-firestore-16cf7.appspot.com',
    };

    // Initialize Firebase
    if (!ifLoggedIn) {
      firebase.initializeApp(firebaseConfig);
    }


    //Store and Auth references
    const authRef = firebase.auth();
    this.dbRef = firebase.firestore();
    this.storageRef = firebase.storage();

    const signupForm = document.querySelector('#signup-form');
    const logout = document.querySelector('#logout');
    const loginForm = document.querySelector('#login-form');

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      //get user info
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;

      //sign up user
      authRef.createUserWithEmailAndPassword(email, password).then(userCred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
      });
    });

    logout.addEventListener('click', (e) => {
      const dom = DOM.getHTMLElements();
      e.preventDefault();
      authRef.signOut();
      dom.exampleImages.innerHTML = '';
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;

      authRef.signInWithEmailAndPassword(email, password).then((cred) => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
      });
    });
    //listen for authentification status change
    authRef.onAuthStateChanged(user => {
      this.uiControlVision(user);
      if (user) {
        this.userID = user.uid;
        this.getExamplesFromCloud(user);
      } else {
        const dom = DOM.getHTMLElements();
        const needToLogin = document.createElement('h4');
        needToLogin.innerHTML = 'Log in to get max experience of Canva';
        dom.exampleImages.append(needToLogin);
      }
    });

  }

  getExamplesFromCloud (user) {
    const stRef = this.storageRef;
    const dataRef = this.dbRef;
    const slides = []
    const swiper = slider.secondSlider()
    dataRef.collection(`${user.uid}`).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const imgName = doc.data().name;
        const imgPath = stRef.ref().child(`users/${user.uid}/${imgName}.jpg`);
        imgPath.getDownloadURL().then((url) => {
          const card = `
                          <div class="swiper-slide">
                              <div class="card__container modal-trigger" href="#modal${imgName+1000}">
                                  <div class='slider__card-header'>
                                       <img class='slider__card-header-img' src='${url}' style="width:100%">
                                  </div>
                              </div>                              
                  `
          const modal = `<div id="modal${imgName+1000}" class="modal modal-fixed-footer">
                                  <div class="modal-content">
                                    <img src="${url}" alt="you design">
                                  </div>
                                  <div class="modal-footer">
                                    <a href="${url}" target="_blank" class="modal-close waves-effect waves-green btn">Open in net tab</a>
                                    <a href="#!" class="modal-close waves-effect waves-green btn">Close</a>
                                  </div>
                              </div>
                          </div>`;

          document.body.insertAdjacentHTML('beforeend', modal)
          slider.addSlides(swiper, card)
          let modals = document.querySelectorAll('.modal');
          M.Modal.init(modals, {
            inDuration: '200',
            outDuration: '300',
            opacity: '0.7',
            onOpenStart (e) {
              if (auth.login && e.id === 'modal1') {
                createEditorPage();
                M.Modal.destroy();
              }
            },
          })
        });
      });
    });
  }

  uiControlVision (user) {
    const loggedOutLinks = document.querySelectorAll('.logged-out');
    const loggedInLinks = document.querySelectorAll('.logged-in');
    const accountInfo = document.querySelector('.account-details');

    if (user) {
      const html = `<div class="flow-text"> Logged in as ${user.email}</div>`;
      accountInfo.innerHTML = html;
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
      this.login = true;
    } else {
      accountInfo.innerHTML = '';
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  }

  createAuth () {
    const dom = DOM.getHTMLElements();
    let constructorLoginPanel = document.createElement('div');
    constructorLoginPanel.innerHTML = `
            <button type='button'>Account</button>
            <button type='button'>Logout</button>
        `;
    dom.headerControls.append(constructorLoginPanel);
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

  createAuthPanelMain2 (user) {
    const mainLoginPanel = document.querySelector('#auth-info');
    const dom = DOM.getHTMLElements();

    dom.authInfo.innerHTML = `
            <!-- NAVBAR -->
                    <ul id="nav-mobile" class="right ">
                        <li class="logged-in" style="display:block">
                            <a href="#modal-account2" class="white-text modal-trigger flow-text waves-effect waves-light btn">Account</a>
                        </li>    
                        <li class="logged-in" style="display:block">
                            <a href="#" class="white-text flow-text waves-effect waves-light btn" id='create-design'>Create a design</a>
                        </li>
                        <li class="logged-out" style="display:none">
                            <a href="#modal-login2" class="white-text modal-trigger flow-text waves-effect waves-light btn">Log in</a>
                        </li>
                        <li class="logged-out" style="display:none">
                            <a href="#modal-signup2" class="white-text modal-trigger flow-text waves-effect waves-light btn orange lighten-2">Sign up</a>
                        </li>
                        <li class="logged-in" style="display:block">
                            <a href="#" class="white-text flow-text waves-effect waves-light btn" id="logout" >Log out</a>
                        </li>
                    </ul>
         
             <!-- SIGN UP MODAL -->
             <div id="modal-signup2" class="modal">
                <div class="modal-content">
                <h4>Sign up</h4><br />
                <form id="signup-form">
                    <div class="input-field">
                        <input type="email" id="signup-email" required />
                        <label for="signup-email">Email address</label>
                    </div>
                    <div class="input-field">
                        <input type="password" id="signup-password" required />
                        <label for="signup-password">Choose password</label>
                    </div>
                    <button class="white-text flow-text waves-effect waves-light btn orange lighten-2 z-depth-0">Sign up</button>
                </form>
                </div>
            </div>
            <!-- LOGIN MODAL -->
            <div id="modal-login2" class="modal">
                <div class="modal-content">
                <h4>Login</h4><br />
                <form id="login-form">
                    <div class="input-field">
                        <input type="email" id="login-email" required />
                        <label for="login-email">Email address</label>
                    </div>
                    <div class="input-field">
                        <input type="password" id="login-password" required />
                        <label for="login-password">Your password</label>
                    </div>
                    <button class="white-text flow-text waves-effect waves-light btn orange lighten-2 z-depth-0">Log in</button>
                </form>
                </div>
            </div>
            <!-- ACCOUNT MODAL -->
            <div id="modal-account2" class="modal">
              <div class="modal-content center-align">
                <h4>Account details</h4><br />
                
                <div class="account-details"><div class="flow-text"> Logged in as ${user.email}</div></div>
                <div class="account-extras"></div>
              </div>
            </div>
        `;
    this.materializeSetup();
    this.firebaseSetup();
  }
}

const auth = new Authentication();

export default auth;
