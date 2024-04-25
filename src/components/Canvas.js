import React, { useState, useRef } from "react";

import style from "../style/sidebar.module.css";

export default function Sidebar() {
  const [stroke, setStroke] = useState("black");
  const [width, setWidth] = useState(4);
  const [draw, setDraw] = useState(true);
  const [shape, setShape] = useState(null);
  const [fill, setFill] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [eraserWidth, setEraserWidth] = useState(4);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  let [startX, setStartX] = useState(null);
  let [startY, setStartY] = useState(null);
  let [snapshot, setSnapshot] = useState(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight - 10}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    setStartX(x);
    setStartY(y);

    contextRef.current.beginPath();
    contextRef.current.lineWidth = width;
    contextRef.current.strokeStyle = stroke;
    contextRef.current.fillStyle = stroke;
    contextRef.current.moveTo(x, y);

    setSnapshot(
      contextRef.current.getImageData(
        0,
        0,
        window.innerWidth * 2,
        window.innerHeight * 2
      )
    );
    setIsDrawing(draw);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const drawRect = (x, y) => {
    if (!fill) {
      return contextRef.current.strokeRect(x, y, startX - x, startY - y);
    }
    contextRef.current.fillRect(x, y, startX - x, startY - y);
  };

  const drawCircle = (x, y) => {
    contextRef.current.beginPath();
    let radisu = Math.sqrt((Math.pow(startX - x), 2) + Math.pow(startY - y, 2));
    contextRef.current.arc(x, y, radisu, 0, 2 * Math.PI);
    !fill ? contextRef.current.stroke() : contextRef.current.fill();
  };

  const drawTriangle = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    contextRef.current.lineTo(startX * 2 - x, y);
    contextRef.current.closePath();
    !fill ? contextRef.current.stroke() : contextRef.current.fill();
  };

  const drawLine = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(x, y);
    // contextRef.current.lineTo(startX * 2 - x, startY * 2 - y);
    // contextRef.current.closePath();
    contextRef.current.stroke();
  };

  const drawcanvas = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    contextRef.current.putImageData(snapshot, 0, 0);

    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    if (shape) {
      if (shape === "rectangle") {
        drawRect(x, y);
      } else if (shape === "circle") {
        drawCircle(x, y);
      } else if (shape === "line") {
        drawLine(x, y);
      } else {
        drawTriangle(x, y);
      }
    } else {
      contextRef.current.strokeStyle = eraser ? "#fff" : stroke;
      contextRef.current.lineWidth = eraser ? eraserWidth : width;
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    }
  };

  return (
    <>
      <div className={style.container}>
        <div
          onClick={() => {
            setDraw(false);
          }}
        >
          <i className="fa-solid fa-arrow-pointer"></i>
        </div>
        <div
          className={style.pallet}
          id={style.pallet}
          onClick={() => {
            setDraw(true);
            setShape(null);
            setEraser(false);
          }}
        >
          <i className="fa-solid fa-pen"></i>
          <ul className={style.colorPallette} id={style.pointerId}>
            <li
              onClick={() => {
                setWidth(2);
              }}
            >
              <span
                className={style.pointer}
                id={style.p1}
                style={{ background: stroke }}
              ></span>
            </li>
            <li
              onClick={() => {
                setWidth(4);
              }}
            >
              <span
                className={style.pointer}
                id={style.p2}
                style={{ background: stroke }}
              ></span>
            </li>
            <li
              onClick={() => {
                setWidth(8);
              }}
            >
              <span
                className={style.pointer}
                id={style.p3}
                style={{ background: stroke }}
              ></span>
            </li>
            <li
              onClick={() => {
                setWidth(16);
              }}
            >
              <span
                className={style.pointer}
                id={style.p4}
                style={{ background: stroke }}
              ></span>
            </li>
            <li
              onClick={() => {
                setWidth(32);
              }}
            >
              <span
                className={style.pointer}
                id={style.p5}
                style={{ background: stroke }}
              ></span>
            </li>
            <li
              onClick={() => {
                setWidth(40);
              }}
            >
              <span
                className={style.pointer}
                id={style.p6}
                style={{ background: stroke }}
              ></span>
            </li>
          </ul>
        </div>
        <div className={style.pallet} id={style.pallet}>
          <i className="fa-solid fa-palette"></i>

          <ul className={style.colorPallette}>
            <li
              onClick={() => {
                setStroke("black");
              }}
            >
              <span className={style.color} id={style.color1}></span>
            </li>
            <li
              onClick={() => {
                setStroke("rgb(255, 0, 0)");
              }}
            >
              <span className={style.color} id={style.color2}></span>
            </li>
            <li
              onClick={() => {
                setStroke("rgb(0, 255, 98)");
              }}
            >
              <span className={style.color} id={style.color3}></span>
            </li>
            <li
              onClick={() => {
                setStroke("rgb(0, 191, 255)");
              }}
            >
              <span className={style.color} id={style.color4}></span>
            </li>
            <li>
              <input
                type="color"
                className={style.color}
                id={style.color5}
                onChange={(e) => {
                  setStroke(e.target.value);
                }}
              ></input>
            </li>
          </ul>
        </div>
        <div className={style.pallet} id={style.pallet}>
          <i className="fa-solid fa-shapes"></i>

          <ul className={style.colorPallette}>
            <li
              onClick={() => {
                setShape("line");
              }}
            >
              <i className="fa-solid fa-slash"></i>
            </li>
            <li
              onClick={() => {
                setShape("rectangle");
              }}
            >
              <i className="fa-solid fa-square"></i>
            </li>
            <li
              onClick={() => {
                setShape("circle");
              }}
            >
              <i className="fa-solid fa-circle"></i>
            </li>
            <li
              onClick={() => {
                setShape("triangle");
              }}
            >
              <i
                className="fa-solid fa-play"
                style={{ transform: "rotate(-90deg)" }}
              ></i>
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            if (fill === false) setFill(true);
            else setFill(false);
          }}
        >
          <i className="fa-solid fa-fill-drip"></i>
        </div>
        <div
          className={style.pallet}
          id={style.pallet}
          onClick={() => {
            setEraser(true);
            setShape(null);
          }}
        >
          <i className="fa-solid fa-eraser"></i>
          <ul className={style.colorPallette} id={style.eraserId}>
            <li
              onClick={() => {
                setEraserWidth(2);
              }}
            >
              <span className={style.pointer} id={style.p1}></span>
            </li>
            <li
              onClick={() => {
                setEraserWidth(4);
              }}
            >
              <span className={style.pointer} id={style.p2}></span>
            </li>
            <li
              onClick={() => {
                setEraserWidth(8);
              }}
            >
              <span className={style.pointer} id={style.p3}></span>
            </li>
            <li
              onClick={() => {
                setEraserWidth(16);
              }}
            >
              <span className={style.pointer} id={style.p4}></span>
            </li>
            <li
              onClick={() => {
                setEraserWidth(32);
              }}
            >
              <span className={style.pointer} id={style.p5}></span>
            </li>
            <li
              onClick={() => {
                setEraserWidth(40);
              }}
            >
              <span className={style.pointer} id={style.p6}></span>
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            window.location.reload();
          }}
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </div>
      </div>

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawcanvas}
        ref={canvasRef}
        style={{ marginTop: "5px", backgroundColor: "#fff" }}
      />
    </>
  );
}
