export default function createConstructorDOM() {

    document.body.innerHTML = `
    <header class="constructor__header">
   <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 menu-controls-list"></ul>
                <div class="navbar-nav mb-2 mb-lg-0 menu-controls-list" id='header-controls'></div>
            </div>
        </div>
    </nav>
        
    </header>
 
    <main class='constructor-page'>
        <section class='controls'>
            <div class='controls__icons'>
                <ul class='controls__icons-list'></ul>
            </div>            
            <div class='controls__elements'>
                <ul class='controls__elements-list'></ul>
            </div>            
            <div class="hide__panel__container">
              <div class="hide__btn">
                  <svg width="18" height="96" viewBox="0 0 18 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1.006c.001 3.501.916 9.396 4.571 12.994l.528.518c4.163 4.087 6.776 6.652 6.897 13.482H18v40c0 7.207-2.639 9.798-6.902 13.982l-.527.518C6.916 86.098 6.001 91.993 6 95.494V96H0V0h6v1.006z"
                            fill="rgb(40, 48, 57)">
                      </path>
                  </svg>
                  <span class="hide__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                      <path fill="rgb(0, 0, 0)" stroke="currentColor" stroke-linecap="round" stroke-width="1.25"
                            d="M7 3.17L4.88 5.3a1 1 0 0 0 0 1.42L7 8.83">
                      </path>
                    </svg>
                  </span>
              </div>
            </div>
        </section>
        <section class='workspace'>
            <div class='workspace__header'>
                <div class='workspace__header-left'></div>
                <div class='workspace__header-right'></div>
            </div>
            <div class='workspace__field'></div>
        </section>
    </main>
    <audio src="./sound/mouse_click.mp3"></audio>
`;
}
