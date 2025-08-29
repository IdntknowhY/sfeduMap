import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { Questions } from "./components/Questions";

const buildings = [
  { path: '/a360', building: 'building-a', label: 'Building A' },
  { path: '/b360', building: 'building-b', label: 'Building B' },
  { path: '/d360', building: 'building-d', label: 'Building D' },
  { path: '/g360', building: 'building-g', label: 'Building G' },
  { path: '/i360', building: 'building-i', label: 'Building I' },
  { path: '/e360', building: 'building-e', label: 'Building E' },
  { path: '/k360', building: 'building-k', label: 'Building K' },
];

const PanoramaPage = ({ building }) => (
  <iframe
    src={`http://localhost:8080/maps360/${building}/app-files/index.html`}
    style={{ width: "100%", height: "100vh", border: "none" }}
    title="Panorama Viewer"
  />
);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/questions/:category" element={<Questions />} />
          {buildings.map((b) => (
            <Route
              key={b.path}
              path={b.path}
              element={<PanoramaPage building={b.building} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;