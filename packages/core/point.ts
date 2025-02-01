/** Yes, a simple point. */
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  shift(dx: number, dy: number): Point {
    return new Point(this.x + dx, this.y + dy);
  }
}