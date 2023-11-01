"use strict";
import {getParamFromURL} from "./card-item.js";

const TELEGRAM_BOT_TOKEN = "6935673036:AAF8lPHK42jZko7gGrntvhV2fMDa03CLr_o";
const TELEGRAM_CHAT_ID = "@RealEstateOrder1";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const form = document.querySelector(".form");
form.addEventListener("submit", sendEmailTelegram);

export default async function sendEmailTelegram(event) {
  event.preventDefault();
  const form = event.target;
  const formBtn = document.querySelector(".form__submit-button button");
  const formSendResult = document.querySelector(".form__send-result");
  formSendResult.textContent = "";

  const { name, message, email, phone } = Object.fromEntries(
    new FormData(form).entries()
  );
  const cardId = Number(getParamFromURL("id"));
  const text = `заявка от ${name} , тел: ${phone}, емейл: ${email}, тект: ${message}, id заявки: ${cardId} `;
  console.log(name, message, email, phone);

  try {
    formBtn.textContent = "loading...";
    const response = await fetch(API, {
      method: "POST",
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      formSendResult.textContent =
        "Спасибо за сообщение. Мы свяжемся с Вами в ближайшее время.";
      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    formSendResult.textContent = "Сообщение не отправлено, попробуйте позже.";
    formSendResult.style.color = "red";
  } finally {
    formBtn.textContent = "отправить";
  }
}
