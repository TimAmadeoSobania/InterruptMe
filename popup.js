
function add(){
    let length = interrupt_list.length;
    
    if (interrupt_list.includes(window.location.href)){
        alert("This Site is already a forbidden fruit.")
    }
    else{
        if (length == interrupt_list.push(window.location.href)){
            alert("Error. Site could not be added.")
        }
        else{
            alert("Site has been added.")
        }
    }
}

function rem(){
    let length = interrupt_list.length;
    
    const index = interrupt_list.indexOf(window.location.href);
    if (index > -1) {
        interrupt_list.splice(index, 1); // 2nd parameter means remove one item only
        alert("Site has been removed.")
    }
    else{
        alert("Error. Site could not be removed.")
    }
}


document.getElementById('add').onclick = add;
document.getElementById('rem').onclick = rem;