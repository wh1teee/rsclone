import DOM from './DOMLinks';

class Authentication {
    
    createAuthPanelMain() {
        const mainLoginPanel = document.querySelector('#auth-info');
        mainLoginPanel.innerHTML = `
            <!-- NAVBAR -->
            <nav class="z-depth-0">
                <div class="nav-wrapper">
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
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
                </div>
            </nav>
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
        // <a href="#" class="grey-text modal-trigger flow-text" data-target="modal-create">Create template</a>
        this.materializeSetup();
        this.firebaseSetup();        
    }

    materializeSetup() {
        // setup materialize components
        document.addEventListener('DOMContentLoaded', function() {
            let modals = document.querySelectorAll('.modal');
            M.Modal.init(modals);
        });
    }

    firebaseSetup() {
        // Your web app's Firebase configuration
        let firebaseConfig = {
            apiKey: "AIzaSyBL689M3ZGwGQcBdor8l6ke3pzuB9fKq7Q",
            authDomain: "fir-firestore-16cf7.firebaseapp.com",
            projectId: "fir-firestore-16cf7",
            appId: "1:983573501773:web:03afb58169d26c41568904"
        };
        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    
        //Store and Auth references
        const authRef = firebase.auth();
        const dbRef = firebase.firestore();

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
            e.preventDefault();
            authRef.signOut();
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
                
            } else {
                
            }
        });
    
    }

    uiControlVision(user) {
        const loggedOutLinks = document.querySelectorAll('.logged-out');
        const loggedInLinks = document.querySelectorAll('.logged-in');
        const accountInfo = document.querySelector('.account-details');

        if (user) {
            const html = `<div class="flow-text"> Logged in as ${user.email}</div>`;
            accountInfo.innerHTML = html;
            loggedInLinks.forEach(item => item.style.display = 'block');
            loggedOutLinks.forEach(item => item.style.display = 'none');
        } else {
            accountInfo.innerHTML = '';
            loggedInLinks.forEach(item => item.style.display = 'none');
            loggedOutLinks.forEach(item => item.style.display = 'block');
        }
    }

    createAuth() {
        const dom = DOM.getHTMLElements();
        let constructorLoginPanel = document.createElement('div');;
        constructorLoginPanel.innerHTML = `
            <button type='button'>Account</button>
            <button type='button'>Logout</button>
        `;
        dom.headerControls.append(constructorLoginPanel);

    }
}

const auth = new Authentication();

export default auth;
