import Moveable from 'moveable';
import Selecto from 'selecto';

export function dragRotateScale () {

  const container = document.querySelector('.sheet__container');
  const frameMap = new Map();
  let targets = [];

  const selecto = new Selecto({
    container,
    dragContainer: '.sheet__container',
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


  selecto.on('dragStart', e => {
    const target = e.inputEvent.target;
    if (
      moveable.isMoveableElement(target)
      || targets.some(t => t === target || t.contains(target))
    ) {
      e.stop();
    }
  }).on('select', e => {
    targets = e.selected;
    moveable.target = targets;
  }).on('selectEnd', e => {
    if (e.isDragStart) {
      e.inputEvent.preventDefault();

      setTimeout(() => {
        moveable.dragStart(e.inputEvent);
      });
    }
  });
}
