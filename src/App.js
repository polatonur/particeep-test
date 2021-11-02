import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import MovieList from "./components/MovieList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MovieList />
      </div>
    </Provider>
  );
}

export default App;
