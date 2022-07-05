import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { A4 } from "./lib/utils";
import { PrintPreview } from "./PrintPreview";
import { Popup } from "./Popup";

function App() {
  const notify = () =>
    toast.info("Click image to edit!", {
      icon: false,
    });
  toast.info("This site is for A4 size printing!", {
    icon: false,
  });

  useEffect(() => {
    notify();
    return () => {};
  }, []);

  return (
    <>
      <ToastContainer
        position={`top-center`}
        autoClose={4000}
        className="hide-when-print"
      />
      <Popup />
      <PrintPreview paperSize={A4} />
    </>
  );
}

export default App;
