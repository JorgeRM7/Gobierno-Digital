import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import NavBar from './NavBar';
import Skeleton from '@mui/material/Skeleton';


function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>No data available for this Pokémon.</p>;
  }

  return (
<div>
        <NavBar />
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          <Grid container spacing={4}>
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
                </Card>
              </Grid>
          </Grid>
        )}
      </div>
    
  );
}

export default PokemonDetail;
