package fact.it.individualprojectjavazv.repository;

import fact.it.individualprojectjavazv.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
     Movie findById(int id);

     @Query("select b from Movie b where b.watchedorNot is true ")
     List<Movie> findAllWatched();



}
