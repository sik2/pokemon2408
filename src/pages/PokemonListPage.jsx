import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import LayoutPage from "./LayoutPage";
function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loding, setLoding] = useState(true);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const totalCount = 1302;
  const limit = 8;

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
  //카운트가 변경되면 forPrintPokemons 가 계속 실행되지만 useMemo 를 통해 필요할때만 수정되도록 할 수 있다
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
      <LayoutPage>
        <div className="m-2">
          <div className="badge badge-success">{offset}</div>
          {offset > 0 && (
            <button className="btn btn-sm btn-success" onClick={showPrev}>
              이전
            </button>
          )}
          {totalCount > offset + limit && (
            <button className="btn btn-sm btn-success" onClick={showNext}>
              다음
            </button>
          )}
        </div>
        <hr />
        <div className="con-1 w-full h-screen max-w-7xl max-auto">
          <h1 className="header text-2xl">포켓몬 도감 리스트</h1>
          <ul className="flex flex-wrap gap-4 mt-2">
            {forPrintPokemons.map((pokemon, index) => (
              <li
                key={index}
                className="card card-compact w-72 bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <div className="badge badge-primary badge-outline">
                    {pokemon.imgNumber}
                  </div>
                  <img src={pokemon.imgUrl} alt="포켓몬이미지" />
                  <Link to={`/pokemons/${pokemon.imgNumber}`}>
                    <div className="font-bold">{pokemon.name}</div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </LayoutPage>
    </>
  );
}

export default PokemonListPage;
