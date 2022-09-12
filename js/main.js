"use strict";
import refs from "./refs.js";

refs.inputs.forEach((e) => e.addEventListener("invalid", handleInvalid));

//possible to change event to 'input' in order to not to wait for validation on losing focus, but trading off optimiztion
refs.form.addEventListener("change", handleChange);
refs.form.addEventListener("submit", handleSubmit);

// add error on invalid input
function handleInvalid(e) {
  e.target.classList.add("input-error");
  e.target.parentNode.style.setProperty("--iconDisplay", "block");
  if (e.target.name === "email") {
    e.target.placeholder = "email@example.com";
    e.target.nextElementSibling.innerHTML = `Looks like this is not an email`;
    return;
  }
  if (e.target.value.trim().length === 0) {
    e.target.nextElementSibling.innerHTML = `${e.target.name} cannot be empty`;
  }
}

// check for validity on input change then remove error
function handleChange(e) {
  e.target.classList.remove("input-error");
  if (e.target.name === "email" && !e.target.validity.valid) return;
  if (e.target.value.trim().length === 0) return;
  e.target.parentNode.style.setProperty("--iconDisplay", "none");
  e.target.nextElementSibling.innerHTML = "";
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(refs.form);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  alert(JSON.stringify(data));
}
