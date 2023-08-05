import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [imageUrls, setImageUrls] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const apiUrl = "/api/upload";
    const { data } = await axios.post("/api/upload-images", formData);
    // const data = await response.json();
    console.log("response",data)
    // Handle the response data, such as displaying the uploaded images
    setImageUrls(data.imageUrls);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="files[]" multiple />
        <button type="submit">Upload Images</button>
      </form>
      {imageUrls.map((url, index) => (
        <img src={url} key={index} />
      ))}
    </div>
  );
}
