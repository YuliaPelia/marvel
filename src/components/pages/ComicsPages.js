import { useState } from "react";
import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundaries/ErrorBoundary";
const ComicsPages = () => {
  const [selectedComics, setComics] = useState(null);

  const onComicsSelected = (id) => {
    setComics(id);
  };
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />

        <title>Comics Page</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList onComicsSelected={onComicsSelected} />
      </ErrorBoundary>
    </>
  );
};

export default ComicsPages;
