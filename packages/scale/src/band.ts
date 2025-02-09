import type { GetSetter } from "@rawlib/core";

export interface Band {
  (name: string): number;

  domain: GetSetter<string[], Band>;
  range: GetSetter<[number, number], Band>;
  bandwidth: GetSetter<number, Band>;
}

export function band() {
  let domain = [] as Array<string>;
  let range = undefined as [number, number] | undefined;
  let bandwidth = undefined as number | undefined;

  const band = (name: string) => {
    const i = domain.indexOf(name);
    const gap = ((range![1] - range![0]) - (domain.length * bandwidth!)) / (domain.length - 1);
    return range![0] + i * (bandwidth! + gap);
  };

  band.domain = function (_?: string[]) {
    return arguments.length ? (domain = _!, band) : domain;
  }
  band.range = function (_?: [number, number]) {
    return arguments.length ? (range = _!, band) : range;
  }
  band.bandwidth = function (_?: number) {
    return arguments.length ? (bandwidth = _!, band) : bandwidth;
  }

  return band as Band;
}