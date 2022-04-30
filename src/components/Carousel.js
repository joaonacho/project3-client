import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";

export const Carousel = ({ movies }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={Math.round(Math.random() * 3000) + 1500}
        style={{
          width: "400px",
          height: "270px",
        }}
        bullets={false}
        organicArrows={true}
      >
        <div>
          <Link
            to={`/movies/${movies[0].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[0].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[0].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[0].title}
              </p>
            </div>
          </Link>
        </div>
        <div>
          <Link
            to={`/movies/${movies[1].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[1].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[1].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[1].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[2].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[2].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[2].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[2].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[3].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[3].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[3].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[3].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[4].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[4].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[4].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[4].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[5].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[5].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[5].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[5].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[6].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[6].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[6].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[6].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[7].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[7].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[7].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[7].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[8].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[8].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[8].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[8].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[9].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[9].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[9].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[9].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[10].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[10].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[10].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[10].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[11].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[11].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[11].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[11].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[12].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[12].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[12].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[12].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[13].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[13].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[13].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[13].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[14].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[14].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[14].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[14].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[15].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[15].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[15].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[15].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[16].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[16].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[16].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[16].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[17].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[17].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[17].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[17].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[18].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[18].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[18].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[18].title}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={`/movies/${movies[19].id}`}
            style={{ textDecoration: "none" }}
          >
            {movies[19].backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movies[19].backdrop_path}`}
                alt="movieposter"
                style={{ width: "400px" }}
              />
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
                }
                alt="movieposter"
                style={{ width: "400px", height: "225px" }}
              />
            )}
            <div style={{ backgroundColor: "purple", height: "43px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "17px",
                }}
              >
                {movies[19].title}
              </p>
            </div>
          </Link>
        </div>
      </AutoplaySlider>
    </div>
  );
};
