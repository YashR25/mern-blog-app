import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { axiosClient } from "../../utils/axiosClient";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";

import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageUploader", ImageUploader);

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["image"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const modules = {
  toolbar: {
    container: toolbarOptions,
    // handlers: {
    //   image: imageHandler,
    // }
  },
  imageUploader: {
    upload: (file) => {
      return new Promise(async (resolve, reject) => {
        const base64Image = await convertBase64(file);
        const res = await axiosClient.post("/admin/uploadImage", {
          image: base64Image,
        });
        const url = await res.data;
        resolve(url);
      });
    },
  },
};

function TextEditor({ content, setContent }) {
  // const [value, setValue] = useState("");
  const quillRef = useRef(null);
  //   console.log(value);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input && input.files ? input.files[0] : null;
      const base64Img = await convertBase64(file);
      let quillObj = quillRef.current.getEditor();
      await axiosClient
        .post("/admin/uploadImage", { image: base64Img })
        .then((res) => {
          console.log(res);
          let data = res.data;
          const range = quillObj.getSelection();
          quillObj.editor.insertEmbed(range.index, "image", data);
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    };
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={content}
      modules={modules}
      onChange={(e) => {
        setContent(e);
      }}
    />
  );
}

export default TextEditor;
