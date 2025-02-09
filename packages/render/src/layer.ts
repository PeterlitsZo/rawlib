import { layout, type Context, type Layout } from "@rawlib/core";

import type { Obj } from './obj';

export type Layer = {
  width(): number;
  height(): number;
  layout(): Layout;

  onLayoutChanged(cb: () => void): void;

  add(obj: Obj): void;

  draw(): void;
};

export function layer(ctx: Context): Layer {
  let objs = [] as Array<Obj>;

  const layer ={
    width: ctx.width.bind(ctx),
    height: ctx.height.bind(ctx),
    layout() {
      return layout({
        left: 0,
        right: this.width(),
        top: 0,
        bottom: this.height(),
      });
    },

    onLayoutChanged: ctx.onLayoutChanged.bind(ctx),

    add(obj: Obj) {
      obj.parent(layer);
      objs.push(obj);
    },

    draw() {
      ctx.beforeDraw();
      objs.forEach(obj => obj(ctx));
      ctx.afterDraw();
    },
  };
  ctx.onLayoutChanged(_ => {
    layer.draw();
  })

  return layer;
}