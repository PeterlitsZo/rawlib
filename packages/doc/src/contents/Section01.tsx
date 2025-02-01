import { Page } from '@/components/Page';
import Section01Text from './Section01.mdx';
import { onMount } from 'solid-js';
import { StdWrapperCtx } from '@rawlib/std-wrapper';
import { Layer, RectShape } from '@rawlib/core';

function Section01Preview() {
  let canvasRef = null as HTMLCanvasElement | null;
  onMount(() => {
    if (canvasRef === null) {
      return;
    }

    // The wrapper to talk with the standard canvas API and DOM element.
    const ctx = new StdWrapperCtx(canvasRef);

    // We need to define the layer and add some shapes to it, then draw it.
    const layer = new Layer(ctx);
    const rect = new RectShape({
      width: 100,
      height: 100,
      fillStyle: 'black',
    });
    layer.add(rect);
    layer.draw();
  })

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <canvas
        ref={ele => canvasRef = ele}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      />
    </div>
  )
}

function Section01() {
  return (
    <Page
      text={<Section01Text />}
      preview={<Section01Preview />}
    />
  )
}

export default Section01;
