import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import QRCode from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { WhatsappIcon } from "react-share";



export default function SinglePlayerDetail({ numCalled }) {
  const [open, setOpen] = React.useState(true);
  const onCloseModal = () => {
    setOpen(false);
  };
  //generate QR code for the respective player
  var node = document.getElementById("QRPlayer");
  var urlOfImage;

  htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      urlOfImage = dataUrl;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });

  //this is use to make the file shareable
  const handleOnSubmit = async () => {
    const response = await fetch(urlOfImage);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "share.jpg", { type: blob.type });
    console.log(file);
    if (navigator.share) {
      await navigator
        .share({
          title: "title",
          text: "Join The game Using QR",
          // url: "/join",
          files: [file],
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
          <div id="QRplayer">
        <QRCode
          value="https://tambola-numbers.herokuapp.com "
          size={290}
          level={"H"}
          includeMargin={true}
        />
        </div>
        <p  onClick ={handleOnSubmit} >Share QR</p>
      </Modal>
    </div>
  );
}
