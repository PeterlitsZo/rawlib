import type { Layer } from "../layer";
import { Layout } from "../layout";
import type { Position } from "../position";
import { calcLeftBottomXAndY, getVal, type ValGetter } from "../utils";

export interface RectShapeOpts {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  position?: Position;
}

export class RectShape {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  position?: Position;
  layout?: Layout;
  firstDraw: boolean;

  constructor(opts: RectShapeOpts) {
    this.width = opts.width;
    this.height = opts.height;
    this.fillStyle = opts.fillStyle;
    this.position = opts.position;
    this.firstDraw = true;
  }

  calc(parent: Layer, position?: Position) {
    let p = position ?? {
      anchor: 'c',
      point: () => parent.layout.c(),
    };
    const w = getVal(this.width);
    const h = getVal(this.height);
    let { x, y } = calcLeftBottomXAndY(p, w, h);
    return {
      layout: new Layout(x, x + w, y - h, y),
      recalcLayout: () => {
        const w = getVal(this.width);
        const h = getVal(this.height);
        let { x, y } = calcLeftBottomXAndY(p, w, h);
        this.layout = new Layout(x, x + w, y - h, y);
      }
    }
  }

  draw(layer: Layer) {
    const ctx = layer.ctx;

    if (this.firstDraw) {
      this.firstDraw = false;

      const { layout, recalcLayout } = this.calc(layer, this.position);
      this.layout = layout;
      layer.onWidthAndHeightChanged(() => {
        recalcLayout();
      })
    }

    const layout = this.layout!;

    ctx.save();
    ctx.setFillStyle(getVal(this.fillStyle));
    ctx.fillRect(layout.left, layout.top, layout.width(), layout.height());
    ctx.restore();
  }
}