import { useState, useEffect } from "react";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loding, setLoding] = useState(true);
  const [offset, setOffset] = useState(0);
  const totalCount = 1302;
  const limit = 30;

  const showPrev = () => {
    setOffset(offset - limit);
  };

  const showNext = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    setLoding(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoding(false);
      });
  }, [offset]);

  if (loding) {
    return "로딩 중...";
  }

  return (
    <>
      <h1>포켓몬 도감</h1>
      offset: {offset}
      {offset > 0 && <button onClick={showPrev}>이전</button>}
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
      {totalCount > offset + limit && <button onClick={showNext}>다음</button>}
    </>
  );
}

export default App;
