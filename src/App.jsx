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

  const getNumberFromUrl = (url) => {
    const urlList = url.split("/");
    console.log(urlList);
    return parseInt(urlList[urlList.length - 2]);
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
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              borderButtom: "1px solid black",
            }}
          >
            <span>{getNumberFromUrl(pokemon.url)}</span>
            <img
              src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${getNumberFromUrl(
                pokemon.url
              )}.png`}
              alt="포켓몬이미지"
            />
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
      {totalCount > offset + limit && <button onClick={showNext}>다음</button>}
    </>
  );
}

export default App;
