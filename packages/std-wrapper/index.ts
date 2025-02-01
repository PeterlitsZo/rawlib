export class StdWrapperCtx {
  canvasRef: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;

  width: number;
  height: number;
  dpr: number;

  resizeObserver: ResizeObserver;

  widthAndHeightChangedCallbacks: Array<(width: number, height: number) => void>;

  constructor(canvasRef: HTMLCanvasElement) {
    // Init the canvasRef and canvasCtx.
    this.canvasRef = canvasRef;
    let canvasCtx = this.canvasRef.getContext('2d');
    if (canvasCtx === null) {
      throw new Error('cannot get the 2d context of canvas');
    }
    this.canvasCtx = canvasCtx;

    // Init the width, height and dpr.
    this.width = this.canvasRef.offsetWidth;
    this.height = this.canvasRef.offsetHeight;
    this.dpr = window.devicePixelRatio;

    // Init others.
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;

        this.width = w;
        this.height = h;
        this.canvasRef.width = this.width * this.dpr;
        this.canvasRef.height = this.height * this.dpr;

        for (const cb of this.widthAndHeightChangedCallbacks) {
          cb(this.width, this.height);
        }
      }
    });
    this.resizeObserver.observe(this.canvasRef);
    this.widthAndHeightChangedCallbacks = [];

    // Set the width and height of canvasRef.
    this.canvasRef.width = this.width * this.dpr;
    this.canvasRef.height = this.height * this.dpr;
  }

  beforeDraw() {
    this.canvasCtx.reset();
    this.canvasCtx.scale(this.dpr, this.dpr);
  }
  afterDraw() {}

  reset() { this.canvasCtx.reset(); }

  save() { this.canvasCtx.save(); }
  restore() { this.canvasCtx.restore(); }

  setFillStyle(fillStyle: string) { this.canvasCtx.fillStyle = fillStyle; }

  fillRect(x: number, y: number, width: number, height: number) {
    this.canvasCtx.fillRect(x, y, width, height);
  }

  getWidth() { return this.width; }
  getHeight() { return this.height; }

  onWidthAndHeightChanged(cb: (width: number, height: number) => void) {
    this.widthAndHeightChangedCallbacks.push(cb);
  }
}