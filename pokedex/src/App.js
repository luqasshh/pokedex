import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      pokemons: [],
      searchText: ""
    }


  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then(pokemons =>
        this.setState(
          () => {
            let results = pokemons.results;
            // console.log(pokemons.results)
            return { pokemons: results }

          }))
  };

  onSearchChange = (event) => {
    const searchText = event.target.value.toLocaleLowerCase();
    this.setState(() => { return { searchText } })
  }

  render() {
    const { pokemons, searchText } = this.state;
    const { onSearchChange } = this;

    // let pokemons = this.state.pokemons;
    const filteredPokemons = pokemons.filter((pokemon) => {
      return pokemon.name.toLocaleLowerCase().includes(searchText)
    })

    return (
      <div className='App'>
        <input
          className="search-box"
          type="search"
          placeholder='Search pokemons'
          onChange={onSearchChange} />

        {filteredPokemons.map((pokemon) => {
          return (
            <h1 key={pokemon.index}>{pokemon.name}</h1>)
        })
        }
      </div>
    );
  }
}

export default App;
