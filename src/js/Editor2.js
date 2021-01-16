import DOM from './DOMLinks';
// import actionContainer from './ActionContainer';

import '../styles/editor.scss';

let selectedElement;
let dragObj;
let count=0;



class Editor {

    createContainer(event){
        const dom = DOM.getHTMLElements(); 
        selectedElement = event.target;

        console.log(event);
        console.log(event.target);
        console.log(event.target.getAttribute('id'));
        console.log(event.target.getAttribute('class'));
        const cls = event.target.getAttribute('class');
        console.log(cls);
        console.log(window.getComputedStyle(event.target));
        console.log(window.getComputedStyle(event.target).getPropertyValue('width'));
        
        selectedElement.classList.toggle('live__container');

        selectedElement.setAttributeNS(null, "onmousemove", `${this.move(event)}`);
     //   selectedElement.setAttributeNS(null, "onmouseout", "deselectText(event)");
    //    selectedElement.setAttributeNS(null, "onmouseup", "deselectText(event)");
    //    selectedElement.setAttributeNS(null, 'onmousewheel', 'changeSizeText(event)');
     //   selectedElement.setAttributeNS(null, 'ondblclick', 'skewText(event)');      

        /*
        const container = document.createElement('div');
        container.classList.add('live__container');
        
        let width = window.getComputedStyle(event.target).getPropertyValue('width');
        let height = window.getComputedStyle(event.target).getPropertyValue('height');
       
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        container.innerHTML = '11111';
        dom.templateWrapper.append(container);
*/
    }

    findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
    }

    move(event) {
        let obj = event.target;
        if(count>0){
            // count margins and divs offset
            // body{ margin:10px; }
            // height:100px;
            obj.adx = 10; 
            obj.ady = 10 + (count*100)
        }else{
            obj.adx = 0;
            obj.ady = 0;
        }
        count++;
        
        obj.onmousedown = function(e)
        {
            var rect = obj.getBoundingClientRect();
            obj.dx = rect.left - e.clientX;
            obj.dy = rect.top - e.clientY;
            obj.isDown = true;
            dragObj = this;
        }
    
        obj.onmouseup = function(e)
        {
            obj.isDown = false;
        }
    
        document.onmousemove = function(e)
        {
            if(dragObj && dragObj.isDown)
            {
                dragObj.style.left = e.pageX -dragObj.adx+ dragObj.dx +"px";
                dragObj.style.top = e.pageY -dragObj.ady+ dragObj.dy + "px";
            }
        }

    }


}

const editor = new Editor();

export default editor;
