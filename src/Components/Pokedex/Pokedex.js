import React, {useState, useEffect, useRef} from 'react';
import PokeApi from '../Services/Api';
import PokemonModule from '../Pokemon/Pokemon'; 
import { makeStyles } from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PokeTriste from '../../Assets/PokeTriste.jpg';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  }
}));

export default function Pokedex() {

  const [PokemonsArr, setPokemonsArr] = useState([0])

  const [PokemonNameInput, setPokemonNameInput] = useState('');

  const classes = useStyles();

  const filterByName = async() =>{

    //Get Filter Pokemons
    const response = await PokeApi.get("/pokemon/?limit=1000");
      
    let newPokemonArr = [];

    response.data.results.forEach((Pok) => {

    if (Pok.name.toLowerCase().startsWith(PokemonNameInput.toLowerCase()) && (PokemonNameInput !== null || PokemonNameInput.length > 0) ) {

      newPokemonArr.push(Pok)

    }});
        
    if (newPokemonArr.length > 0){
      return newPokemonArr;
    }
    else{

      return [];
    }
  }

  useEffect(async () => {

    //Get Pokemons
    const response = await PokeApi.get("/pokemon/?limit=15");

    if (PokemonNameInput.length > 0){
        
      filterByName().then(res => {setPokemonsArr(res)});

    }
    else{

      setPokemonsArr(response.data.results);

    }

  },[PokemonNameInput]);

  

  return (
    <div>
      <TextField
          label="Buscar Pokemon"
          style={{ margin: 8 }}
          placeholder="Ingresa un Pokemon"
          margin="dense"
          variant="outlined"
          onChange={(value) =>{setPokemonNameInput(value.target.value)}}
      />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={10}>
            {PokemonsArr.length > 0 ? 
              PokemonsArr.map((PokemonItem) => (
              <Grid m={2} width={'33vh'} key={Math.random()} item>
                <PokemonModule pokemon={PokemonItem.url}/>
              </Grid>
            ))
            :
            <div style={{marginTop:'12%', alignText:'center'}}>
            <Typography variant="overline" component="h1">
              No se encontraron Pokemons con la busqueda aplicada
            </Typography>
            <img style={{height:'60%', border:'solid'}} src={PokeTriste} alt='No encontro Pokemons'/>
            </div>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}