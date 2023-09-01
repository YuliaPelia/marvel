import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../service/MarvelService";
// import setContent from "../../utils/setContent";
import "./charList.scss";

const setContent = (process, Component, loandingMore) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
      break;
    case "loading":
      return loandingMore ? <Component /> : <Spinner />;
      break;
    case "confirmed":
      return <Component />;
      break;
    case "error":
      return <ErrorMessage />;
      break;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(585);
  const [charEnded, setCharsEnded] = useState(false);
  const [loandingMore, setLoadingMore] = useState(false);

  const { loading, error, getAllCharacters, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setLoadingMore(false) : setLoadingMore(true);
    getAllCharacters(offset)
      .then(onCharAllLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharAllLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars((chars) => [...chars, ...newChars]);
    setLoadingMore((LoadingMore) => false);
    setOffset((offset) => offset + 9);
    setCharsEnded((charEnded) => ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function ViewItem(arr) {
    const items = arr.map((char, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        char.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={char.id}
          onClick={() => {
            props.onCharSelected(char.id);
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(char.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={char.thumbnail} alt={char.name} style={imgStyle} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading && !loandingMore ? <Spinner /> : null;
  // const content = ViewItem(chars);

  return (
    <div className="char__list">
      {setContent(process, () => ViewItem(chars), loandingMore)}

      <button
        className="button button__main button__long"
        disabled={loandingMore}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">Load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
