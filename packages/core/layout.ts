import { Point } from "./point";

/** Layout defines if the element is draw, where is it. */
export class Layout {
  left: number;
  right: number;
  top: number;
  bottom: number;

  constructor(left: number, right: number, top: number, bottom: number) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  width() { return this.right - this.left; }
  height() { return this.bottom - this.top; }

  centerX() { return this.left + this.width() / 2; }
  centerY() { return this.top + this.height() / 2; }

  lt() { return new Point(this.left, this.top); }
  rt() { return new Point(this.right, this.top); }
  lb() { return new Point(this.left, this.bottom); }
  rb() { return new Point(this.right, this.bottom); }

  t() { return new Point(this.centerX(), this.top); }
  l() { return new Point(this.left, this.centerY()); }
  r() { return new Point(this.right, this.centerY()); }
  b() { return new Point(this.centerX(), this.bottom); }

  c() { return new Point(this.centerX(), this.centerY()); }
}