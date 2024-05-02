let bagItemObjects;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".cal");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  if (totalItem == 0) {
    bagSummaryElement.innerHTML = `<h2>Shop with Amazon</h2>`;
    bagSummaryElement.style.borderColor = "white";
    return;
  }
  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.price.original;
    totalDiscount += bagItem.price.original - bagItem.price.current;
    finalPayment = totalMRP - totalDiscount;
  });

  bagSummaryElement.innerHTML = `<div class="price-header">Price Details (${totalItem} items)</div>
    <br />
    <div class="total-mrp">
      <span class="total-val">Total MRP</span>
      <span class="value">Rs ${totalMRP}</span>
    </div>
    <div class="discount-on-mrp">
      <span>Discount on MRP</span>
      <span class="value">Rs ${totalDiscount}</span>
    </div>
    <br />
    <hr />
    <div class="total-amt">
      <span>Total Amount</span>
      <span class="value">Rs ${finalPayment}</span>
    </div>
    <hr />
    <button class="place-order">Place Order</button>`;
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}
function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHtml = ``;
  bagItemObjects.forEach((bagItem) => {
    innerHtml += generateItemHtml(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}
function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagitemId) => bagitemId !== itemId);

  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}
function generateItemHtml(item) {
  return `      <div class="bag-item-container">
    <img src="${item.item_image}" class="bag-item-img" />
    <div class="item-right-part">
                <div class="company">${item.company_name}</div>
                <div class="remove" onclick="removeFromBag(${item.id})">X</div>
                <div class="item-name">${item.title}</div>
            <div class="price">
                <span class="current-price">Rs ${item.price.current} </span>
                <span class="original-price">Rs ${item.price.original}</span>
                <span class="discount">${item.price.discount}% OFF</span>
             </div>
             <div class="return-period">
                 <span class="return-period-days">14 days</span>
                 return available
             </div>
             <div class="delivery">
                 <span class="delivery-time">Delivery within ${item.day} days</span>
                    <br />
                     <br />
                         COD available with FREE delivery
                     <br />
                     ${item.buys}+ bought in last 30 days
            </div>
    </div>
    </div>`;
}
