class DOM {

    static getHTMLElements() {
        return {
            main: document.querySelector('main'),
            mainMainPage: document.querySelector('main.main'),
            mainConstructorPage: document.querySelector('main.constructor-page'),
            header: document.querySelector('header'),

            menuControls: document.querySelector('.menu-controls'),
            menuControlsList: document.querySelector('.menu-controls-list'),
            headerControls: document.getElementById('header-controls'),
            controls: document.querySelector('.controls'),
            controlsIcons: document.querySelector('.controls__icons'),
            controlsIconsList: document.querySelector('.controls__icons-list'),
            controlsElements: document.querySelector('.controls__elements'),
            controlsElementsList: document.querySelector('.controls__elements-list'),
            controlsElementsUploadDiv: document.querySelector('.controls__elements-upload-div'),
            controlsElementsTextDiv: document.querySelector('.controls__elements-text-div'),
            controlsElementsPanelDiv: document.querySelector('.controls__elements-panel-div'),
            controlsElementsBackgroundDiv: document.querySelector('.controls__elements-background-div'),
            authInfo: document.getElementById('auth-info'),
            accountInfo: document.querySelector('.account-info'),
            modals: document.querySelector('.modals'),
            accountModals: document.querySelector('.accountModals'),
            workSpaceHeader: document.querySelector('.workspace__header'),
            workSpaceHeaderLeft: document.querySelector('.workspace__header-left'),
            workSpaceHeaderRight: document.querySelector('.workspace__header-right'),
            workSpaceField: document.querySelector('.workspace__field'),


            sheetContainer: document.querySelector('.sheet__container'),
            templateWrapper: document.querySelector('.template__wrapper'),

            nextButton: document.getElementById('next'),
            prevButton: document.getElementById('prev'),
            arrows: document.querySelectorAll('.create-design__inner-slider__arrow'),
            track: document.querySelector('.create-design__inner-slider__cards-track'),
            cardTitle: document.querySelector('.slider__card-title-h4'),
            cardImage: document.querySelector('.slider__card-header-img'),
            uploadButton: document.getElementById('upload-button'),
            inputUpload: document.getElementById('input-upload'),
            sliderCard: document.querySelectorAll('.slider__card'),

            exampleImages: document.querySelector('#examples'),
            exampleInner: document.querySelector('#examples__inner'),

        };
    }
}

export default DOM;
