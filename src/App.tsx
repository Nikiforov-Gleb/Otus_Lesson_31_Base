import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WeatherPage } from "./pages/weatherPage";
import { AboutPage } from "./pages/aboutPage";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route index element={<WeatherPage />} />
          <Route path="weather/:city" element={<WeatherPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<div>Что-то пошло не так :(</div>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
