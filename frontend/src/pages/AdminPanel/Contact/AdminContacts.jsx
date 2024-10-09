import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function AdminContacts() {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/contact')
            .then(res => res.json())
            .then(allContacts => {
                console.log(allContacts);
                setContacts(allContacts)
            })
        }, [])

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
              <th>حذف</th>
              <th>پاسخ</th>
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
                  <button type="button" className="btn btn-primary edit-btn">
                    مشاهده پیغام
                  </button>
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
