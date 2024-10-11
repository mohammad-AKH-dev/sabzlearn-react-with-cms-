import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../components/Form/Input";
import { Link } from "react-router-dom";
import { minValidator } from "../../../components/validators/rules";
import withReactContent from "sweetalert2-react-content";
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
  Image,
  ImageUpload,
  BlockQuote,
  List,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody,setArticleBody ] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    getAllArticles();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllArticles() {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        console.log(allArticles);
        setArticles(allArticles);
      });
  }

  const removeArticle = (articleID) => {
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    mySwal
      .fire({
        title: "آیا از حذف مقاله اطمینان دارید؟`",
        icon: "warning",
        cancelButtonText: "خیر",
        confirmButtonText: "بله",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/v1/articles/${articleID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorageDate.token}`,
            },
          }).then((res) => {
            if (res.ok) {
              mySwal
                .fire({
                  title: "مقاله مورد نظر با موفقیت حذف شد",
                  icon: "success",
                  confirmButtonText: "اوکی",
                })
                .then(() => {
                  getAllArticles();
                });
            }
          });
        }
      });
  };


  const createNewArticle = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title',formState.inputs.title.value)
    formData.append('shortName',formState.inputs.shortName.value)
    formData.append('description',formState.inputs.description.value)
    formData.append('categoryID',articleCategory)
    formData.append('cover',articleCover)
    formData.append('body',articleBody)

    fetch('http://localhost:4000/v1/articles',{
      method:"POST",
      headers:{
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res => {
      if(res.ok){
        mySwal.fire({
          title:'مقاله با موفقیت افزوده شد',
          icon:'success',
          confirmButtonText:'خیلی هم عالی'
        }).then(result => {
          if(result.isConfirmed){
            getAllArticles()
          }
        })
      }
    })
  }

  const draftNewArticle = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title',formState.inputs.title.value)
    formData.append('shortName',formState.inputs.shortName.value)
    formData.append('description',formState.inputs.description.value)
    formData.append('categoryID',articleCategory)
    formData.append('cover',articleCover)
    formData.append('body',articleBody)

    fetch('http://localhost:4000/v1/articles/draft',{
      method:"POST",
      headers:{
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res => {
      if(res.ok){
        mySwal.fire({
          title:'مقاله با موفقیت پیش نویس شد',
          icon:'success',
          confirmButtonText:'خیلی هم عالی'
        }).then(result => {
          if(result.isConfirmed){
            getAllArticles()
          }
        })
      }
    })
  }

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
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                <Input
                  className='col-12'
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
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
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="انتشار" onClick={(event) => createNewArticle(event)}/>
                  <input type="submit" value="پیش نویس" style={{marginRight:'15px'}} onClick={(event) => draftNewArticle(event)}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="مقاله‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.publish === 1 ? 'منتشر شده' : 'پیش نویس'}</td>
                <td style={{textAlign:'center'}}>
                {
                  article.publish === 1 ? (<i className="fa fa-check"></i>) : (
                    <Link to={`draft/${article.shortName}`} type="button" className="btn btn-primary edit-btn">
                    ادامه نوشتن
                  </Link>
                  )
                }
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
