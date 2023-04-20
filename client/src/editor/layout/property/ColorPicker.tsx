import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "editor/editor.module.scss";
import useOutsideClick from "editor/hooks/useOutsideClick";
type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

// Utility function to convert HSB to RGB
function hsbToRgb(h: number, s: number, v: number): [number, number, number] {
  let r, g, b;

  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      throw new Error("Invalid hue");
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
const ColorPicker = (props: Props) => {
  const outsideClick = useOutsideClick();
  const [width, height, hue] = [200, 200, 0];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorHex, setColorHex] = useState<string>("#FFFFFF");
  useEffect(() => {
    if (!props.value) {
      setColorHex("#FFFFFF");
    } else if (props.value !== colorHex) {
      setColorHex(props.value);
    }
  }, [props.value]);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleOnChange = (value: string) => {
    props.onChange && props.onChange("#" + value);
    setColorHex("#" + value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        // Calculate the saturation and brightness of the pixel based on its position
        const saturation = x / width;
        const brightness = 1 - y / height;

        // Convert the HSB color to RGB
        const [r, g, b] = hsbToRgb(hue, saturation, brightness);

        // Set the pixel color in the image data array
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = 255;
      }
    }

    // Draw the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);
  }, [width, height, hue, outsideClick.active]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate the saturation and brightness of the selected color
    const saturation = x / width;
    const brightness = 1 - y / height;

    // Convert the HSB color to RGB and send the color to the parent component
    const [r, g, b] = hsbToRgb(hue, saturation, brightness);
    console.log(`rgb(${r}, ${g}, ${b})`);
  };

  return (
    <div className={style.color_picker_container}>
      <div
        className={style.color_picker}
        // onClick={() => {
        //   outsideClick.setActive(true);
        // }}
        style={{ backgroundColor: colorHex }}
        ref={outsideClick.RefObject}
      >
        {outsideClick.active && (
          <div className={style.picker}>
            <canvas
              width={200}
              height={120}
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            ></canvas>
          </div>
        )}
      </div>
      <span className={style.prefix}>#</span>
      <input
        type="text"
        value={colorHex.replace("#", "")}
        pattern="^[a-fA-F0-9]{6}$|^[a-fA-F0-9]{3}$"
        onChange={(e) => {
          if (/^$|^[0-9a-fA-F]{1,6}$/.test(e.target.value)) {
            handleOnChange(e.target.value);
          }
        }}
        className={style.color}
      />
      <input type="text" className={style.opacity} defaultValue={100} />
      <span className={style.suffix}>%</span>
    </div>
  );
};
export default ColorPicker;
