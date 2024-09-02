import { useParams } from "react-router-dom";

function PokemonDetailPage() {
  const { id } = useParams();
  return (
    <>
      <div>
        <h1>포켓몬 상세페이지</h1>
        <div>ID: {id}</div>
        <img
          src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${id}.png`}
          alt="포켓몬 이미지"
        />
      </div>
    </>
  );
}

export default PokemonDetailPage;
