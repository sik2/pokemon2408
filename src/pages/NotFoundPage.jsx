import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <Link to="/">메인으로 이동</Link>
      <h1>페이지를 찾을수 없습니다.</h1>
    </>
  );
}

export default NotFoundPage;
