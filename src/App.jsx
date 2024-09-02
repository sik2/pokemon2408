import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<MainPage />}></Route>
        <Route path="/pokemons" element={<PokemonListPage />}></Route>
        <Route path="/pokemons/:id" element={<PokemonDetailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
