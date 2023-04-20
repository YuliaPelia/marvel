import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

import Spinner from "../spinner/Spinner";
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPages = lazy(() => import("../pages/ComicsPages"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

/* 1,03 МБ */
// 1,07 МБ (1 122 878 байтів)
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPages />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
