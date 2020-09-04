var cart = JSON.parse(localStorage.getItem("myCart")) || [];

const btnAddToCart = $(".btnAddToCart");
const cartContent = $("#MainChat .modal-body");

cart.forEach(cartItem=>{
    var product = cartItem;
       InsertCartDom(product);

       HandleAction(product)

})


btnAddToCart.on("click", function() {
    var product = {
        name:$(this).parent().find(".productName").text().trim(),
        price:$(this).parent().find(".productPrice").text(),
        image:$(this).parent().find("img").attr("src"),
        quantity:1
    } 
    console.log(product)
    const isInCart = cart.filter(cartitem=>cartitem.name === product.name).length>0
    if(!isInCart) {
       InsertCartDom(product)

        cart.push(product);
        localStorage.setItem("myCart",JSON.stringify(cart))

        HandleAction(product)
    }
})


function InsertCartDom(product) {
    cartContent.append (
        `
       <div class="cart-item d-flex flex-wrap align-items-center justify-content-between">
       <img width="20%" class="img-fluid" src="${product.image}" alt="">
       <h5 class="productName">${product.name}</h5>
       <p class="productPrice">${product.price}</p>
       <button  class="btn btn-sm btn-primary btnCartDecrease">&minus;</button>
       <h5 class="productQuantity">${product.quantity}</h5>
       <button  class="btn btn-sm btn-primary btnCartIncrease">&plus;</button>
       <button  class="btn btn-sm btn-danger btnCartDelete">&times;</button>
      </div>
           `
       )
}

function HandleAction(product) {
    const cartItemsDom = document.querySelectorAll(".cart-item");
        cartItemsDom.forEach(function(cartItemDom) {
            var proName = cartItemDom.querySelector(".productName").innerText;
            if(proName === product.name) {
                cartItemDom.querySelector(".btnCartDelete").addEventListener("click", ()=> RemoveItem(cartItemDom,product))
                cartItemDom.querySelector(".btnCartIncrease").addEventListener("click",()=> IncreaseItem (cartItemDom, product))
                cartItemDom.querySelector(".btnCartDecrease").addEventListener("click", ()=> Decrease (cartItemDom, product))
            }
        })
}

function RemoveItem(cartItemDom, product){
    cart.forEach(cartItem=> {
        if(cartItem.name===product.name){
            cartItemDom.remove();
            cart = cart.filter(cartItem=>cartItem.name!==product.name)
            localStorage.setItem("myCart",JSON.stringify(cart))
        }
    })
}

function IncreaseItem (cartItemDom, product) {
    cart.forEach(cartItem=> {
        if(cartItem.name === product.name){
           cartItemDom.querySelector(".productQuantity").innerText=++cartItem.quantity;
           localStorage.setItem("myCart",JSON.stringify(cart))
        }
    })
}

function Decrease (cartItemDom, product) {
    cart.forEach(cartItem=> {
        if(cartItem.name === product.name){
            if (cartItem.quantity > 1) {
                cartItemDom.querySelector(".productQuantity").innerText= --cartItem.quantity;
                localStorage.setItem("myCart",JSON.stringify(cart))
            }else {
                cartItemDom.remove();
                cart = cart.filter(cartItem => cartItem.name !== product.name)
                localStorage.setItem("myCart",JSON.stringify(cart))
            }
            }
    })
}