import type { Shape } from ".";
import type { Layer } from "../layer";

export class GroupShape {
  shapes: Array<Shape>;

  constructor() {
    this.shapes = [];
  }

  clear() {
    this.shapes = [];
  }

  add(shape: Shape) {
    this.shapes.push(shape);
  }

  draw(layer: Layer) {
    for (const shape of this.shapes) {
      shape.draw(layer);
    }
  }
}