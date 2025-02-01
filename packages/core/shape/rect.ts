import type { Layer } from "../layer";
import { Layout } from "../layout";
import type { Position } from "../position";
import { calcLeftBottomXAndY } from "../utils";

export interface RectShapeOpts {
  width: number;
  height: number;
  fillStyle: string;

  position?: Position;
}

export class RectShape {
  width: number;
  height: number;
  fillStyle: string;

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
    let { x, y } = calcLeftBottomXAndY(p, this.width, this.height);
    return {
      layout: new Layout(x, x + this.width, y - this.height, y),
      recalcLayout: () => {
        let { x, y } = calcLeftBottomXAndY(p, this.width, this.height);
        this.layout = new Layout(x, x + this.width, y - this.height, y);
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

    ctx.save();
    ctx.setFillStyle(this.fillStyle);
    ctx.fillRect(this.layout!.left, this.layout!.top, this.width, this.height);
    ctx.restore();
  }
}