import { onMount } from 'solid-js';
import { stdWrapperCtx } from '@rawlib/std-wrapper';
import * as rr from '@rawlib/render';
import * as rs from '@rawlib/scale';
import { Point } from '@rawlib/core';

import { Page, PageNo } from '@/components/Page';
import Section03Text from './Section03.mdx';

function Section03Preview() {
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

    // The frame shape.
    let frameWidth = () => Math.min(400, layer.width() - 20);
    let frameHeight = () => Math.min(200, layer.height() - 20);
    const frame = rr.rect({
      left: (layer.width() - frameWidth()) / 2,
      top: (layer.height() - frameHeight()) / 2,
      width: frameWidth(),
      height: frameHeight(),
      fillStyle: '#ccc3',
    });
    layer.add(frame);

    // The bars.
    const data = [0.50, 0.75, 0.25, 1.00, 0.25, 0.75, 0.65, 1.00];
    const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const band = rs.band()
      .domain(names)
      .range([(layer.width() - frameWidth()) / 2, (layer.width() + frameWidth()) / 2])
      .bandwidth(25);
    names.forEach((name, i) => {
      const bar = rr.rect({
        left: band(name),
        top: (layer.height() + frameHeight()) / 2 - (frameHeight() * data[i]),
        width: 25,
        height: (frameHeight() * data[i]),
        fillStyle: 'hotpink',
      });
      layer.add(bar);
    });

    // [0.50, 0.75, 0.25, 1.00, 0.25, 0.75, 0.65, 1.00].forEach((i) => {
    //   frame.add(new RectShape({
    //     width: 25,
    //     height: () => (frameHeight() * i),
    //     fillStyle: 'hotpink',
    //   }));
    // })
    // layer.add(frame);

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

function Section03(props: Section02Props) {
  return (
    <Page
      text={<Section03Text />}
      preview={<Section03Preview />}
      active={3}
      setActive={props.setActive}
    />
  )
}

export default Section03;
