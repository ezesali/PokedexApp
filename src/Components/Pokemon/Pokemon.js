import React, {useState, useEffect} from 'react';
import PokeApi from '../Services/Api';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  rootProgress: {
    display: 'flex',
  },
});


export default function PokemonModule(props) {

  const classes = useStyles();

  const [PokemonData, setPokemonData] = useState({})

  useEffect(async () => {

    if (props.pokemon !== undefined){
      
      const result = await PokeApi.get('/'+props.pokemon.slice(props.pokemon.indexOf('pokemon'), props.pokemon.length));
          
      setPokemonData(result.data)
    
    }
    
  },[]);

  return (

    <Card className={classes.root}>
      <Typography gutterBottom variant="h5" component="h5">
          {PokemonData.id}
      </Typography>
      {PokemonData.sprites !== undefined ?
      <CardMedia
        className={classes.media}
        image={PokemonData.sprites.front_default}
        title={PokemonData.name}
      />
      :
      <div className={classes.root}>
        <CircularProgress />
      </div>}
      <CardContent>
        <Typography variant="overline" component="h1">
          {PokemonData.name}
        </Typography>
        {PokemonData.types !== undefined ?
        <Typography variant="overline" color="textSecondary" >
          <u>Tipos</u>
          <ol style={{margin: 5, paddingLeft:'1.2rem'}}>
            {PokemonData.types.map((typeItem, index) => {
              return (
                <li key={index}>
                  {typeItem.type.name}
                </li>
              )
            })}
          </ol>
        </Typography>
        :
        <div className={classes.root}>
          <CircularProgress />
        </div>
        }
      </CardContent>
    </Card>
  );
}