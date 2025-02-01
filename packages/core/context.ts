export interface Context {
  beforeDraw(): void;
  afterDraw(): void;

  reset(): void;

  save(): void;
  restore(): void;

  setFillStyle(fillStyle: string): void;
  
  fillRect(x: number, y: number, width: number, height: number): void;

  getWidth(): number;
  getHeight(): number;

  onWidthAndHeightChanged(cb: (width: number, height: number) => void): void;
}
