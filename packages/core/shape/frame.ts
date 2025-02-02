import type { Shape } from ".";
import type { Layer } from "../layer";
import { Layout, type LayoutSimple } from "../layout";
import type { Parent } from "../parent";
import type { Pos } from "../position";
import { calcLeftBottomXAndY, getVal, type ValGetter } from "../utils";

export interface FrameShapeOpts {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  position?: Pos;
}

export class FrameShape implements Shape {
  width: ValGetter<number>;
  height: ValGetter<number>;
  fillStyle: ValGetter<string>;

  shapes: Shape[] = [];

  position?: Pos;
  layout?: Layout;

  parent?: Parent;

  firstDraw: boolean;

  constructor(opts: FrameShapeOpts) {
    this.width = opts.width;
    this.height = opts.height;
    this.fillStyle = opts.fillStyle;

    this.position = opts.position;

    this.firstDraw = true;
  }

  add(shape: Shape) {
    this.shapes.push(shape);
  }

  calc(parent: Parent, position?: Pos) {
    let p = position ?? {
      anchor: 'c',
      point: () => {
        const parentLayout = parent.getLayout();
        if (parentLayout === undefined) {
          throw new Error('parent.layout is undefined');
        }
        return parentLayout.c();
      },
    };
    const w = getVal(this.width);
    const h = getVal(this.height);
    let { x, y } = calcLeftBottomXAndY(p, w, h);
    this.calcChildrenPosition();

    return {
      layout: new Layout(x, x + w, y - h, y),
      recalcLayout: () => {
        const w = getVal(this.width);
        const h = getVal(this.height);
        let { x, y } = calcLeftBottomXAndY(p, w, h);
        this.layout = new Layout(x, x + w, y - h, y);
        this.calcChildrenPosition();
      }
    }
  }

  calcChildrenPosition() {
    if (this.shapes.length === 0) {
      return;
    } else if (this.shapes.length === 1) {
      this.shapes[0].setPosition({
        anchor: 'b',
        point: () => this.layout!.b(),
      })
    } else {
      const widths = this.shapes.map(s => s.getLayoutSimple().width());
      const thisWidth = getVal(this.width);
      const gap = (thisWidth - widths.reduce((a, b) => a + b, 0)) / (widths.length - 1);
      console.warn('RECALC', widths, thisWidth, gap);

      this.shapes.forEach((s, i) => {
        if (i === 0) {
          s.setPosition({
            anchor: 'lb',
            point: () => this.layout!.lb(),
          })
        } else {
          const dx = gap * i + widths.slice(0, i).reduce((a, b) => a + b, 0);
          s.setPosition({
            anchor: 'lb',
            point: () => this.layout!.lb().shift(dx, 0),
          })
        }
      })
    }
  }

  getLayout(): Layout {
    return this.layout ?? this.calc(this.parent!, this.position).layout;
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

      const { layout, recalcLayout } = this.calc(this.parent ?? layer, this.position);
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

    for (const shape of this.shapes) {
      shape.draw(layer);
    }
  }
}