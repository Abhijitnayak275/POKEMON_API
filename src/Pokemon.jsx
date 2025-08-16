import { useEffect, useState } from "react";
import "./index.css"
import PokemonCards from "./PokemonCards";
function Pokemon(){
const [pokemon, setPokemon] = useState([]);
const[search, setSearch] = useState("");

  useEffect(() => {
    // Step 1: Fetch basic Pokémon list
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(data => {
        const results = data.results; 
        // console.log(results)

        // Step 2: Fetch details for each Pokémon
        const detailPromises = results.map(poke =>
        fetch(poke.url).then(res => res.json()) 
        ); 
    
        Promise.all(detailPromises).then(fullData => {
          setPokemon(fullData);
        });
        console.log(detailPromises)
      })
      .catch(err => console.error('Failed to fetch Pokémon:', err));
  }, []);

  //search functionality
  const searchData = pokemon.filter((poke) =>poke.name.toLowerCase().includes(search.toLocaleLowerCase()))

    return(
    <section className="container">
        <header>
            <h1>Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
           <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} /> 
        </div>
        <div>
            <ul className="cards">
                {
                    searchData.map((poke) =>{
                        return<PokemonCards key={poke.id} pokemonData={poke}/>
                    })
                }
            </ul>
        </div>
    </section>
    )
}
export default Pokemon;