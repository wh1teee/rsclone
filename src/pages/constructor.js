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
