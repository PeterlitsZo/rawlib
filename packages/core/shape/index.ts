import type { Layer } from "../layer";
import type { Layout, LayoutSimple } from "../layout";
import type { Parent } from "../parent";
import type { Pos } from "../position";

export interface Shape {
  /** Get the layout. */
  getLayout(): Layout;

  /** Get the simple layout. */
  getLayoutSimple(): LayoutSimple;

  /** Set the parent. */
  setParent(parent: Parent): void;

  /** Set the position. */
  setPosition(position: Pos): void;

  /** Draw on the layer. */
  draw(layer: Layer): void;
}
