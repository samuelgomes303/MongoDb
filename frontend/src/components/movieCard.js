import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleMovieClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  const posterUrl = movie.poster || 'https://via.placeholder.com/300x450';

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      boxShadow: 3,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6
      },
    }}>
      <CardMedia component="img" sx={{
        height: 300,
        borderRadius: '10px 10px 0 0',
        objectFit: 'cover',
      }} image={posterUrl} alt={movie.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: '#333' }}>{movie.title}</Typography>
        <Typography variant="body2" sx={{ color: '#555' }}>{movie.year}</Typography>
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {movie.genres?.slice(0, 3).map((genre, index) => (
            <Chip key={index} label={genre} size="small" color="primary" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" fullWidth onClick={handleMovieClick}>
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
