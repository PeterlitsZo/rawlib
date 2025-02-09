import { onMount } from 'solid-js';
import { stdWrapperCtx } from '@rawlib/std-wrapper';
import * as rr from '@rawlib/render';

import { Page, PageNo } from '@/components/Page';

import Section01Text from './Section01.mdx';

function Section01Preview() {
  let canvasRef = null as HTMLCanvasElement | null;
  onMount(() => {
    if (canvasRef === null) {
      return;
    }

    // The wrapper to talk with the standard canvas API and DOM element.
    const ctx = stdWrapperCtx(canvasRef);

    // We need to define the layer and add some shapes to it, then draw it.
    const layer = rr.layer(ctx);
    const rect = rr.rect({
      left: (layer.width() - 100) / 2,
      top: (layer.height() - 100) / 2,
      width: 100,
      height: 100,
      fillStyle: 'black',
    });
    layer.add(rect);

    layer.onLayoutChanged(() => {
      rect
        .left((layer.width() - 100) / 2)
        .top((layer.height() - 100) / 2)
    })
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

interface Section01Props {
  setActive: (active: PageNo) => void;
}

function Section01(props: Section01Props) {
  return (
    <Page
      text={<Section01Text />}
      preview={<Section01Preview />}
      active={1}
      setActive={props.setActive}
    />
  )
}

export default Section01;
