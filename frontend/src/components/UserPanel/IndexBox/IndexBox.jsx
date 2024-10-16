import { Link } from "react-router-dom";

export default function IndexBox({ title, href }) {
  return (
    <div className="col-4">
      <Link to={href} class="main__link">
        {title}
      </Link>
    </div>
  );
}
