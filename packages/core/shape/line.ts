import type { Shape } from ".";
import type { Layer } from "../layer";
import { Layout } from "../layout";
import type { Parent } from "../parent";
import type { Point } from "../point";
import type { Pos } from "../position";
import { getVal, type ValGetter } from "../utils";

export interface LineShapeOpts {
  from: ValGetter<Point>;
  to: ValGetter<Point>;
  strokeStyle: ValGetter<string>;
}

export class LineShape implements Shape {
  strokeStyle: ValGetter<string>;

  from: ValGetter<Point>;
  to: ValGetter<Point>;

  parent?: Parent;

  constructor(opts: LineShapeOpts) {
    this.strokeStyle = opts.strokeStyle;
    this.from = opts.from;
    this.to = opts.to;
  }

  getLayout(): Layout {
    const from = getVal(this.from);
    const to = getVal(this.to);

    return new Layout(
      Math.min(from.x, to.x),
      Math.max(from.x, to.x),
      Math.min(from.y, to.y),
      Math.max(from.y, to.y),
    );
  }

  getLayoutSimple() {
    return this.getLayout();
  }

  setParent(parent: Parent) {
    this.parent = parent;
  }

  setPosition(position: Pos) {
    // Do nothing now.
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