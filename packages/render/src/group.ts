import type { Context, GetSetter } from "@rawlib/core";
import type { Obj } from "./obj";
import type { Parent } from "./parent";

export interface GroupOpts {}

export interface Group {
  typ: 'group';

  (ctx: Context): void;

  parent: GetSetter<Parent | undefined, Group>;

  clear(): void;
  add(obj: Obj): void;
}

export function group() {
  let objs = [] as Array<Obj>;

  function group(ctx: Context) {
    objs.forEach(obj => obj(ctx));
  }

  let parent: Parent | undefined = undefined;

  group.typ = 'group' as const;

  group.parent = function (_?: Parent) {
    return arguments.length ? (parent = _!, group) : parent;
  }

  group.clear = function() {
    objs = [];
  }
  group.add = function(obj: Obj) {
    obj.parent(group);
    objs.push(obj);
  }

  return group as Group;
}