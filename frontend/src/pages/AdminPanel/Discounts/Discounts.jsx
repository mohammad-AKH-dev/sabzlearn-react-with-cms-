import  { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function Discounts() {
  const [discount, setDiscount] = useState("");
  const mySwal = withReactContent(Swal)

  const setDiscounts = (event) => {
    event.preventDefault();
    const reqBody = {
      discount,
    };

    fetch(`http://localhost:4000/v1/offs/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
          if(res.ok) {
              mySwal.fire({
                  title: 'کمپین با موفقیت ایجاد شد',
                  icon: 'success',
                  confirmButtonText: "خیلی هم عالی"
              })
          }
      })
  };

  return (
    <>
      <div className="home-title">
        <span>برگزاری کمپین جدید</span>
      </div>
      <form className="form">
        <div className="col-6">
          <div className="name input">
            <label className="input-title">درصد تخفیف</label>
            <input
              type="text"
              value={discount}
              placeholder="لطفا درصد تخفیف همگانی را وارد کنید..."
              onChange={(event) => setDiscount(event.target.value)}
            />
            <span className="error-message text-danger"></span>
          </div>
        </div>

        <div className="col-12">
          <div className="bottom-form">
            <div className="submit-btn">
              <input type="submit" value="ایجاد کمپین" onClick={setDiscounts} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
