import { useState } from "react";
import style from './newstudy.module.scss';
import {Link} from 'react-router-dom';

export default function CreateStudy() {

return(
    <div className={style.card} id="newproject__container">
    <h1>Create a new study</h1>
    <form>
        <label>Study Title:</label>
        <input type="text" name="title"></input>
        <label>Description:</label>
        <textarea></textarea>
        <Link to={"questions"}><input className={style.submit} id="newProject__submit" type="submit"></input></Link>
    </form>
    </div>
);
}
