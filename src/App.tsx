import goat from "./goat-square-profile.jpg";

type PaperSize = {
  // mm scale
  width: number;
  height: number;
};

const A4: PaperSize = {
  width: 210,
  height: 297,
};

const imageSize: PaperSize = {
  width: 80,
  height: 80,
};

const gap = 5;

function App() {
  const { width, height } = A4;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap}
        y={gap}
        href={goat}
      />
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap}
        y={imageSize.height + 2 * gap}
        href={goat}
      />
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap}
        y={imageSize.height * 2 + 3 * gap}
        href={goat}
      />
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap + gap + imageSize.width}
        y={gap}
        href={goat}
      />
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap + gap + imageSize.width}
        y={imageSize.height + 2 * gap}
        href={goat}
      />
      <image
        width={imageSize.width}
        height={imageSize.height}
        x={gap + gap + imageSize.width}
        y={imageSize.height * 2 + 3 * gap}
        href={goat}
      />
    </svg>
  );
}

export default App;
