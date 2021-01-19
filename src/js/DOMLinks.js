class DOM {

    static getHTMLElements() {
        return {
            main: document.querySelector('main'),
            header: document.querySelector('header'),
            
            menuControls: document.querySelector('.menu-controls'),
            menuControlsList: document.querySelector('.menu-controls-list'),
            headerControls: document.getElementById('header-controls'),
            controls: document.querySelector('.controls'),
            controlsIcons: document.querySelector('.controls__icons'),
            controlsIconsList: document.querySelector('.controls__icons-list'),
            controlsElements: document.querySelector('.controls__elements'),
            controlsElementsList: document.querySelector('.controls__elements-list'),
            authInfo: document.getElementById('auth-info'),
            workSpaceField: document.querySelector('.workspace__field'),


            sheetContainer: document.querySelector('.sheet__container'),
            templateWrapper: document.querySelector('.template__wrapper'),

            nextButton: document.getElementById('next'),
            prevButton: document.getElementById('prev'),
            arrows: document.querySelectorAll('.create-design__inner-slider__arrow'),
            track: document.querySelector('.create-design__inner-slider__cards-track'),
            cardTitle: document.querySelector('.slider__card-title-h4'),
            cardImage: document.querySelector('.slider__card-header-img'),



            burgerMenu: document.querySelector('.navigation__toggle'),
            blackout: document.getElementById('blackout'),
            


            menuList: document.querySelector('.menu__list'),
            mainPage: document.getElementById('main__page'),
            statisticPage: document.getElementById("statistic-page"),
            mainContent: document.getElementById('main__content'),
            input: document.querySelector('input'),
           
            
           
            switchTrain: document.querySelector('.switch__train'),
            switchPlay: document.querySelector('.switch__play'),
        };
    }
}
   
export default DOM;
