import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WeatherPage } from "./pages/weatherPage";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <WeatherPage />
      </div>
      <Footer />
    </>
  );
}

export default App;
