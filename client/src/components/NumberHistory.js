import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function NumberHistory({ numCalled }) {
  const [open, setOpen] = React.useState(true);
  const onCloseModal = () => {
    setOpen(false);
  };
  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div class="history-number-container">
          {numCalled.map((num) => {
            return <span class="number-display">{num}</span>;
          })}
        </div>
      </Modal>
    </div>
  );
}
