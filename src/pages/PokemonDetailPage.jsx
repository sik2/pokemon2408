import { useParams } from "react-router-dom";

function PokemonDetailPage() {
  const params = useParams();
  return (
    <>
      <div>ID : {params.id}</div>
      <div>상세페이지</div>
    </>
  );
}

export default PokemonDetailPage;
