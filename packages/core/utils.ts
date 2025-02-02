import type { Pos } from "./position";

export function calcLeftBottomXAndY(position: Pos, width: number, height: number) {
  const { x, y } = (() => {
    if (typeof position.point === 'function') {
      return position.point();
    } else {
      return position.point;
    }
  })();

  switch (position.anchor) {
  case 'c':
    return { x: x - width / 2, y: y + height / 2 };

  case 'lt':
    return { x: x, y: y + height };
  case 'rt':
    return { x: x - width, y: y + height };
  case 'lb':
    return { x: x, y: y };
  case 'rb':
    return { x: x - width, y: y };

  case 'b':
    return { x: x - width / 2, y: y };
  case 't':
    return { x: x - width / 2, y: y + height };
  case 'l':
    return { x: x, y: y + height / 2 };
  case 'r':
    return { x: x - width, y: y + height / 2 };
  }
}

/** The pure value or a getter. */
export type ValGetter<T> = T | (() => T);

export function getVal<T>(v: ValGetter<T>): T {
  if (typeof v === 'function') {
    return (v as any)();
  } else {
    return v;
  }
}