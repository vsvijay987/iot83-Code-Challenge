import { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (query === "") return;
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c1cf4c4d5fe283be9162eb56bae31a9&text=${query}&per_page=10&page=${page}&format=json&nojsoncallback=1`
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.photos["photo"]);
      });
  }, [query, page]);

  return (
    <Container fixed>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4">IOT83 Code Challenge</Typography>
      </div>
      <form
        style={{ margin: "40px auto", float: "right" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search.."
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value.toLowerCase());
          }}
        />
      </form>
      {!query ? (
        <Typography variant="subtitle3">
          Please enter a search term in the search box !
        </Typography>
      ) : (
        <div className="App">
          <div style={{ textAlign: "center" }}>
            <Typography variant="subtitle1">Page: {page}</Typography>
          </div>
          {data.map((photo) => (
            <Card
              id={photo.id}
              secret={photo.secret}
              server={photo.server}
              key={photo.id}
              title={photo.title}
            />
          ))}
          <div className="pagination">
            <Pagination
              count={10}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default App;
