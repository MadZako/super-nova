const removeCartItemBtn = document.getElementsByClassName('btn-danger');
console.log(removeCartItemBtn);
for(let i = 0; i < removeCartItemBtn.length; i++) {
    const button = removeCartItemBtn[i]
    button.addEventListener('click', function(event) {
        const buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove 
    })
}

function updateCartTotal () {
    const cartItemCOntainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemsContainer.getElementsByClassName
}