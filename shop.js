// elements references
const productsContainer=document.getElementById("productsContainer");
const CartContainer=document.getElementById("CartContainer");
const feedback=document.getElementById("feedback");
const clearbtn=document.getElementById("ClearCart");
const Sortbyprice=document.getElementById("Sortbyprice");
//default products
const products=[
    {
        id:1,
        name:"Iphone",
        price:50000

    },
    {
        id:2,
        name:"Ipad",
        price:60000

    },
    {
        id:3,
        name:"Laptop",
        price:70000

    },
    {
        id:4,
        name:"Tv",
        price:80000

    },
   

];
//empty cart
const Cart=[];
//renderproductsDetails
function renderingproductdetails(){
    products.forEach(function(product){
    const {id,name,price}=product;
    const divElement=document.createElement("div");
    divElement.className="products-row";
    divElement.innerHTML=` 
            <p> ${name} - Rs ${price}</p>
            <button onclick="addToCart(${id})">Add to Cart</button>
    `;
    productsContainer.appendChild(divElement);
    });  
}       
//renderCartDetails
function renderCartDetails(){
    CartContainer.innerHTML="";
    Cart.forEach(function(product){
        const {id,name,price}=product;
        const CartItem=`<div class="products-row">
                    <p>${name} - Rs ${price}</p>
                    <button onclick="removeFromCart(${id})">Remove</button>
                </div>`;
        CartContainer.insertAdjacentHTML("beforeend", CartItem);
    });
    // let totalprice=0  
    // for(let i=0;i<Cart.length;i++){
    //     totalprice=totalprice+Cart[i].price;
    // }
   const totalprice= Cart.reduce(function(acc,pro){
        return acc+pro.price;
    },0);
    const total=document.getElementById("totalprice")
    total.textContent=`Rs.${totalprice}`

}                    
//add to cart
function addToCart(id){
    const isProductAvailable=Cart.some(function(product){
        return product.id === id;
    });
    
    
    if (isProductAvailable){
        updateuserfeedback(`item already added to the cart`,"error")
        // feedback.style.background="red"
        return;
    }
    const productToAdd=products.find(function(product){
        return product.id===id;
    });
    Cart.push(productToAdd);
    console.log(Cart);
    renderCartDetails()
    updateuserfeedback(`${productToAdd.name} is added to the cart`,"success")
}
    

function removeFromCart(id){
    const product= Cart.find((product)=>product.id===id);
const productIndex=Cart.findIndex((product)=>product.id ===id);
Cart.splice(productIndex,1)

updateuserfeedback(`${product.name} is removed`)
renderCartDetails();
}


let timerid;
function updateuserfeedback(msg,type){
    clearTimeout(timerid)
    feedback.style.display="block";
    if(type==="success"){
        feedback.style.background="green"
    }
    if(type==="error"){
        feedback.style.background="red"
    }
    feedback.textContent=msg
   timerid= setTimeout(function(){
        feedback.style.display="none";
    },3000)};
clearbtn.addEventListener('click',()=>{
console.log("clearing");
Cart.length=0
updateuserfeedback("Cart is cleared")
renderCartDetails()

});

// const marks=[1,4,12,23,3446,36,35356,3,6,36,346]
// marks.sort((a,b)=>b-a)
// console.log(marks);
Sortbyprice.addEventListener('click',()=>{
    Cart.sort(function(item1,item2){
        return item2.price-item1.price;
    });
    renderCartDetails()
});
renderingproductdetails()