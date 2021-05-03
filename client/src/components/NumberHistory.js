import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function NumberHistory({ numCalled }) {
  const [open, setOpen] = React.useState(true);
  const onCloseModal = () => {
    setOpen(false);
  };


  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        {numCalled.length > 0 ? (<div class="history-number-container">
          {numCalled.map((num) => {
            return <span class="number-display">{num}</span>;
          })}
        </div>) : <div>Game Is yet To Start!</div>}
      </Modal>
    </div>
  );
}
