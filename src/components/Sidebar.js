import React from "react";
import Canvas from "./Canvas";

import style from "../style/sidebar.module.css";

export default function Sidebar() {
  const [stroke, setStroke] = React.useState("black");
  const [width, setWidth] = React.useState(3);
  const [draw, setDraw] = React.useState(false);
  const [shape, setShape] = React.useState(null);
  const [fill, setFill] = React.useState(false);

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
          onClick={() => {
            setDraw(true);
            setShape(null);
          }}
        >
          <i class="fa-solid fa-pen"></i>
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
                setStroke("red");
              }}
            >
              <span className={style.color} id={style.color2}></span>
            </li>
            <li
              onClick={() => {
                setStroke("green");
              }}
            >
              <span className={style.color} id={style.color3}></span>
            </li>
            <li
              onClick={() => {
                setStroke("blue");
              }}
            >
              <span className={style.color} id={style.color4}></span>
            </li>
          </ul>
        </div>
        <div className={style.pallet} id={style.pallet}>
          <i className="fa-solid fa-shapes"></i>

          <ul className={style.colorPallette}>
            <li
              onClick={() => {
                setShape("rectangle");
              }}
            >
              <i class="fa-solid fa-square"></i>
            </li>
            <li
              onClick={() => {
                setShape("circle");
              }}
            >
              <i class="fa-solid fa-circle"></i>
            </li>
            <li
              onClick={() => {
                setShape("triangle");
              }}
            >
              <i
                class="fa-solid fa-play"
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
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div>
          <i className="fa-solid fa-eraser"></i>
        </div>
        <div
          onClick={() => {
            window.location.reload();
          }}
        >
          <i class="fa-solid fa-arrows-rotate"></i>
        </div>
      </div>

      <Canvas
        strokeColor={stroke}
        strokeWidth={width}
        drawing={draw}
        shape={shape}
        fill={fill}
      />
    </>
  );
}
