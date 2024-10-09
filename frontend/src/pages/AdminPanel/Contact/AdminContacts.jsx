import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    getAndShowContacts()
  }, []);
  const getAndShowContacts = () => {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        console.log(allContacts);
        setContacts(allContacts);
      });
  };

  const showTicketBody = (body) => {
    mySwal.fire({
      title: body,
      icon: "success",
      confirmButtonText: "اوکی",
    });
  };

  const answerToTicket = (email) => {
    mySwal
      .fire({
        title: "پاسخ را وارد کنید:",
        input: "text",
        icon: "info",
        confirmButtonText: "پاسخ دادن",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:4000/v1/contact/answer", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
            body: JSON.stringify({
              email,
              answer: result.value,
            }),
          }).then(res => {
             if(res.ok){
              mySwal.fire({
                title:'پیغام با موفقیت پاسخ داده شد',
                icon:'success',
                confirmButtonText:'بسیار هم عالی'
              }).then(() => getAndShowContacts())
             }
          })
        }
      });
  };

  const removeContact = (contactID) => {
    mySwal.fire({
      title:'آیا از حذف این پیغام اطمینان دارید?',
      icon:'warning',
      confirmButtonText:'بله',
      cancelButtonText:'خیر',
      showCancelButton:true
    }).then(result => {
      if(result.isConfirmed){
        fetch(`http://localhost:4000/v1/contact/${contactID}`,{
          method:'DELETE',
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        }).then(res => {
          if(res.ok){
            mySwal.fire({
              title:'پیغام با موفقیت حذف شد',
              icon:'success',
              confirmButtonText:'ایول'
            }).then(result => {
              if(result.isConfirmed){
                getAndShowContacts()
              }
            })
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicketBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  {contact.answer === 1 ? (
                    <button type="button" className="btn btn-success edit-btn">
                      پاسخ داده شده
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => answerToTicket(contact.email)}
                    >
                      پاسخ
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeContact(contact._id)}>
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
