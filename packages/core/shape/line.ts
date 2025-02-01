import type { Layer } from "../layer";
import type { Point } from "../point";
import { getVal, type ValGetter } from "../utils";

export interface LineShapeOpts {
  from: ValGetter<Point>;
  to: ValGetter<Point>;
  strokeStyle: ValGetter<string>;
}

export class LineShape {
  strokeStyle: ValGetter<string>;

  from: ValGetter<Point>;
  to: ValGetter<Point>;

  constructor(opts: LineShapeOpts) {
    this.strokeStyle = opts.strokeStyle;
    this.from = opts.from;
    this.to = opts.to;
  }

  draw(layer: Layer) {
    const ctx = layer.ctx;

    const from = getVal(this.from);
    const to = getVal(this.to);

    ctx.save();
    ctx.setStrokeStyle(getVal(this.strokeStyle));
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }
}