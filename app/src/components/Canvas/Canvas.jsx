/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./Canvas.scss";

import { useOnDraw } from "./Hooks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Canvas = ({ width, height, copyRef, style }) => {
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <canvas
      width={width}
      height={height}
      onMouseDown={onCanvasMouseDown}
      style={{ ...canvasStyle, ...style }}
      ref={(e) => setCanvasRef(e, copyRef)}
    />
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
