import { useState } from "react";
import ImageUploader from "../utils/ImageUploader";

const Register = () => {
    const [imageUrls, setImageUrl] = useState([]);

    console.log(imageUrls);

    const handleImageUrlChange = (newImageUrl) => {
        setImageUrl(newImageUrl);
  }
  
  return (
    <div className="bg-primary bg-gradient w-75">
        <ImageUploader onImageUrlChange={handleImageUrlChange}/>
    </div>
  );
};

export default Register;
