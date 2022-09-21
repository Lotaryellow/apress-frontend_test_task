"use strict";
const basket = [];
function createBody() {
  const main = document.querySelector("main");
  document.body.appendChild(main);
  API.products.forEach((element) => {
    main.insertAdjacentHTML(
      "beforeend",
      `
      <div class="item">
      <img src="./${element.img}" alt="" />
      <div class="info">
        <p class="infoTextAbout">${element.title}</p>
        <p class="price">${element.price}</p>
      </div>
      <div class="btn">
        <button class="btnOrder" id="${element.id}">Заказать</button>
        <button class="btnBox" id="${element.id}">В Корзину</button>
      </div>
    </div>
    `
    );
  });
  main.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnOrder")) {
      openPopup(e);
    } else if (e.target.classList.contains("btnBox")) {
      addButtonClose(e);
    }
  });
}

function openPopup(e) {
  const element = API.products.find((id) => id.id === +e.target.id);
  document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `
    <div id="popupOrder" class="popupOrder">
      <div class="popupOrderBody">
        <div class="popupOrderContent">
          <div class="popupOrderHeader">
            <p class="popupOrderHeaderText">${element.title}</p>
            <div id="popupX" class="popupX">&#10006</div>
          </div>
          <div class="popupOrderCenter">
            <div class="popupOrderCenterProduct">
              <img class="productImg" src="./${element.img}" alt="" />
              <p class="popupPrice">${element.price}</p>
            </div>
            <div class="productComment">
              <p>Комментарий к заказу:</p>
              <form action="#" method="post">
                <textarea class="commentArea" name="" id=""></textarea>
              </form>
            </div>
          </div>
          <div class="popupOrderFooter">
            <form action="#" method="post">
              <p>Ваш телефон*:</p>
              <input type="tel" />
            </form>
            <button type="submit">Отправить</button>
          </div>
        </div>
      </div>
    </div>
    `
  );
  const popupOrder = document.querySelector(".popupOrder");
  popupOrder.style.display = "block";
  const popupX = document.querySelector(".popupX");
  popupX.onclick = () => {
    popupOrder.style.display = "none";
  };
}

function addButtonClose(e) {
  if (e) {
    basket.push(API.products.find((id) => id.id == e.target.id));
  }
  const popupBox = document.querySelector(".popupBox");
  if (getComputedStyle(popupBox).display === "none") {
    popupBox.style.display = "block";
  }
  const boxCenter = document.querySelector(".boxCenter");
  boxCenter.innerHTML = "";
  basket.forEach((item, index) => {
    boxCenter.insertAdjacentHTML(
      "beforeend",
      `
      <div class="basketItem">
      <img class="boxImg" src="./${item.img}" alt="" />
      <div class="boxInfo">
        <p class="boxTitle">${item.title}</p>
        <p class="boxPrice">${item.price} руб.</p>
      </div>
      <p class="boxClose" id="${index}">X</p>
      </div>
      `
    );
  });
  document.querySelectorAll(".boxClose").forEach((button) => {
    button.addEventListener("click", (event) => {
      basket.splice(event.target.id, 1);
      addButtonClose();
      const popupBox = document.querySelector(".popupBox");
      if (basket.length === 0) {
        popupBox.style.display = "none";
      }
    });
  });
}

createBody();
