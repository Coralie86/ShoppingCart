import {useState} from "react";
import style from "../Styles/toast.module.css"

export default function Toast({text, onClose}){   

    return(
    <div className={style.toastContainer} onAnimationEnd={onClose}>
        {text}
    </div>
    )
}
