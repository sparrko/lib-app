import './BooksTab.css';
import autors from '../../vars/Autors.js';
import books from '../../vars/Books.js';
import booksAutors from '../../vars/BooksAutors.js';
import {
  NavLink
} from "react-router-dom";
import { Field, ErrorMessage, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

function BooksEditTab() {
  var focusIdBook = -1;
  var title;
  var titleButton;
  var b_name;
  var b_yearPublic;
  var b_autors;
  var save_mode;

  function getBook() {
    var i = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length);
    if (i != 'create') {
      focusIdBook = i;
      title = "Редактирование книги";
      titleButton = "Сохранить";
      b_name = books.list.get(focusIdBook).name;
      b_yearPublic = books.list.get(focusIdBook).yearPublic;

      b_autors = Array.from(booksAutors.list.values())
        .filter(bookAutor => bookAutor.idBook === parseInt(focusIdBook))
        .map(bookAutor => (
          Array.from(autors.list.values()).
            filter(autor => autor.id === bookAutor.idAutor).
            map(autor => ({ label: autor.surname + " " + autor.name.substring(0, 1) + ". " + autor.patr.substring(0, 1) + ".", value: autor.id }))
        ))

      var json_costil = JSON.stringify(b_autors);
      json_costil = json_costil.replaceAll("[{", "{");
      json_costil = json_costil.replaceAll("}]", "}");
      b_autors = JSON.parse(json_costil);

      save_mode = "e";
    }
    else {
      title = "Создание книги";
      titleButton = "Создать";
      save_mode = "c";
    }
  }

  const [selectedAutors, setSelectedAutors] = useState(b_autors ? [] : ["error"]);
  const handleChange = (e) => {
    setSelectedAutors(Array.isArray(e) ? e.map(x => x.value) : []);
  };

  return (
    <div className="autors-edit-tab">
      {getBook()}
      <p class="title-in-tab">{title}</p>
      <Formik
        initialValues={{
          name: b_name ?? '',
          yearPublic: b_yearPublic ?? ''
        }}
        onSubmit={(values, { resetForm, formData }) => {
          if (save_mode == "c") {
            books.add(values.name, parseInt(values.yearPublic));
            booksAutors.addAutorsToBook(books.getIdentityKey(), selectedAutors);
            alert("Книга успешно создана!");
            resetForm();
          }
          else {
            books.edit(focusIdBook, values.name, parseInt(values.yearPublic));
            if (selectedAutors != "error") {
              booksAutors.deleteByBook(focusIdBook);
              booksAutors.addAutorsToBook(parseInt(focusIdBook), selectedAutors);
            }
            alert("Книга успешно изменена!");
          }
        }}
        render={({ errors, touched }) => (
          <Form>
            <p class="title-in-form">Название:</p>
            <div className="input-row"><div>
              <Field
                name="name"
                validate={(value) => {
                  let error;
                  if (!value) {
                    error = "Введите название";
                  }
                  return error;
                }} />
            </div>
            </div>
            <p class="title-in-form">Год публикации:</p>
            <div className="input-row"><div>
              <Field
                name="yearPublic"
                validate={(value) => {
                  let error;
                  if (!value) {
                    error = "Введите год публикации";
                  }
                  return error;
                }} />
            </div>
            </div>
            <p class="title-in-form">Выберите авторов:</p>
            <div style={{ marginLeft: 34, marginRight: 34 }}><div>
              <Select
                onChange={handleChange}
                name="autors"
                defaultValue={
                  b_autors ?? null
                }
                options={
                  Array.from(autors.list.values()).
                    map(autor => ({ label: autor.surname + " " + autor.name.substring(0, 1) + ". " + autor.patr.substring(0, 1) + ".", value: autor.id }))
                }
                isMulti />
            </div>
            </div>


            <div class="errors-validate">
              <p><ErrorMessage name="name" /></p>
              <p><ErrorMessage name="yearPublic" /></p>
            </div>

            <div class="form-btns-submit">
              <button type="submit" class="btnBlue mT">{titleButton}</button>
              <NavLink to="/books"><input class="btnTrans mT" type="button" value="Вернуться назад" /></NavLink>
            </div>
          </Form>
        )} />
    </div>
  )
}

export default BooksEditTab;
