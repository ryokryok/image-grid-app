import Modal from "react-modal";
import { FaGithub, FaQuestionCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "./components/Form";

const customStyles: Modal.Styles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    // close modal when user prints this sheets.
    window.addEventListener("beforeprint", (event) => {
      setIsOpen(false);
    });
  }, []);

  return (
    <header className="site-header hide-when-print">
      <h1 className="site-title">Image Grid</h1>
      <div className="site-subcontent">
        <p className="site-icon" onClick={openModal}>
          <FaQuestionCircle size={"2rem"} />
        </p>
        <p className="site-icon">
          <a
            href="https://github.com/ryokryok/image-grid-app"
            target={"_blank"}
          >
            <FaGithub size={"2rem"} />
          </a>
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Instructions on how to use"
      >
        <div className="modal-content-wrapper">
          <h2>What is this?</h2>
          <p>
            This is edit tool that creates image grid sheet for A4 size
            printing.
          </p>
          <p>Click the preview sheet to edit it.</p>
        </div>
        <Button primary={"primary"} onClick={closeModal}>
          close
        </Button>
      </Modal>
    </header>
  );
}
