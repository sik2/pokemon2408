import { Navigate, useNavigate, useParams } from "react-router-dom";

function PokemonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <h1>포켓몬 상세페이지</h1>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <div className="badge badge-success m-5">{id}</div>
          <img
            src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${id}.png`}
            alt="포켓몬 이미지"
          />
        </figure>
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonDetailPage;
