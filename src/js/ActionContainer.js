class ActionContainer {

    constructor(elem, cont_el){                   //на входе картинка и контейнер рабочего поля
        this.picture = elem;                     //свойство хранит ссылку на дочернюю картинку
/*
        let Num = elem.style.transform.match(/[\-\d\.]/g); //ищем в строке все цифры и точку, получаем массив
        console.log(Num);
        this.transformValue = +Num.reduce(fra,'');       //переводим в число - это будет значени угла поворота
        function fra(r,v) {
            return r+v;
        }*/
        this.transformValue = 0;

        /*парметры для кнопок*/
        this.rotateSpeed = 0;
        this.scaleSpeed  = 0;
        this.ySpeed = 0;
        this.xSpeed = 0;

        this.downX = undefined;
        this.downY = undefined;

        this.downX1 = undefined;
        this.downY1 = undefined;

        this.downX2 = undefined;
        this.downY2 = undefined;

        this.shiftX  = undefined;
        this.shiftY  = undefined;
        this.move_type = undefined;
        this.ready = false;
      //  this.opacityValue = +elem.style.opacity;

        this.cont = document.createElement('div');  //создаем контейнер для картинки
        console.log('1');
        this.cont.className='resize-container';
        this.cont.setAttribute('style','top:'+(elem.offsetTop - 1)+'px; left:'+(elem.offsetLeft-1)+'px; height:'+(elem.offsetHeight+2)+'px; width:'+(elem.offsetWidth+2)+'px;');
        this.cont.style.transform = elem.style.transform;
        this.effW  = elem.getAttribute('effW');   //коэффциент ширины

        if (this.effW == 'Infinity')  this.effW =elem.offsetWidth / elem.offsetHeight;

       // elem.style.cssText = '';
      //?  elem.style.opacity = this.opacityValue;

        elem.parentNode.replaceChild(this.cont, elem);         //!!!!
        this.cont.appendChild(elem);

        elem = document.createElement('div');      //отдельно элемент на вращение
        elem.className='resize-container-btn';
        this.cont.appendChild(elem);
        //cont_el.appendChild(this.cont);

        this.baseWidth = this.cont.offsetWidth;
        this.baseHeight = this.cont.offsetHeight;
        this.picture.style.fontSize=this.cont.offsetHeight*0.8+'px';

    }


    savePicture(){                  //куда сохранять картинку
        this.picture.setAttribute('style','position:absolute; top:'+(this.cont.offsetTop + 1)+'px;left:'+(this.cont.offsetLeft + 1)+'px; height:'+(this.cont.offsetHeight-2)+'px; Width:'+(this.cont.offsetWidth-2)+'px');
        this.picture.style.transform = this.cont.style.transform;
        this.picture.style.opacity = this.opacityValue;
        this.picture.setAttribute('effW',this.effW);
        this.picture.style.fontSize = this.cont.offsetHeight*0.8+'px';
        console.log(this.picture);
        console.log(this.cont);
        this.cont.parentNode.replaceChild(this.picture, this.cont);
       // cont_el.replaceChild(this.picture, this.cont);         //!!!!
        this.cont.remove();
    }

    rotate (x,y){                          //вращение
        let alfa0 = Math.atan(1/this.effW)*180/Math.PI;
        let dx = x - this.getElementPos(this.cont).left - this.getElementPos(this.cont).width/2 ;
        let dy = y - this.getElementPos(this.cont).top - this.getElementPos(this.cont).height/2 ;
        let alfa1 = (Math.atan(dy/dx)*180/Math.PI);

        if (dx<0) alfa1=alfa1+180;
        let alfa = alfa1-alfa0;

        this.transformValue = alfa;
        this.cont.style.transform='rotatez('+ alfa +'deg)';

        //растягивание
        let d1 = Math.sqrt(dy*dy + dx*dx);  //длина половины диагонали
        let diagonal = Math.sqrt(this.cont.offsetHeight*this.cont.offsetHeight + this.cont.offsetWidth*this.cont.offsetWidth);

        let al = Math.atan(1/this.effW);
        let delta = d1-diagonal/2;
        if (Math.abs(delta)<2) return
        if ((this.cont.offsetHeight<40 || this.cont.offsetWidth<40)  && delta<0) return  //мин. размеры картинки

        if (this.effW <= 1) {
            this.cont.style.height = this.cont.offsetHeight + delta*Math.cos(al) +'px';
            this.cont.style.width = (this.cont.offsetHeight + delta*Math.cos(al))*this.effW +'px';
            this.cont.style.top =this.cont.offsetTop - delta*Math.cos(al)/2 +'px';
            this.cont.style.left = this.cont.offsetLeft - delta*Math.cos(al)*this.effW/2 +'px';
        } else {
            this.cont.style.height = (this.cont.offsetWidth + delta*Math.sin(al))/this.effW +'px';
            this.cont.style.width = this.cont.offsetWidth + delta*Math.sin(al) +'px';
            this.cont.style.top = this.cont.offsetTop - delta*Math.sin(al)/2/this.effW +'px';
            this.cont.style.left = this.cont.offsetLeft - delta*Math.sin(al)/2 +'px';
        }
        this.picture.style.fontSize = this.cont.offsetHeight*0.8+'px';
    }

    move(x,y,cont_el) {
        console.log(this.cont.style.left, this.cont.style.top);
        console.log(this.getElementPos(cont_el));
        console.log(this.shiftX, this.shiftY);
        console.log(this.deltaTop(this.transformValue, this.cont.offsetHeight,this.cont.offsetWidth));
       
        this.cont.style.left = x - this.getElementPos(cont_el).left- this.shiftX + this.deltaTop(this.transformValue, this.cont.offsetHeight,this.cont.offsetWidth).X + 'px';
        this.cont.style.top = y - this.getElementPos(cont_el).top - this.shiftY + this.deltaTop(this.transformValue, this.cont.offsetHeight,this.cont.offsetWidth).Y + 'px';
        console.log(this.shiftX, this.shiftY);
    }

    movePic(){
        let x = this.xSpeed;
        let y = this.ySpeed;


        if (x == 0 && y == 0) return;
        this.cont.style.left = this.cont.offsetLeft + x +'px';
        this.cont.style.top = this.cont.offsetTop + y +'px';
    }


    scalePic (){
        if (this.scaleSpeed == 0) return;
        if (this.scaleSpeed < 0 && (this.cont.offsetHeight<40 || this.cont.offsetWidth<40) ) return  //мин. размеры картинки

        let x = this.scaleSpeed;
        this.cont.style.height = this.cont.offsetHeight + x +'px';
        this.cont.style.width = this.cont.offsetWidth + x*this.effW +'px';
        this.cont.style.left = this.cont.offsetLeft - x/2 +'px';
        this.cont.style.top = this.cont.offsetTop - x*this.effW/2 +'px';
        this.picture.style.fontSize = this.cont.offsetHeight*0.8+'px';
    }


    rotatePic(){
        let alfa = this.transformValue;
        if (this.rotateSpeed == 0) return;

        alfa=alfa + this.rotateSpeed;
        if (alfa >= 360) alfa=alfa-360;
        if (alfa <= -360) alfa=alfa+360;

        this.transformValue = alfa;
        this.cont.style.transform='rotatez('+ this.transformValue +'deg)';
    }

  /*  upPictOpacity() {
        if (this.opacityValue >= 1) return
        this.opacityValue = this.opacityValue+0.1;
        this.picture.style.opacity = this.opacityValue;
    }

    downPictOpacity() {
        if (this.opacityValue <= 0.5) return
        this.opacityValue = this.opacityValue-0.1;
        this.picture.style.opacity = this.opacityValue;
    }*/


    opacityMobile(x1,y1,x2,y2) {
        let d1 = Math.sqrt((this.downX1-this.downX2)*(this.downX1-this.downX2) + (this.downY1-this.downY2)*(this.downY1-this.downY2));
        let d2 = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
        let delta = (d2 - d1)/5; //изменения будут при разнице 5 пикс.

        this.opacityValue=this.opacityValue + delta*0.1;

        if (this.opacityValue >= 1)  this.opacityValue = 1;
        if (this.opacityValue <= 0.5)  this.opacityValue = 0.5;

        this.picture.style.opacity=this.opacityValue;
    }

    getElementPos(elem) {
        const bbox = elem.getBoundingClientRect();
        return {
            left: bbox.left + window.pageXOffset,
            top: bbox.top + window.pageYOffset,
            width: bbox.right -  bbox.left,
            height: bbox.bottom - bbox.top
        };
    
    }

    deltaTop (alfa2,h,w) {   //расчет смещений при повороте на угол
        let l = Math.sqrt(h*h+w*w)/2;
        let alfa1 = Math.atan(h/w);
        let alfa3 = Math.atan(w/h);
        let c1 = 1, c2 = 1;
        if (alfa2 < 0 || alfa2 > 180) c1 = -1;
        if (alfa2 > 90 && alfa2 < 270) c2 = -1;
        if (alfa2 < -90) c2 = -1;
        if (alfa2 < -180) c1 = 1;
        alfa2=(alfa2)*Math.PI/180;
        return {
            X: l*(-Math.sin(alfa3) + Math.sin(c2*alfa3+c1*alfa2)),
            Y: l*(-Math.sin(alfa1) + Math.sin(c2*alfa1+c1*alfa2))
        };
    }
    
    

}


export default ActionContainer;