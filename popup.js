
function add(){
    let forbidden_list = chrome.storage.sync.get("forbidden_list");
    alert(forbidden_list);
    let length = forbidden_list.length;
    
    if (forbidden_list.includes(window.location.href)){
        alert("This Site is already a forbidden fruit.");
    }
    else{
        if (length == forbidden_list.push(window.location.href)){
            alert("Error. Site could not be added.");
        }
        else{
            chrome.storage.sync.set({"forbidden_list": forbidden_list});
            alert("Site has been added.");
        }
    }

    console.log("list: " + forbidden_list);
}

function rem(){
    let forbidden_list = chrome.storage.sync.get("forbidden_list");
    let length = forbidden_list.length;
    
    const index = forbidden_list.indexOf(window.location.href);
    if (index > -1) {
        forbidden_list.splice(index, 1); // 2nd parameter means remove one item only
        chrome.storage.sync.set({"forbidden_list": forbidden_list});
        alert("Site has been removed.");
    }
    else{
        alert("Error. Site could not be removed.");
    }

    console.log("list: " + forbidden_list);
}


document.getElementById('add').onclick = add;
document.getElementById('rem').onclick = rem;