const menuToggle = document.querySelector('.toggle')
const showcase = document.querySelector('.showcase')

menuToggle.addEventListener('click',() => {
    menuToggle.classList.toggle('active')  //if it's appplied we're gonna remove it's not there we add it
    //^classList allows to add or remove a class// we want to toggle the specific class of active
    //^will change to the close button with active
    showcase.classList.toggle('active')
    //^will move over 300px with active
})