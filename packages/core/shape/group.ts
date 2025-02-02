import type { Shape } from ".";
import type { Layer } from "../layer";
import { Layout } from "../layout";
import type { Parent } from "../parent";
import type { Pos } from "../position";

export class GroupShape implements Shape {
  shapes: Array<Shape>;

  parent?: Parent;

  constructor() {
    this.shapes = [];
  }

  clear() {
    this.shapes = [];
  }

  add(shape: Shape) {
    this.shapes.push(shape);
    shape.setParent(this);
  }

  getLayout(): Layout {
    if (this.shapes.length <= 0) {
      return new Layout(0, 0, 0, 0);
    }
    let { left, right, top, bottom } = this.shapes[0].getLayout();
    for (let i = 1; i < this.shapes.length; i++) {
      const layout = this.shapes[i].getLayout();
      left = Math.min(left, layout.left);
      right = Math.max(right, layout.right);
      top = Math.min(top, layout.top);
      bottom = Math.max(bottom, layout.bottom);
    }
    return new Layout(left, right, top, bottom);
  }

  getLayoutSimple() {
    return this.getLayout();
  }

  setParent(parent: Parent) {
    this.parent = parent;
  }

  setPosition(position: Pos) {
    // Do nothing here.
  }

  draw(layer: Layer) {
    for (const shape of this.shapes) {
      shape.draw(layer);
    }
  }
}