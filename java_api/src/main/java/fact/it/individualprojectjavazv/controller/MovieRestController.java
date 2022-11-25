package fact.it.individualprojectjavazv.controller;

import fact.it.individualprojectjavazv.model.Movie;
import fact.it.individualprojectjavazv.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5878")
@RequestMapping("/api")
public class MovieRestController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("/movies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/watchedmovies")
    public List<Movie> getWatchedMovies() {
        return movieRepository.findAllWatched();
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable int id){
        Optional<Movie> movie1 = Optional.ofNullable(movieRepository.findById(id));
        if (movie1.isPresent()){
            Movie movie = movie1.get();
            return new ResponseEntity<>(movie, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/movies")
    public Movie createMovie(@RequestBody Movie movie){
        Movie existingMovie = movieRepository.findById(movie.getId());
        if (existingMovie != null) {
            return null;
        }
        else {
            return movieRepository.save(movie);
        }
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Integer> deleteMovie(@PathVariable int id) {
        Optional<Movie> movie1 = Optional.ofNullable(movieRepository.findById(id));
        if (movie1.isPresent()){
            Movie movie = movie1.get();
            movieRepository.delete(movie);
            return new ResponseEntity<>(movieRepository.findAll().size(),HttpStatus.OK);
        }
        return new ResponseEntity<>(movieRepository.findAll().size(),HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/movies/{id}")
    public ResponseEntity<Movie> changeMovie(@RequestBody Movie updateMovie, @PathVariable int id){
        Optional<Movie> movie1 = Optional.ofNullable(movieRepository.findById(id));
        if (movie1.isPresent()){
            Movie movie = movie1.get();
            movie.setWatchedorNot(updateMovie.isWatchedorNot());
            if (updateMovie.getComment() != null) {
                movie.setComment(updateMovie.getComment());
            }
            if (updateMovie.getRating()!= 0) {
                movie.setRating(updateMovie.getRating());
            }

            movieRepository.save(movie);
            return new ResponseEntity<>(movie, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
