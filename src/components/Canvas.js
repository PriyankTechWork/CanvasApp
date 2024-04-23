import React, { useEffect, useRef, useState } from "react";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  let [startX, setStartX] = useState(null);
  let [startY, setStartY] = useState(null);
  let [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight - 10}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineWidth = props.strokeWidth;
    contextRef.current = context;
  }, [props.strokeColor, props.strokeWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    setStartX(x);
    setStartY(y);

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);

    setSnapshot(
      contextRef.current.getImageData(
        0,
        0,
        window.innerWidth * 2,
        window.innerHeight * 2
      )
    );

    setIsDrawing(props.drawing);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const drawRect = (x, y) => {
    if (!props.fill) {
      return contextRef.current.strokeRect(x, y, startX - x, startY - y);
    }
    contextRef.current.fillRect(x, y, startX - x, startY - y);
  };

  const drawCircle = (x, y) => {
    contextRef.current.beginPath();
    let radisu = Math.sqrt((Math.pow(startX - x), 2) + Math.pow(startY - y, 2));
    contextRef.current.arc(x, y, radisu, 0, 2 * Math.PI);
    !props.fill ? contextRef.current.stroke() : contextRef.current.fill();
  };

  const drawTriangle = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    contextRef.current.lineTo(startX * 2 - x, y);
    contextRef.current.closePath();
    !props.fill ? contextRef.current.stroke() : contextRef.current.fill();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    contextRef.current.strokeStyle = props.strokeColor;
    contextRef.current.fillStyle = props.strokeColor;

    contextRef.current.putImageData(snapshot, 0, 0);

    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    if (props.shape) {
      if (props.shape === "rectangle") {
        drawRect(x, y);
      } else if (props.shape === "circle") {
        drawCircle(x, y);
      } else {
        drawTriangle(x, y);
      }
    } else {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    }
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}
