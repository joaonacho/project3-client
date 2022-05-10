import React from "react";

export const MovieCredits = ({ movieCast, movieCrew }) => {
  console.log(movieCrew);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {movieCast &&
          movieCast.map((credit) => {
            return (
              <article
                style={{
                  width: "80px",
                  boxShadow: "0 0 25px black",
                  backgroundColor: "purple",
                  borderRadius: "8px 8px 8px 0",
                }}
              >
                {credit.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${credit.profile_path}`}
                    alt="castpicture"
                    style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
                  />
                ) : (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                    }
                    alt="castpicture"
                    style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
                  />
                )}
                <div style={{ width: "80px" }}>
                  <p style={{ padding: "7px" }}>{credit.name}</p>
                  <p style={{ padding: "7px", color: "grey" }}>
                    as {credit.character}
                  </p>
                </div>
              </article>
            );
          })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {movieCrew &&
          movieCrew.map((crew) => {
            return (
              <article
                style={{
                  width: "80px",
                  boxShadow: "0 0 25px black",
                  backgroundColor: "purple",
                  borderRadius: "8px 8px 8px 0",
                }}
              >
                {crew.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${crew.profile_path}`}
                    alt="castpicture"
                    style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
                  />
                ) : (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                    }
                    alt="castpicture"
                    style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
                  />
                )}
                <div style={{ width: "80px" }}>
                  <p style={{ padding: "7px" }}>{crew.name}</p>
                  <p style={{ padding: "7px", color: "grey" }}>{crew.job}</p>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
};
