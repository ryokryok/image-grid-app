import { A4 } from "./lib/utils";
import { PrintPreview } from "./PrintPreview";
import { Popup } from "./Popup";
import { Header } from "./Header";

function App() {
  return (
    <>
      <Header />
      <Popup />
      <PrintPreview paperSize={A4} />
    </>
  );
}

export default App;
