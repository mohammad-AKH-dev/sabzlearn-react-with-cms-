import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Link,
  Image,
  ImageUpload,
  BlockQuote,
  List,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { useState } from "react";

export default function Draft() {
  const [articleBody,setArticleBody] = useState('')
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input type="text" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input type="text" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <input type="text" className="article-textarea" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <CKEditor
                editor={ClassicEditor}
                data={articleBody}
                config={{
                  toolbar: {
                    items: [
                      "undo",
                      "redo",
                      "|",
                      "bold",
                      "italic",
                      "heading",
                      "link",
                      "uploadImage",
                      "blockQuote",
                      "numberedList",
                      "bulletedList"
                    ],
                  },
                  plugins: [
                    Bold,
                    Essentials,
                    Italic,
                    Mention,
                    Paragraph,
                    Undo,
                    Heading,
                    Image,
                    Link,
                    ImageUpload,
                    BlockQuote,
                    List,
                    
                  ],
                  heading: {
                    options: [
                      {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                      },
                      {
                        model: "heading1",
                        view: "h1",
                        title: "Heading 1",
                        class: "ck-heading_heading1",
                      },
                      {
                        model: "heading2",
                        view: "h2",
                        title: "Heading 2",
                        class: "ck-heading_heading2",
                      },
                    ],
                  },
                }}
                onChange={(event, editor) => {
                  setArticleBody(editor.getData())
                }}
              />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input type="file" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select>
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="انتشار" className="m-1" />
                  <input type="submit" value="پیش‌نویس" className="m-1" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
