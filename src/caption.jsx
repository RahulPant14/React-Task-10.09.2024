
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Cropper } from "react-cropper"; 
import "cropperjs/dist/cropper.css";
import "./caption.css";

const Caption = () => {
  const param = useParams();
  const cropperRef = useRef(null); 
  const [capt, setCapt] = useState(null); 
  const [caption, setCaption] = useState(""); 
  const [croppedImage, setCroppedImage] = useState(null); 
  const key = "cRQ_1IS22LHB1uFIxK1DshXQOmOJJROBmeUdSVekkIg";

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos/${param.id}?client_id=${key}`)
      .then((response) => {
        setCapt(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [param.id]);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();

    const croppedDataUrl = croppedCanvas.toDataURL();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = croppedCanvas.width;
    canvas.height = croppedCanvas.height;

    const img = new Image();
    img.src = croppedDataUrl;
    img.onload = () => {
      context.drawImage(img, 0, 0);

      context.font = "30px Arial";
      context.fillStyle = "black";
      context.fillText(caption, 50, canvas.height - 50);

      const finalDataUrl = canvas.toDataURL();
      setCroppedImage(finalDataUrl);
    };
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "cropped-image-with-caption.png";
    link.click();
  };

  if (!capt) return <p>Loading image...</p>;

  return (
    <div className="container">
      <h2>Resize the image and attach a caption</h2>

      <div className="capt-cart">
        <div className="capt-img">
          
          <Cropper
            src={capt.urls.full} 
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
          />
        </div>

        <div className="capt-text">
          <label htmlFor="caption">Add Caption</label>
          <textarea
            name="caption"
            rows="17"
            cols="75"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

          <input className="btn-crop" type="button" value="Trim & insert caption" onClick={handleCrop} />

          {(
            <>
              <input className="btn-donld" type="button" value="Download Image" onClick={handleDownload} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Caption;
