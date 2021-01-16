import DOM from './DOMLinks';

const templateIcons = ['Templates', 'Uploads', 'Photos', 'Elements', 'Text', 'Drawings', 'Music', 'Videos', 'Background', 'Folders', 'More'];
const templateImages = ['table_chart', 'cloud_upload', 'photo_size_select_actual', 'art_track', 'text_fields', 'brush', 'audiotrack', 'ondemand_video', 'texture', 'folder_special', 'more_horiz'];


class ControlsIcons {

      
    createControlPanel() {
        const dom = DOM.getHTMLElements();


        templateIcons.map((item, index) => {
            
            const listItem = document.createElement('li');
            const templateImage = templateImages[index];
            listItem.innerHTML = `<a class='icon-button' id='${item}'>
                <span class="material-icons">${templateImage}</span>${item}</a>`;
            dom.controlsIconsList.append(listItem);        
        })
      
    }
}

const controls = new ControlsIcons();

export default controls;