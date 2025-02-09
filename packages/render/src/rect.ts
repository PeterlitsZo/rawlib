import type { Context, GetSetter } from '@rawlib/core';
import type { Parent } from './parent';

export interface RectOpts {
  left: number;
  top: number;
  width: number;
  height: number;

  fillStyle: string;
}

export interface Rect {
  typ: 'rect';

  (ctx: Context): void;

  parent: GetSetter<Parent | undefined, Rect>;
  left: GetSetter<number, Rect>;
  top: GetSetter<number, Rect>;
  width: GetSetter<number, Rect>;
  height: GetSetter<number, Rect>;
  fillStyle: GetSetter<string, Rect>;
}

export function rect(opts: RectOpts) {
  function rect(ctx: Context) {
    ctx.save()
    ctx.setFillStyle(opts.fillStyle);
    ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
    ctx.restore();
  };

  let parent: Parent | undefined = undefined;

  rect.typ = 'rect' as const;

  rect.parent = function (_?: Parent) {
    return arguments.length ? (parent = _!, rect) : parent;
  }

  rect.left = function(_?: number) {
    return arguments.length ? (opts.left = _!, rect) : opts.left;
  };
  rect.top = function(_?: number) {
    return arguments.length ? (opts.top = _!, rect) : opts.top;
  };
  rect.width = function(_?: number) {
    return arguments.length ? (opts.width = _!, rect) : opts.width;
  };
  rect.height = function(_?: number) {
    return arguments.length ? (opts.height = _!, rect) : opts.height;
  };
  rect.fillStyle = function(_?: string) {
    return arguments.length ? (opts.fillStyle = _!, rect) : opts.fillStyle;
  };

  return rect as Rect;
}
