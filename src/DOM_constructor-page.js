export default function createConstructorDOM() {

    document.body.innerHTML = `
    <header>
        <menu>
            <ul></ul>            
        </menu>
        <div id='header-controls'></div>
    </header>
 
    <main class='constructor-page'>
        <section class='controls'>
            <div class='controls__icons'>
                <ul></ul>
            </div>            
            <div class='controls__elements'>
                <ul></ul>
            </div>
        </section>
        <section class='workspace'>
            <div class='workspace__header'></div>
            <div class='workspace__field'></div>
        </section>
    </main>`;
}
