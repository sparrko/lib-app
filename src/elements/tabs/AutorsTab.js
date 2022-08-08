import './AutorsTab.css';
import autors from '../../vars/Autors.js';
import booksAutors from '../../vars/BooksAutors.js';
import React, { useState, useEffect } from 'react';
import {
    NavLink
} from "react-router-dom";


function AutorsTab() {
    const [autorsCount, setAutorsCount] = React.useState(autors.list.size);
    const [autorsList, setAutors] = React.useState(autors.list);

    const [focusId, setFocusId] = React.useState(-1);
    const [focusFullName, setFocusFullName] = React.useState("<данные утеряны>");

    function handleDelete(id) {
        autors.delete(id);
        booksAutors.deleteByAutor(id);
        setAutors(autors.list);
        setAutorsCount(autors.list.size);
    }

    return (
        <div className="autors-tab">
            <p class="title-in-tab">Список авторов:</p>
                {autors.list.size === 0 ? (
                    <center>
                        <p style={{margin: 30}}><i>Список пуст</i></p>
                    </center>
                ) : (
                    <table class="table">
                    <tr>
                        <th>ID</th>
                        <th>ФИО</th>
                        <th>Кол-во книг</th>
                        <th colspan="2">Ред.</th>
                    </tr>
                    {
                        Array.from(autorsList.values()).map(item => (
                        <tr>
                            <td style={{ width: 30 }}>{item.id}</td>
                            <td>{item.surname + " " + item.name + " " + item.patr}</td>
                            <td>
                                {
                                    Array.from(booksAutors.list.values())
                                        .filter(booksAutors => booksAutors.idAutor == item.id)
                                        .length
                                }
                            </td>
                            <td class="tdButton" style={{ width: 63 }}>
                            <a href='#confirm'>
                                <img class="tableButton" src="img/delete.png"
                                    onClick={() => { setFocusId(item.id); setFocusFullName(item.surname + " " + item.name + " " + item.patr);  } }
                                    ></img></a>
                                <NavLink to={"/autors/edit/" + item.id}>
                                    <img class="tableButton" src="img/edit.png"
                                        ></img>
                                </NavLink>
                            </td>
                        </tr>
                        ))
                    }
                    </table>
                )}
            <p class="sum">Всего: {autorsCount}</p>
            <NavLink to="/autors/create">
                <button class="btnBlue">Добавить автора</button>
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
                        <p>Вы действительно хотите удалить автора</p><p><b>{focusFullName}</b></p><p style={{marginTop: 20}}> Данное действие не обратимо!</p>
                        <a href="#!"><button class="btnTrans">Нет</button></a>
                        <a href="#!"><button class="btnBlue" onClick={() => handleDelete(focusId)}>Да</button></a>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AutorsTab;
