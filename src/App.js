import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c1cf4c4d5fe283be9162eb56bae31a9&text=airport&per_page=10&page=1&format=json&nojsoncallback=1"
    )
      .then((res) => res.json())
      .then((response) => setData(response.photos["photo"]));
  }, []);

  const search = (rows) => {
    return rows.filter((row) => row.title.toLowerCase().indexOf(query) > -1);
  };

  const photos = search(data);

  return (
    <Container fixed className="App">
      <form style={{ margin: "40px auto", float: "right" }}>
        <input
          type="text"
          placeholder="Search.."
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </form>
      {photos.map((photo) => (
        <Card
          id={photo.id}
          secret={photo.secret}
          server={photo.server}
          key={photo.id}
          title={photo.title}
        />
      ))}
    </Container>
  );
}

export default App;
