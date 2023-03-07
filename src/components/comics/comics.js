import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList"
import SingleComic from "../singleComic/SingleComic";
const Comics = () => {
    return (
        <div className="app">
            <AppHeader/>
            <AppBanner/>
            <ComicsList/>
            {/* <SingleComic/> */}
        </div>
    )
}

export default Comics;