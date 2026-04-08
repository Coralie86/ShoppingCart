import {useState } from "react";
import style from "../Styles/errorElement.module.css"
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/ShoppingCart/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};