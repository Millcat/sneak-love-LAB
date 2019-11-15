import apiService from "./api-service.js";

const checkBoxes = document.querySelectorAll(".checkbox");
const sneakersContainer = document.getElementById("products_grid");


function updateList(sneakers) {
    sneakersContainer.innerHTML = "";
    sneaker.forEach(sneaker => {
        const tpl = `<a href="/one-product/${sneaker.id}" class="product-item-wrapper">
          <div class="product-img">
              <img src="https://i1.adis.ws/i/jpl/jd_333960_a?qlt=80&amp;w=600&amp;h=425&amp;v=1&amp;fmt=webp" alt="Woman model : what a nice pair of kicks">
          </div>
          <p class="product-name">${sneaker.name}</p>
          <p class="product-cat">${sneaker.category}</p>
          <p class="product-price">${sneaker.price}</p>
      </a>`;
        sneakersContainer.innerHTML += tpl;
    });
}

function handleInput(evt) {
    console.log(document.querySelectorAll("[data-tag-id]"))
    apiService
        .post(`/filtered-tags`, {
            toto: [2, 3, 4, 5]
        })
        .then(apiRes => {
            console.log(apiRes.data);
            // updateList(apiRes.data);
        })
        .catch(apiErr => {
            console.log(apiErr);
        });
}

checkBoxes.forEach(checkbox => {
    checkbox.oninput = handleInput;
})