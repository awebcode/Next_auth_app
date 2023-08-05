import cloudinary from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: "asikur",
  api_key: "153184895483919",
  api_secret: "dMhjWvJnZGfJrwqHtA_waOtbo9g",
});

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading images." });
      return;
    }
    const imageUrls = [];
    for (let i = 0; i < files.files.length; i++) {
      const image = files.files[i];
      try {
        const result = await cloudinary.uploader.upload(image.path);
        imageUrls.push(result.secure_url);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading images." });
        return;
      }
    }
    // Handle the response data, such as sending the image URLs to the frontend
    res.status(200).json({ imageUrls });
  });
}
