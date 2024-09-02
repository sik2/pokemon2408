import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loding, setLoding] = useState(true);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const totalCount = 1302;
  const limit = 30;

  const showPrev = useCallback(() => {
    setOffset(offset - limit);
  }, [offset]);

  const showNext = useCallback(() => {
    setOffset(offset + limit);
  }, [offset]);

  const getNumberFromUrl = (url) => {
    const urlList = url.split("/");
    return parseInt(urlList[urlList.length - 2]);
  };

  let i = 0;
  const forPrintPokemons = useMemo(
    () =>
      pokemons.map((pokemon) => {
        // console.log("hit", ++i);
        const imgNumber = getNumberFromUrl(pokemon.url);
        const imgUrl = `https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${imgNumber}.png`;
        return {
          imgNumber,
          imgUrl,
          ...pokemon,
        };
      }),
    [pokemons]
  );

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
      <h1>포켓몬 도감 리스트</h1>
      {/* 카운트가 변경되면 forPrintPokemons 가 계속 실행되지만 useMemo 를 통해 필요할때만 수정되도록 할 수 있다 */}
      count: <button onClick={() => setCount(count + 1)}>{count}</button>
      offset: {offset}
      {offset > 0 && <button onClick={showPrev}>이전</button>}
      <ul>
        {forPrintPokemons.map((pokemon, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              borderButtom: "1px solid black",
            }}
          >
            <span>{pokemon.imgNumber}</span>
            <img src={pokemon.imgUrl} alt="포켓몬이미지" />
            <Link to={`/pokemons/${pokemon.imgNumber}`}>
              <span>{pokemon.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {totalCount > offset + limit && <button onClick={showNext}>다음</button>}
    </>
  );
}

export default PokemonListPage;
