import { point } from "./point";

interface LayoutOpts {
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export function layout(opts: LayoutOpts) {
  return {
    left() { return opts.left },
    right() { return opts.right },
    top() { return opts.top },
    bottom() { return opts.bottom },

    width() { return opts.right - opts.left },
    height() { return opts.bottom - opts.top },

    centerX() { return this.left() + this.width() / 2; },
    centerY() { return this.top() + this.height() / 2; },
  
    lt() { return point(this.left(), this.top()); },
    rt() { return point(this.right(), this.top()); },
    lb() { return point(this.left(), this.bottom()); },
    rb() { return point(this.right(), this.bottom()); },
  
    t() { return point(this.centerX(), this.top()); },
    l() { return point(this.left(), this.centerY()); },
    r() { return point(this.right(), this.centerY()); },
    b() { return point(this.centerX(), this.bottom()); },
  
    c() { return point(this.centerX(), this.centerY()); },
  }
}

export type Layout = ReturnType<typeof layout>;