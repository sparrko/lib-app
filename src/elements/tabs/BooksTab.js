import './BooksTab.css';
import books from '../../vars/Books.js';
import autors from '../../vars/Autors.js';
import booksAutors from '../../vars/BooksAutors.js';
import React, { useState, useEffect } from 'react';
import {
    NavLink
} from "react-router-dom";

function BooksTab() {
    const [booksCount, setBooksCount] = React.useState(books.list.size);
    const [booksList, setBooks] = React.useState(books.list);
    const [booksAutorsList] = React.useState(booksAutors.list);
    const [autorsList] = React.useState(autors.list);

    const [focusId, setFocusId] = React.useState(-1);
    const [focusName, setFocusName] = React.useState("<данные утеряны>");

    function handleDelete(id) {
        books.delete(id);
        booksAutors.deleteByBook(id);
        setBooks(books.list);
        setBooksCount(books.list.size);
    }

    return (
        <div className="autors-tab">
            <p class="title-in-tab">Список книг:</p>
            {books.list.size === 0 ? (
                <center>
                    <p style={{ margin: 30 }}><i>Список пуст</i></p>
                </center>
            ) : (
                <table class="table">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Дата публикации</th>
                        <th>Авторы</th>
                        <th colspan="2">Ред.</th>
                    </tr>
                    {
                        Array.from(booksList.values()).map(book => (
                            <tr>
                                <td style={{ width: 30 }}>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.yearPublic}</td>
                                <td>
                                    {
                                        Array.from(booksAutorsList.values())
                                            .filter(bookAutor => bookAutor.idBook === book.id)
                                            .map(bookAutor => (
                                                Array.from(autorsList.values()).
                                                    filter(autor => autor.id === bookAutor.idAutor).
                                                    map(autor => (
                                                        <p>{autor.surname + " " + autor.name.substring(0, 1) + ". " + autor.patr.substring(0, 1) + "."}</p>
                                                    ))
                                            ))}
                                </td>
                                <td class="tdButton" style={{ width: 63 }}>
                                    <a href='#confirm'>
                                        <img class="tableButton" src="img/delete.png"
                                            onClick={() => { setFocusId(book.id); setFocusName(book.name); }}
                                        ></img>
                                    </a>
                                    <NavLink to={"/books/edit/" + book.id}>
                                        <img class="tableButton" src="img/edit.png"
                                        ></img>
                                    </NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            )}
            <p class="sum">Всего: {booksCount}</p>
            <NavLink to="/books/create">
                <button class="btnBlue">Добавить книгу</button>
            </NavLink>

            {/* Confirm */}
            <div id="confirm" class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Подтвердите удаление</h3>
                            <a href="#close" title="Close" class="close">×</a>
                        </div>
                        <div class="modal-body">
                            <p>Вы действительно хотите удалить книгу с названием</p><p><b>{focusName}</b></p><p style={{ marginTop: 20 }}> Данное действие не обратимо!</p>
                            <a href="#!"><button class="btnTrans">Нет</button></a>
                            <a href="#!"><button class="btnBlue" onClick={() => handleDelete(focusId)}>Да</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksTab;
