export default function createMainDOM () {

}
document.body.innerHTML = `
    <header class='main-header'>
        <img src="../images/canva-logo.png">
        
        <menu class='menu-controls'>
            <ul class='menu-controls-list'></ul>            
        </menu>
        <h1>Canva</h1>
        <div id='auth-info'></div>
    </header>
 
    <main class='main'>
        <section class='main-choice'>
            <div class='main-choice__inner'>
                <img class='main-img' src='../images/main-img.webp'>
                <div class='main-div'>
                    <h3 class='main-choice__inner-title'>Design anything.</h3>
                    <input class='main-choice__inner-input' type='text' placeholder='What would you like to design?' aria-label='What would you like to design?' value=''>
                    <p class='main-choice__inner-text'>Everyone can create professional designs with Canva. It's easy to use and free.</p>
                </div>
            </div>
        </section>

        <section class='create-design'>
            <div class='create-design__inner'>
                <h4 class='create-design__inner-title'>Create a design</h4>
            </div>
        </section>

        <section class='create-design'>
            <div class='create-design__inner'>
                <h4 class='examples__inner-title'>Examples</h4>
                <div class="swiper-container">
                  <div class="swiper-wrapper"></div>
                  <div class="swiper-pagination"></div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
             </div>
        </section>
    </main>

    <footer>
        <img src="../images/rs_school_js.svg">
        <a href="https://rs.school/js/">JavaScript</a>
        <span>2021</span>
        <div>
            <img class="gh" src="../images/github_PNG.png"><a href="https://github.com/mariariazanova">Maria Riazanova</a>
            <img class="gh" src="../images/github_PNG.png"><a href="https://github.com/wh1teee">Kanstantsin Piatrouski</a>
            <img class="gh" src="../images/github_PNG.png"><a href="https://github.com/Rombas">Raman Bashkirau</a>
            <img class="gh" src="../images/github_PNG.png"><a href="https://github.com/kohan123">Danila Kokhan</a>
        </div>
    </footer>
    
<div id="modal1" class="modal">
    <div class="modal-content">
      <h4>This design is available. Please log in</h4>
    </div>
</div>
<div id="modal2" class="modal">
    <div class="modal-content">
      <h4>This design is being creating. Please choose another one</h4>
    </div>
</div>
`;
