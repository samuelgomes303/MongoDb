import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, CircularProgress, Box, Paper, Button } from '@mui/material';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar detalhes do filme:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />; 
  if (!movie) return <Typography>Filme não encontrado.</Typography>; 


  const fullPlot = movie.fullplot || 'Sinopse detalhada não disponível';
  const imdbRating = movie.imdb?.rating || 'N/A';
  const imdbVotes = movie.imdb?.votes || '0';
  const cast = movie.cast?.join(', ') || 'Elenco não disponível';

  return (

    
    <Container sx={{ paddingTop: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)} 
          sx={{ mb: 2 }}>Voltar</Button>

        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {movie.title}
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          {movie.year}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Gêneros:</strong> {movie.genres?.join(', ')}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Descrição:</strong> {fullPlot}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Avaliação IMDb:</strong> {imdbRating} ({imdbVotes} votos)
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Elenco:</strong> {cast}
        </Typography>

        {movie.poster && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: '100%', maxWidth: 600, borderRadius: 8 }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MovieDetail;
