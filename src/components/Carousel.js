import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";
import "./Carousel.scss";

export const Carousel = ({ movies }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="test">
      <AutoplaySlider
        className="slider"
        play={true}
        cancelOnInteraction={false}
        interval={Math.round(Math.random() * 3000) + 1500}
        bullets={false}
        organicArrows={true}
      >
        <div>
          <Link
            to={`/movies/${movies[0].id}`}
            style={{ color: "whitesmoke", textDecoration: "none" }}
          >
            {movies[0].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[0].backdrop_path}`}
                alt="movieposter"
                // style={{ width: "400px" }}
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                // style={{ width: "400px", height: "225px" }}
              />
            )}
            <div className="title">
              <p
              // style={{
              //   fontSize: "1.2rem",
              //   color: "white",
              //   textAlign: "center",
              //   marginBottom: "17px",
              // }}
              >
                {movies[0].title}
              </p>
            </div>
          </Link>
        </div>
        <div>
          <Link
            to={`/movies/${movies[1].id}`}
            style={{ color: "whitesmoke", textDecoration: "none" }}
          >
            {movies[1].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[1].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[1].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[2].id}`}
            style={{ color: "whitesmoke", textDecoration: "none" }}
          >
            {movies[2].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[2].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[2].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[3].id}`}
            style={{ color: "whitesmoke", textDecoration: "none" }}
          >
            {movies[3].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[3].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[3].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[4].id}`}
          >
            {movies[4].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[4].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[4].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[5].id}`}
          >
            {movies[5].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[5].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[5].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[6].id}`}
          >
            {movies[6].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[6].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[6].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[7].id}`}
          >
            {movies[7].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[7].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[7].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[8].id}`}
          >
            {movies[8].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[8].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[8].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[9].id}`}
          >
            {movies[9].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[9].backdrop_path}`}
                alt="movieposter"
                // style={{ width: "400px" }}
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                // style={{ width: "400px", height: "225px" }}
              />
            )}
            <div>
              <p
              // style={{
              //   fontSize: "1.2rem",
              //   color: "white",
              //   textAlign: "center",
              //   marginBottom: "17px",
              // }}
              >
                {movies[9].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[10].id}`}
          >
            {movies[10].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[10].backdrop_path}`}
                alt="movieposter"
                // style={{ width: "400px" }}
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                // style={{ width: "400px", height: "225px" }}
              />
            )}
            <div>
              <p
              // style={{
              //   fontSize: "1.2rem",
              //   color: "white",
              //   textAlign: "center",
              //   marginBottom: "17px",
              // }}
              >
                {movies[10].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[11].id}`}
          >
            {movies[11].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[11].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p
              // style={{
              //   fontSize: "1.2rem",
              //   color: "white",
              //   textAlign: "center",
              //   marginBottom: "17px",
              // }}
              >
                {movies[11].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[12].id}`}
          >
            {movies[12].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[12].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[12].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[13].id}`}
          >
            {movies[13].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[13].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[13].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[14].id}`}
          >
            {movies[14].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[14].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[14].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[15].id}`}
          >
            {movies[15].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[15].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p
              // style={{
              //   fontSize: "1.2rem",
              //   color: "white",
              //   textAlign: "center",
              //   marginBottom: "17px",
              // }}
              >
                {movies[15].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[16].id}`}
          >
            {movies[16].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[16].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[16].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[17].id}`}
          >
            {movies[17].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[17].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[17].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[18].id}`}
          >
            {movies[18].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[18].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[18].title}</p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            style={{ color: "whitesmoke", textDecoration: "none" }}
            to={`/movies/${movies[19].id}`}
          >
            {movies[19].backdrop_path ? (
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w400${movies[19].backdrop_path}`}
                alt="movieposter"
              />
            ) : (
              <img
                className="img"
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
              />
            )}
            <div>
              <p>{movies[19].title}</p>
            </div>
          </Link>
        </div>
      </AutoplaySlider>
    </div>
  );
};
