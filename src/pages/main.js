export default function createMainDOM () {
  document.body.innerHTML = `
<header class='main-header'>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../images/canva-logo.png" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 menu-controls-list"></ul>
                <div class="account-info navbar-nav mb-2 mb-lg-0 menu-controls-list"></div>
            </div>
        </div>
    </nav>
</header>
 
    <main class='main'>
        <section class='main-choice'>
            <div class='main-choice__inner'>
                <img class='main-img' src='../images/main-img.webp' alt="main img">
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
                <div class="swiper-container">
                  <div class="swiper-wrapper"></div>
                  <div class="swiper-pagination pagination1"></div>
                  <div class="swiper-button-prev prev1"></div>
                  <div class="swiper-button-next next1"></div>
                </div>
            </div>
        </section>

        <section class='create-design'>
            <div class='create-design__inner' id="examples__inner">
                <h4 class='examples__inner-title'>Examples</h4>
             </div>
        </section>
    </main>

    <footer>
        <img class="rsschool__logo" src="../images/rs_school_js.svg" alt="RSSchool">
        <a href="https://rs.school/js/">JavaScript</a>
        <span>2021</span>
        <div>
            <a class="gh" href="https://github.com/mariariazanova">Maria Riazanova</a>
            <a class="gh" href="https://github.com/wh1teee">Kanstantsin Piatrouski</a>
            <a class="gh" href="https://github.com/Rombas">Raman Bashkirau</a>
            <a class="gh" href="https://github.com/kohan123">Danila Kohan</a>
        </div>
    </footer>
    
<div id="modal1" class="modal">
    <div class="modal-content">
      <h4>This design is available. Please log in</h4>
    </div>
</div>
`;
}
