import { Link } from "react-router-dom";

const AuthFooter = ({ text, linkLabel, linkTo }) => {
  return (
    <p className="text-sm text-center text-gray-500 mt-4">
      {text}{" "}
      <Link
        to={linkTo}
        className="text-blue-600 font-medium hover:underline"
      >
        {linkLabel}
      </Link>
    </p>
  );
};

export default AuthFooter;
