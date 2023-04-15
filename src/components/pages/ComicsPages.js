import { useState } from "react";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import ErrorBoundary from "../errorBoundaries/ErrorBoundary";
const ComicsPages = () => {
  const [selectedComics, setComics] = useState(null);

  const onComicsSelected = (id) => {
    setComics(id);
  };
  return (
    <>
    <AppBanner/>
      <ErrorBoundary>
        <ComicsList onComicsSelected={onComicsSelected} />
      </ErrorBoundary>
      {/* <ErrorBoundary>
        <SingleComic comicsId={selectedComics} />
      </ErrorBoundary> */}
    </>
  );
};

export default ComicsPages;
