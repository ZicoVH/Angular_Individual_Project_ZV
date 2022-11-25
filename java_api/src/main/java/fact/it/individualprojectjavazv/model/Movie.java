package fact.it.individualprojectjavazv.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Movie {


//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
    @Id
    private int id;
    private boolean watchedorNot;
    private String comment;
    private int rating;
    private String title;
    private String poster_path;
    private Double vote_average;

    public Movie() {
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public boolean isWatchedorNot() {
    return watchedorNot;
  }

  public void setWatchedorNot(boolean watchedorNot) {
    this.watchedorNot = watchedorNot;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getPoster_path() {
    return poster_path;
  }

  public void setPoster_path(String poster_path) {
    this.poster_path = poster_path;
  }

  public Double getVote_average() {
    return vote_average;
  }

  public void setVote_average(Double vote_average) {
    this.vote_average = vote_average;
  }
}
