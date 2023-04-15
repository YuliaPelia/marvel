import { useState } from "react";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundaries/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null); // ноякого персонажа не вибрано

    const onCharSelected = (id) => {
      setChar(id);
    };

    return (
        <>
        <ErrorBoundary>
            <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
            <CharInfo charId={selectedChar} />
            </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;