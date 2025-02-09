import { Page, PageNo } from '@/components/Page';
import Section02Text from './Section02.mdx';
import { onMount } from 'solid-js';
import { stdWrapperCtx } from '@rawlib/std-wrapper';
import * as rr from '@rawlib/render';
import { Point } from '@rawlib/core';

function Section02Preview() {
  let canvasRef = null as HTMLCanvasElement | null;
  onMount(() => {
    if (canvasRef === null) {
      return;
    }

    const ctx = stdWrapperCtx(canvasRef);
    const layer = rr.layer(ctx);

    // Some lines.
    const linesGroup = rr.group();
    const initLinesGroup = () => {
      linesGroup.clear();

      // The grid helper function.
      const addGridLines = (
        fromBasic: Point,
        toBasic: Point,
        dx: (i: number) => number,
        dy: (i: number) => number,
        needBreak: (from: Point, to: Point) => boolean,
      ) => {
        for (let i = 1; ; i++) {
          const from = fromBasic.shift(dx(i), dy(i));
          const to = toBasic.shift(dx(i), dy(i));
          if (needBreak(from, to)) {
            break;
          }
          
          let strokeStyle = '#eee';
          if (i % 4 === 0) {
            strokeStyle = '#ddd';
          }
          const line = rr.line({
            from: from,
            to: to,
            strokeStyle,
          });
          linesGroup.add(line);
        }
      };

      // Init the grid.
      addGridLines(
        layer.layout().l(), layer.layout().r(),
        _ => 0, i => i * 25,
        (from, _to) => from.y > layer.layout().b().y,
      );
      addGridLines(
        layer.layout().l(), layer.layout().r(),
        _ => 0, i => -i * 25,
        (from, _to) => from.y < layer.layout().t().y,
      )
      addGridLines(
        layer.layout().t(), layer.layout().b(),
        i => i * 25, _ => 0,
        (from, _to) => from.x > layer.layout().r().x,
      );
      addGridLines(
        layer.layout().t(), layer.layout().b(),
        i => -i * 25, _ => 0,
        (from, _to) => from.x < layer.layout().l().x,
      );

      // Init the X and Y axis.
      const xAxis = rr.line({
        from: layer.layout().l(),
        to: layer.layout().r(),
        strokeStyle: '#ccc',
      });
      const yAxis = rr.line({
        from: layer.layout().t(),
        to: layer.layout().b(),
        strokeStyle: '#ccc',
      });
      linesGroup.add(xAxis);
      linesGroup.add(yAxis);
    }
    initLinesGroup();
    layer.onLayoutChanged(initLinesGroup);
    layer.add(linesGroup);

    // The rectangle shape.
    const rect = rr.rect({
      left: (layer.width() - 100) / 2,
      top: (layer.height() - 100) / 2,
      width: 100,
      height: 100,
      fillStyle: 'black',
    });
    layer.onLayoutChanged(() => {
      rect
        .left((layer.width() - 100) / 2)
        .top((layer.height() - 100) / 2)
    })
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

interface Section02Props {
  setActive: (active: PageNo) => void;
}

function Section02(props: Section02Props) {
  return (
    <Page
      text={<Section02Text />}
      preview={<Section02Preview />}
      active={2}
      setActive={props.setActive}
    />
  )
}

export default Section02;
