import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ShowList from "./components/ShowList";
import ShowAdder from "./components/ShowAdder";

function App() {
  const [tvList, setTvList] = useState([
    { showName: "The Traitors" },
    { showName: "The Simpsons" },
    { showName: "Only Connect" },
  ]);

  return (
    <section>
      <Header />
      <ShowList tvList={tvList} />
      <ShowAdder setTvList={setTvList} />
    </section>
  );
}

export default App;
