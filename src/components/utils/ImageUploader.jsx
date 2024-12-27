import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { storage } from "../utils/firebase";

const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const ImageUploader = ({ onImageUrlChange }) => {
  ImageUploader.defaultProps = {
    onImageUrlChange: () => {},
  };

  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Upload Image
  const uploadImage = (imageFile) => {
    const ImageRef = ref(storage, `uploads/${Math.random()}`);
    const uploadTask = uploadBytesResumable(ImageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error("Error uploading image: " + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            onImageUrlChange(downloadURL);
            toast.success("Image uploaded successfully");
          } catch (error) {
            toast.error("Error uploading image: " + error);
          }
        });
      }
    );
  };

  // Dropzone Callback
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length > 0) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);

      uploadImage(acceptedFiles[0]);
    }

    fileRejections.forEach((file) => {
      toast.error(`${file.file.name} is not a valid image file`);
    });
  }, []);

  // Dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
    maxFiles: 1,
    maxSize: 1048576,
    multiple: true,
  });

  // Image Preview
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <div>
      <div {...getRootProps({ style })} className="d-flex flex-column">
        <input {...getInputProps()} />
        {files.map((file, index) => (
          <div key={index} className="image-preview-container">
            <img src={file.preview} alt={file.name} width="150px" />
          </div>
        ))}
        <div className="mt-2">
          {uploadProgress ? "Uploading" : uploadProgress > 99 ? "Completed" : "Drag and drop your image here"}
        </div>
      </div>
      <div className="progress" style={{ height: "3px" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageUrlChange: PropTypes.func,
};

export default ImageUploader;
