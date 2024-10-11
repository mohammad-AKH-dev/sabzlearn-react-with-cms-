import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const mySwal = withReactContent(Swal)

  useEffect(() => {
    getAndShowAllMenus()
  }, []);

  const getAndShowAllMenus = () => {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => setMenus(allMenus));
  }

  const removeMenu = (menuID) => {
     mySwal.fire({
      title:'آیا از حذف این منو اطمینان دارید؟',
      icon:'warning',
      confirmButtonText:'بله',
      cancelButtonText:'خیر',
      showCancelButton:true
     }).then(result => {
      if(result.isConfirmed){
        fetch(`http://localhost:4000/v1/menus/${menuID}`,{
          method:"DELETE",
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` 
          }
         }).then(res => {
          if(res.ok){
            mySwal.fire({
              title:'حذف منو با موفقیت انجام شد',
              icon:'success',
              confirmButtonText:'خیلی هم عالی'
            }).then(() => getAndShowAllMenus())
          }
         })
      }
     })
  }

  return (
    <>
      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeMenu(menu._id)}>
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
