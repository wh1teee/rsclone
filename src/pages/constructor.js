export default function createConstructorDOM() {

    document.body.innerHTML = `
    <header>
        <menu class='menu-controls'>
            <ul class='menu-controls-list'></ul>            
        </menu>
        <div id='header-controls'></div>
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
    </main>`;
}
