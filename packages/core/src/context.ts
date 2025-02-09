export interface ContextLayout {
  width: number;
  height: number;
}

export interface Context {
  beforeDraw(): void;
  afterDraw(): void;

  reset(): void;

  save(): void;
  restore(): void;

  setFillStyle(fillStyle: string): void;
  setStrokeStyle(strokeStyle: string): void;
  
  fillRect(x: number, y: number, width: number, height: number): void;

  beginPath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  stroke(): void;

  width(): number;
  height(): number;

  onLayoutChanged(cb: (layout: ContextLayout) => void): void;
}
