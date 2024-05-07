import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Link , Routes, Outlet} from 'react-router-dom';
import Show from './Show';


function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const results = response.data.results;

        const data = await Promise.all(results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        }));

        console.log(data);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
        <NavBar />
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          <Grid container spacing={4}>
            
            {pokemonData.map(pokemon => (
              <Grid item xs={3} key={pokemon.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={pokemon.sprites.front_default}
                    title={pokemon.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo: {pokemon.types.map(type => type.type.name).join(', ')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/show/${pokemon.id}`}>Ver detalle</Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
         
        )}
      </div>
    
  );
}

export default Home;
