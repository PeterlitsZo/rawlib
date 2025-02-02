import type { Shape } from ".";
import type { Layer } from "../layer";
import { Layout, type LayoutSimple } from "../layout";
import type { Parent } from "../parent";
import type { Pos } from "../position";
import { calcLeftBottomXAndY, getVal, type ValGetter } from "../utils";

export interface RectShapeOpts {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  position?: Pos;
}

export class RectShape implements Shape {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  position?: Pos;
  layout?: Layout;
  firstDraw: boolean;

  parent?: Parent;

  constructor(opts: RectShapeOpts) {
    this.width = opts.width;
    this.height = opts.height;
    this.fillStyle = opts.fillStyle;
    this.position = opts.position;
    this.firstDraw = true;
  }

  calc(parent: Parent) {
    let p = () => (this.position ?? {
      anchor: 'c',
      point: () => {
        const parentLayout = parent.getLayout();
        if (parentLayout === undefined) {
          throw new Error('parent.layout is undefined');
        }
        return parentLayout.c();
      },
    });
    const w = getVal(this.width);
    const h = getVal(this.height);
    let { x, y } = calcLeftBottomXAndY(p(), w, h);
    return {
      layout: new Layout(x, x + w, y - h, y),
      recalcLayout: () => {
        const w = getVal(this.width);
        const h = getVal(this.height);
        let { x, y } = calcLeftBottomXAndY(p(), w, h);
        this.layout = new Layout(x, x + w, y - h, y);
      }
    }
  }

  getLayout(): Layout {
    return this.layout ?? this.calc(this.parent!).layout;
  }

  getLayoutSimple(): LayoutSimple {
    return {
      width: () => {
        return getVal(this.width);
      },
      height: () => {
        return getVal(this.height);
      },
    }
  }

  setParent(parent: Parent) {
    this.parent = parent;
  }

  setPosition(position: Pos) {
    this.position = position;
  }

  draw(layer: Layer) {
    const ctx = layer.ctx;

    if (this.firstDraw) {
      this.firstDraw = false;

      const { layout, recalcLayout } = this.calc(this.parent!);
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