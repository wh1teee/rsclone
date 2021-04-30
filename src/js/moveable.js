import Moveable from 'moveable';
import Selecto from 'selecto';
import { moveableItems } from '../index';

export function startMovable () {
  const container = document.querySelector('.workspace__field');
  const frameMap = new Map();
  let targets = [];

  const selecto = new Selecto({
    container,
    dragContainer: container,
    selectableTargets: ['.sheet__container .moveable'],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ['shift'],
    ratio: 0,
  });

  const moveable = new Moveable(container, {
    draggable: true,
    originDraggable: true,
    originRelative: true,
    rotatable: true,
    scalable: true,
    zoom: 1,
    origin: true,
  })
    .on('clickGroup', e => {
      selecto.clickTarget(e.inputEvent, e.inputTarget);
    })
    .on('dragOriginStart', ({ dragStart, target }) => {
      if (!frameMap.has(target)) {
        frameMap.set(target, {
          translate: [0, 0],
          rotate: 0,
          scale: [1, 1],
          transformOrigin: '50% 50%',
        });
      }

      const frame = frameMap.get(target);
      dragStart && dragStart.set(frame.translate);
    })
    .on('dragOrigin', ({ target, drag, transformOrigin }) => {
      const frame = frameMap.get(target);
      frame.translate = drag.beforeTranslate;
      frame.transformOrigin = transformOrigin;
    })
    .on('dragStart', e => {
      const target = e.target;

      if (!frameMap.has(target)) {
        frameMap.set(target, {
          translate: [0, 0],
          rotate: 0,
          scale: [1, 1],
          transformOrigin: '50% 50%',
        });
      }

      const frame = frameMap.get(target);
      e.set(frame.translate, frame.scale, frame.rotate);
    })
    .on('drag', e => {
      const target = e.target;
      const frame = frameMap.get(target);
      frame.translate = e.beforeTranslate;
    })
    .on('rotateStart', ({ set, target }) => {
      const frame = frameMap.get(target);
      set(frame.rotate, frame.translate);
    })
    .on('rotate', ({ beforeRotate, target }) => {
      const frame = frameMap.get(target);
      frame.rotate = beforeRotate;
    })
    .on('scaleStart', ({ set, dragStart, target }) => {
      const frame = frameMap.get(target);
      set(frame.scale);
      dragStart && dragStart.set(frame.translate);
    })
    .on('scale', ({ target, scale, drag }) => {
      const frame = frameMap.get(target);
      frame.scale = scale;
      frame.translate = drag.beforeTranslate;
    })
    .on('render', ({ target }) => {
      const frame = frameMap.get(target);
      const { translate, rotate, transformOrigin, scale } = frame;
      target.style.transformOrigin = transformOrigin;
      target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
        + ` rotate(${rotate}deg)`
        + `scale(${scale[0]}, ${scale[1]})`;
    })
    .on('dragGroupStart', e => {
      e.events.forEach(ev => {
        const target = ev.target;

        if (!frameMap.has(target)) {
          frameMap.set(target, {
            translate: [0, 0],
            rotate: 0,
            scale: [1, 1],
            transformOrigin: '50% 50%',
          });
        }

        const frame = frameMap.get(target);
        ev.set(frame.translate, frame.scale, frame.rotate);
      });
    })
    .on('dragGroup', e => {
      e.events.forEach(ev => {
        const target = ev.target;
        const frame = frameMap.get(target);

        frame.translate = ev.beforeTranslate;
        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`
          + `rotate(${frame.rotate}deg)`
          + `scale(${frame.scale[0]}, ${frame.scale[1]})`;
      });
    })
    .on('scaleGroupStart', ({ events }) => {
      events.forEach(ev => {
        const target = ev.target;

        if (!frameMap.has(target)) {
          frameMap.set(target, {
            translate: [0, 0],
            rotate: 0,
            scale: [1, 1],
            transformOrigin: '50% 50%',
          });
        }

        const frame = frameMap.get(target);
        ev.set(frame.scale, frame.rotate, frame.translate);
        ev.dragStart && ev.dragStart.set(frame.translate);
      });
    })
    .on('scaleGroup', ({ events }) => {
      events.forEach(ev => {
        const target = ev.target;
        const frame = frameMap.get(target);
        frame.translate = ev.drag.beforeTranslate;
        frame.scale = ev.scale;

        ev.target.style.transform
          = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`
          + `rotate(${frame.rotate}deg)`
          + `scale(${ev.scale[0]}, ${ev.scale[1]})`;
      });
    })
    .on('rotateGroupStart', ({ events }) => {
      events.forEach(ev => {
        const target = ev.target;

        if (!frameMap.has(target)) {
          frameMap.set(target, {
            translate: [0, 0],
            rotate: 0,
            scale: [1, 1],
            transformOrigin: '50% 50%',
          });
        }

        const frame = frameMap.get(target);
        ev.set(frame.rotate, frame.scale, frame.translate);
        ev.dragStart && ev.dragStart.set(frame.translate);
      });
    })
    .on('rotateGroup', ({ events }) => {
      events.forEach(ev => {
        const target = ev.target;
        const frame = frameMap.get(target);
        frame.translate = ev.drag.beforeTranslate;
        frame.rotate = ev.rotate;

        ev.target.style.transform
          = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`
          + ` rotate(${ev.rotate}deg)`
          + `scale(${frame.scale[0]}, ${frame.scale[1]})`;
      });
    });

  selecto.on('dragStart', e => {
    const target = e.inputEvent.target,
      leftPanel = document.querySelector('.workspace__header-left'),
      drawingMenuIcon = document.querySelector('#controls__icons-Drawings');

    if (
      !target.classList.contains('moveable-area')
      && !target.classList.contains('moveable-control')
      && target.tagName !== 'path'
    ) {
      if (target.classList.contains('photo')) {
        leftPanel.innerHTML = ''
      } else {
        leftPanel.innerHTML = `
       <input type='color' id='head' name='head' value='${
          parseColor(window.getComputedStyle(target).backgroundColor).hex
        }'>
        <label for='head' class='form-label'>Color</label>
      `;
      }
    }
    if (checkTypeOfElement(target) === 'other') {
      document.querySelector('#head').addEventListener('input', (e) => {
          target.style.background = `${e.target.value}`;
      });
    }
    if (drawingMenuIcon.classList.contains('active_icon') ||
      moveable.isMoveableElement(target)
      || targets.some(t => t === target || t.contains(target))
    ) {
      e.stop();
    }
  }).on('select', e => {
    targets = e.selected;
    moveable.target = targets;
    targets.forEach(el => {
      const leftPanel = document.querySelector('.workspace__header-left');
      if (el.className.includes('text')) {
        leftPanel.innerHTML = `
<!--        <input id="font__style" type="text">-->
        <label for='fontSize' class='form-label'>Size</label>
        <input class="text__size form-control" name="fontSize" type="number" value="${parseInt(window.getComputedStyle(el).fontSize)}">
        <input type='color' id='head' name='head' value='${parseColor(window.getComputedStyle(el).color).hex}'>
        <label for='head' class='form-label'>Color</label>
        `;
        document.querySelector('.text__size').addEventListener('input', (e) => {
          moveableItems[0].target.forEach(el => {
            if (checkTypeOfElement(el) === 'text') {
              el.style.fontSize = `${e.target.value}px`;
            }
          });
        });
        document.querySelector('#head').addEventListener('input', (e) => {
          moveableItems[0].target.forEach(el => {
            if (checkTypeOfElement(el) === 'text') {
              el.style.color = `${e.target.value}`;
            }
          });
        });
      }
      if (el.className.includes('svg-element')) {
        leftPanel.innerHTML = `
        <input type='color' id='head' name='head' value='#e66465'>
        <label for='head'>Color</label>
        `;
        document.querySelector('#head').addEventListener('input', (e) => {
          moveableItems[0].target.forEach(el => {
            if (checkTypeOfElement(el) === 'svg') {
              const pathOfEl = el.querySelector('path');
              const lineOfEl = el.querySelector('line');
              const gOfEl = el.querySelector('g');
              if (pathOfEl) {
                pathOfEl.style.fill = `${e.target.value}`;
              }
              if (lineOfEl) {
                lineOfEl.style.stroke = `${e.target.value}`;
              }
              if (gOfEl) {
                gOfEl.style.stroke = `${e.target.value}`;
              }
            }
            if (checkTypeOfElement(el) === 'text') {
              el.style.color = `${e.target.value}`;
            }
          });
        });
      }
    });
  }).on('selectEnd', e => {
    if (e.isDragStart) {
      e.inputEvent.preventDefault();

      setTimeout(() => {
        moveable.dragStart(e.inputEvent);
      });
    }
  });
  return [moveable, selecto];
}

function checkTypeOfElement (element) {

  if (
    element.tagName === 'path'
    || element.tagName === 'g'
    || element.tagName === 'line'
    || element.tagName === 'svg'
  ) {
    return 'svg'
  }
  if (element.classList.contains('svg-element')) return 'svg';
  if (element.className.includes('text')) return 'text';
  if (element.classList.contains('moveable-area')) return 'moveable-area';
  if (element.classList.contains('photo')) return 'photo';

  return 'other';
}

function parseColor(color) {
  const arr=[];
  color.replace(/[\d+\.]+/g, function(v) { arr.push(parseFloat(v)); });
  return {
    hex: "#" + arr.slice(0, 3).map(toHex).join(""),
    opacity: arr.length === 4 ? arr[3] : 1
  };
}
function toHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
