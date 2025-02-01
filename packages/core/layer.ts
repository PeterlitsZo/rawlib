import { type Context } from "./context";
import { Layout } from "./layout";
import { type Shape } from "./shape";

export class Layer {
  ctx: Context;

  layout: Layout;

  needDraw: boolean;
  shapes: Array<Shape>;

  widthAndHeightChangedCallbacks: Array<() => void>;

  constructor(ctx: Context) {
    this.ctx = ctx;
    this.ctx.onWidthAndHeightChanged((w, h) => {
      this.layout = new Layout(0, w, 0, h);
      for (const cb of this.widthAndHeightChangedCallbacks) {
        cb();
      }
      if (this.needDraw) {
        this.draw();
      }
    })

    this.layout = new Layout(0, this.ctx.getWidth(), 0, this.ctx.getHeight());

    this.needDraw = false;
    this.shapes = [];

    this.widthAndHeightChangedCallbacks = [];
  }

  add(shape: Shape) {
    this.shapes.push(shape);
  }

  draw() {
    this.needDraw = true;

    this.ctx.beforeDraw();
    for (const shape of this.shapes) {
      shape.draw(this);
    }
    this.ctx.afterDraw();
  }

  onWidthAndHeightChanged(cb: () => void) {
    this.widthAndHeightChangedCallbacks.push(cb);
  }
}