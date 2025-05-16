import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard';
import { Grid, Container, Typography, Pagination, CircularProgress, Box } from '@mui/material';

const API_URL = "http://localhost:5000"; // Troca para o teu backend em produção se necessário

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/movies?page=${pageNumber}&limit=10`);
      setMovies(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.currentPage || 1);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err.message);
      setMovies([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Lista de Filmes</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie._id}>
                  <MovieCard movie={movie} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ mt: 4, width: "100%", textAlign: "center" }}>
                Nenhum filme encontrado.
              </Typography>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MovieList;
