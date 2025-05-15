
import Movie from './movieModel.js';

export const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .select('title year poster genres') 
      .skip(skip)
      .limit(limit)
      .sort({ year: -1 });

    const count = await Movie.countDocuments();

    res.json({
      data: movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalMovies: count,
    });
  } catch (error) {
    console.error('Erro ao encontrar filmes:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).select('runtime title year plot fullplot genres poster imdb directors cast');
    if (!movie) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filme' });
  }

};

