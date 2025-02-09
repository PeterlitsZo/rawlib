import type { Context, ContextLayout } from '@rawlib/core';

export function stdWrapperCtx(canvasRef: HTMLCanvasElement): Context {
  // Init the canvasRef and canvasCtx.
  const canvasCtx = canvasRef.getContext('2d');
  if (canvasCtx === null) {
    throw new Error('failed to get 2D context');
  }

  // Init the width, height and dpr.
  let width = canvasRef.offsetWidth;
  let height = canvasRef.offsetHeight;
  const dpr = window.devicePixelRatio;

  // Set the width and height of canvasRef.
  /** Update the canvas layout if needed.  Return `true` if updated. */
  function updateCanvasLayout(): boolean {
    if (canvasRef.width === width * dpr && canvasRef.height === height * dpr) {
      return false;
    }
    canvasRef.width = width * dpr;
    canvasRef.height = height * dpr;
    return true;
  }
  updateCanvasLayout();

  // Init others.
  const layoutChangedCallbacks: Array<(layout: ContextLayout) => void> = [];
  let resizeObserver = new ResizeObserver(([entry]) => {
    ({ width, height } = entry.contentRect);
    if (updateCanvasLayout()) {
      layoutChangedCallbacks.forEach(cb => cb({ width, height }));
    }
  })
  resizeObserver.observe(canvasRef);

  return {
    beforeDraw: () => {
      canvasCtx.reset();
      canvasCtx.scale(dpr, dpr);
    },
    afterDraw: () => {},

    reset: canvasCtx.reset.bind(canvasCtx),

    save: canvasCtx.save.bind(canvasCtx),
    restore: canvasCtx.restore.bind(canvasCtx),

    setFillStyle: (fillStyle: string) => { canvasCtx.fillStyle = fillStyle; },
    setStrokeStyle: (strokeStyle: string) => { canvasCtx.strokeStyle = strokeStyle; },

    fillRect: canvasCtx.fillRect.bind(canvasCtx),

    beginPath: canvasCtx.beginPath.bind(canvasCtx),
    moveTo: canvasCtx.moveTo.bind(canvasCtx),
    lineTo: canvasCtx.lineTo.bind(canvasCtx),
    stroke: canvasCtx.stroke.bind(canvasCtx),

    width: () => width,
    height: () => height,

    onLayoutChanged: (cb: (layout: ContextLayout) => void) => {
      layoutChangedCallbacks.push(cb);
    },
  }
}