export function point(x: number, y: number): Point {
  const p = {
    x,
    y,
    shift(dx: number, dy: number): Point {
      return point(this.x + dx, this.y + dy);
    },
  };
  return p;
}

export type Point = {
  x: number;
  y: number;
  shift(dx: number, dy: number): Point;
};