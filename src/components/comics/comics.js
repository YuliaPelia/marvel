import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList"
import SingleComic from "../singleComic/SingleComic";
import ErrorBoundary from "../errorBoundaries/ErrorBoundary";
const Comics = () => {
    const [selectedComics, setComics] = useState(null);

    const onComicsSelected = (id) => {
        setComics(id);
    }
    return (
        <div className="app">
            <AppHeader/>
            <AppBanner/>
            <main>
                <ErrorBoundary>
                    <ComicsList onComicsSelected={onComicsSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <SingleComic comicsId={selectedComics}/>
                </ErrorBoundary>

            </main>
        </div>
    )
}
 
export default Comics;