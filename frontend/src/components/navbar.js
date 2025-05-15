import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}> Repositório de Filmes
        </Typography>
        <Button color="inherit" component={RouterLink} to="/movies">
          Página principal
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
