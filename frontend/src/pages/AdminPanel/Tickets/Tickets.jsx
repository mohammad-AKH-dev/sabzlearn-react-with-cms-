import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  const mySwal = withReactContent(Swal);

  useEffect(() => {
    getAllTickets()
  }, []);

  const getAllTickets = () => {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTickets(data);
      });
  }

  const showTicketBody = (ticketBody) => {
    mySwal.fire({
      title: ticketBody,
      icon: "info",
    });
  };

  const answerToTicket = (ticketID) => {
    mySwal
      .fire({
        title: "پاسخ:",
        icon: "question",
        input: "text",
        confirmButtonText: "پاسخ دهی به تیکت",
      })
      .then((result) => {
        console.log(result.value);
        if (result.isConfirmed && result.value) {
          fetch(`http://localhost:4000/v1/tickets/answer`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-type": "application/json",
            },
            body: JSON.stringify({ ticketID, body: result.value }),
          }).then((res) => {
            if (res.ok) {
              mySwal.fire({
                title: "تیکت با موفقیت پاسخ داده شد",
                icon: "success",
                confirmButtonText: "اوکی",
              }).then(() => getAllTickets())
            }
          });
        }
      });
  };

  return (
    <>
      <DataTable title="تیکت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره</th>
              <th>اولویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course ? ticket.course : "---"}</td>
                <td>
                  {ticket.priority === 1 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 3 && "کم"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  {ticket.answer === 1 ? (
                    <button
                      type="button"
                      className="btn btn-success edit-btn"
                    >
                      پاسخ داده شده
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => answerToTicket(ticket._id)}
                    >
                      پاسخ
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
