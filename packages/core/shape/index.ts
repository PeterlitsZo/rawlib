import type { Layer } from "../layer";

export interface Shape {
  draw(layer: Layer): void;
}
