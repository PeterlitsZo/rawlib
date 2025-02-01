import type { Anchor } from "./anchor";
import type { Point } from "./point";

/**
 * Position defines where to put the shape (e.g. Let the shape's center point
 * be at the (x, y)).
 */
export interface Position {
  anchor: Anchor;
  point: Point | (() => Point);
}