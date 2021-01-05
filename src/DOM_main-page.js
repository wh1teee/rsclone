export default function createMainDOM() {

    document.body.innerHTML = `
    <header>
        <img>
        <h1>Canva</h1>
        <menu>
            <ul></ul>            
        </menu>
        <div id='auth-info'></div>
    </header>
 
    <main class='main'>
        <section class='main-choice'>
            <div class='main-choice__inner'>
                <h3 class='main-choice__inner-title'></h3>
                <input class='main-choice__inner-input'></input>
                <p class='main-choice__inner-text'></p>
            </div>
        </section>

        <section class='create-design'>
            <div class='create-design__inner'>
                <h4 class='create-design__inner-title'></h4>
                <div class='create-design__inner-slider'></div>
            </div>
        </section>

        <section class='examples'>
            <div class='examples__inner'>
                <h4 class='examples__inner-title'></h4>
                <div class='examples__inner-slider'></div>
            </div>
        </section>
    </main>

    <main class='main-with-auth'>
        <section class='aside-left'>
            <div class='aside-left__inner'>
                <ul></ul>
            </div>
        </section>

        <section class='main-center'>
            <div class='main-center__inner'>
                <div class='main-center__inner-image'>
                    <h4></h4>
                    <p></p>
                </div>
                <div class='main-center__inner-examples'>
                    <ul></ul>
                    <div class='main-center__inner-examples-slider'></div>
                </div>
                <div class='main-center__inner-personal'>
                    <ul></ul>
                    <div class='main-center__inner-personals-slider'></div>
                </div>
            </div>
        </section>

        <section class='examples'>
            <div class='examples__inner'>
                <h4 class='examples__inner-title'></h4>
                <div class='examples__inner-slider'></div>
            </div>
        </section>
    </main>

    <footer>
        <img src="src/images/rs_school_js.svg">
        <a href="https://rs.school/js/">JavaScript</a>
        <span>2020</span>
        <div>
            <img class="gh" src="src/images/github_PNG.png"><a href="https://github.com/mariariazanova">Maria Riazanova</a>
            <img class="gh" src="src/images/github_PNG.png"><a href="https://github.com/wh1teee">Kanstantsin Piatrouski</a>
            <img class="gh" src="src/images/github_PNG.png"><a href="https://github.com/Rombas">Raman Bashkirau</a>
            <img class="gh" src="src/images/github_PNG.png"><a href="https://github.com/kohan123">Danila Kokhan</a>
        </div>
    </footer>`;
}
