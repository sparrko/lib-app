import "./AutorsTab.css";
import autors from "../../vars/Autors.js";
import { NavLink } from "react-router-dom";
import { Field, ErrorMessage, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";

function AutorsEditTab() {
  var focusIdAutor = -1;
  var title;
  var titleButton;
  var a_name;
  var a_surname;
  var a_patr;
  var save_mode;

  function getAutor() {
    var i = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.length
    );
    if (i != "create") {
      focusIdAutor = i;
      title = "Редактирование автора";
      titleButton = "Сохранить";
      a_name = autors.list.get(focusIdAutor).name;
      a_surname = autors.list.get(focusIdAutor).surname;
      a_patr = autors.list.get(focusIdAutor).patr;
      save_mode = "e";
    } else {
      title = "Создание автора";
      titleButton = "Создать";
      save_mode = "c";
    }
  }

  return (
    <div className="autors-edit-tab">
      {getAutor()}
      <p class="title-in-tab">{title}</p>
      <Formik
        initialValues={{
          name: a_name ?? "",
          surname: a_surname ?? "",
          patr: a_patr ?? "",
        }}
        onSubmit={(values, { resetForm }) => {
          if (save_mode == "c") {
            autors.add(values.name, values.surname, values.patr);
            alert("Автор успешно создан!");
            resetForm();
          } else {
            autors.edit(focusIdAutor, values.name, values.surname, values.patr);
            alert("Автор успешно изменен!");
          }
        }}
        render={({ errors, touched }) => (
          <Form>
            <p class="title-in-form">Имя:</p>
            <div className="input-row">
              <div>
                <Field
                  name="name"
                  validate={(value) => {
                    let error;
                    if (!value) {
                      error = "Введите имя";
                    }
                    return error;
                  }}
                />
              </div>
            </div>
            <p class="title-in-form">Фамилия:</p>
            <div className="input-row">
              <div>
                <Field
                  name="surname"
                  validate={(value) => {
                    let error;
                    if (!value) {
                      error = "Введите фамилию";
                    }
                    return error;
                  }}
                />
              </div>
            </div>
            <p class="title-in-form">Отчество:</p>
            <div className="input-row">
              <div>
                <Field
                  name="patr"
                  validate={(value) => {
                    let error;
                    if (!value) {
                      error = "Введите отчество";
                    }
                    return error;
                  }}
                />
              </div>
            </div>

            <div class="errors-validate">
              <p>
                <ErrorMessage name="name" />
              </p>
              <p>
                <ErrorMessage name="surname" />
              </p>
              <p>
                <ErrorMessage name="patr" />
              </p>
            </div>

            <div class="form-btns-submit">
              <button type="submit" class="btnBlue mT">
                {titleButton}
              </button>
              <NavLink to="/autors">
                <input
                  class="btnTrans mT"
                  type="button"
                  value="Вернуться назад"
                />
              </NavLink>
            </div>
          </Form>
        )}
      />
    </div>
  );
}

export default AutorsEditTab;
