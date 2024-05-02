let bagItems;
onLoad();
function onLoad(){
    let bagItemsStr=localStorage.getItem('bagItems');
    bagItems=bagItemsStr?JSON.parse(bagItemsStr):[];
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();

}
function displayBagIcon(){
    let bagItemCount=document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagItemCount.style.visibility='visible';
        bagItemCount.innerHTML=bagItems.length;
    }
   else{ bagItemCount.style.visibility='hidden';}
}

function displayItemsOnHomePage(){
    let itemsContainerElement=document.querySelector(".items-container");
    if(!itemsContainerElement){return;}
    let innerHtml=``;
    items.forEach(item=>{
        innerHtml+=`<div class="item-container">
        <center><h4 class="title">${item.title}</h4></center>
        <img class="image" src="${item.item_image}"></img>
        <div class="rating">${item.rating.stars} | ${item.rating.noOfReviews}</div>
        <div class="company-name">${item.company_name}</div>
        <div class="price">
        <span class="current-price">Rs ${item.price.current} </span>
        <span class="original-price">Rs ${item.price.original}</span>
        <span class="discount">${item.price.discount}% OFF</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`
    });
    
    itemsContainerElement.innerHTML=innerHtml;

}