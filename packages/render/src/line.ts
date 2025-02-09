import type { Context, Point, GetSetter } from '@rawlib/core';
import type { Parent } from './parent';

export interface LineOpts {
  from: Point,
  to: Point,
  strokeStyle: string,
}

export interface Line {
  typ: 'line';

  (ctx: Context): void;

  parent: GetSetter<Parent | undefined, Line>;
  from: GetSetter<Point, Line>;
  to: GetSetter<Point, Line>;
  strokeStyle: GetSetter<string, Line>;
}

export function line(opts: LineOpts) {
  function line(ctx: Context) {
    ctx.save();
    ctx.setStrokeStyle(opts.strokeStyle);
    ctx.beginPath();
    ctx.moveTo(opts.from.x, opts.from.y);
    ctx.lineTo(opts.to.x, opts.to.y);
    ctx.stroke();
    ctx.restore();
  }

  let parent: Parent | undefined = undefined;

  line.typ = 'line' as const;

  line.parent = function (_?: Parent) {
    return arguments.length ? (parent = _!, line) : parent;
  }
  line.to = function (_?: Point) {
    return arguments.length ? (opts.to = _!, line) : opts.to;
  }
  line.from = function (_?: Point) {
    return arguments.length ? (opts.from = _!, line) : opts.from;
  }
  line.strokeStyle = function (_?: string) {
    return arguments.length ? (opts.strokeStyle = _!, line) : opts.strokeStyle
  }

  return line as Line;
}