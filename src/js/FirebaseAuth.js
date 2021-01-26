import DOM from './DOMLinks';

class Authentication {
    
    createAuthPanelMain() {
        const mainLoginPanel = document.querySelector('#auth-info');
        mainLoginPanel.innerHTML = `
            <!-- NAVBAR -->
            <nav class="z-depth-0 grey lighten-4">
                <div class="nav-wrapper container">
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li class="logged-out">
                            <a href="#" class="grey-text modal-trigger flow-text" data-target="modal-login">Login</a>
                        </li>
                        <li class="logged-out">
                            <a href="#" class="grey-text modal-trigger flow-text" data-target="modal-signup">Sign up</a>
                        </li>
                        <li class="logged-in">
                            <a href="#" class="grey-text flow-text" id="logout">Logout</a>
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
                    <button class="btn yellow darken-2 z-depth-0">Sign up</button>
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
                    <button class="btn yellow darken-2 z-depth-0">Login</button>
                </form>
                </div>
            </div>
        `; 
        this.materializeSetup();
        this.firebaseSetup();
    }

    materializeSetup() {
        // setup materialize components
        document.addEventListener('DOMContentLoaded', function() {

        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);

        });
    }

    firebaseSetup() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
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
            if (user) {
                console.log('User login');
            } else {
                console.log('User logout');
            }
        });
    
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