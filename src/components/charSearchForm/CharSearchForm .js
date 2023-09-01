import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useMarvelService from "../../service/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };
  const errorMessage = error ? (
    <div className="search_error">
      <ErrorMessage />
    </div>
  ) : null;
  const result = !char ? null : char.length > 0 ? (
    <div className="search_char">
      <div className="search_char-seccess">
        There is! Visit {char[0].name} page
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="search_char-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="search">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form className="search_form">
          <label htmlFor="name">Or find a character by name:</label>
          <Field
            id="charName"
            name="charName"
            type="text"
            placeholder="Enter name"
          />
          <button
            type="submit"
            disabled={loading}
            className="button button__main"
          >
            <div className="inner">FIND</div>
          </button>
          <FormikErrorMessage
            component="div"
            className="search_char-error"
            name="charName"
          />
        </Form>
      </Formik>
      {result}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
