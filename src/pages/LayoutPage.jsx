import { Link } from "react-router-dom";

function LayoutPage({ children }) {
  return (
    <>
      <ul>
        <li>
          <Link to="/">메인</Link>
        </li>
        <li>
          <Link to="/pokemons">포켓몬 리스트</Link>
        </li>
      </ul>
      {children}
    </>
  );
}

export default LayoutPage;
