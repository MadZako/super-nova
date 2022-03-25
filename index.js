let order=[]


function planets(planet){
    for(let i=0; i<planet.length; i++){
        order.push(planet)
        console.log(order)
    }
}

planets("Mercury", "Venus", "Earth")