let cardContainer = document.getElementById("cardContainer");

async function fetchApi() {
  try {
    let res = await fetch("https://uzum-server-1.onrender.com/Products");
    if (!res.ok) {
      throw new Error(`Xato: ${res.status} - ${res.statusText}`);
    }

    let produkt = await res.json();
    if (!produkt || produkt.length === 0) {
      console.warn("Endpointdan malumot kemadi.");
      return;
    }

    cardQosh(produkt);
  } catch (error) {
    console.error("Ma'lumot olishda xatolik:", error);
    let errorSms = document.createElement("p");
    errorSms.className = "error";
    errorSms.textContent =
      "Malumot olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
    cardContainer.appendChild(errorSms);
  }
}

function cardQosh(produkt) {
  produkt.forEach((product) => {
    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    card.appendChild(img);

    let title = document.createElement("h2");
    title.textContent = product.title;
    card.appendChild(title);

    let malumot = document.createElement("p");
    malumot.className = "description";
    malumot.textContent = product.description;
    card.appendChild(malumot);

    let priceContainer = document.createElement("div");
    priceContainer.className = "price-container";

    let price = document.createElement("p");
    price.className = "price";
    price.textContent = `${product.price} $`;
    priceContainer.appendChild(price);

    if (product.oldPrice) {
      let oldPrice = document.createElement("p");
      oldPrice.className = "old-price";
      oldPrice.textContent = `${product.oldPrice} $`;
      priceContainer.appendChild(oldPrice);
    }

    card.appendChild(priceContainer);

    let button = document.createElement("div");
    button.className = "button";
    button.textContent = "Sotib olish";
    card.appendChild(button);

    cardContainer.appendChild(card);
  });
}

fetchApi();
