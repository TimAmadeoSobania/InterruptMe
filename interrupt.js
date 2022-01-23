/*
This is a simple tool to interuppt entering a website. If the site is loaded a message will be displayed to wait for a timer if you want to 'waste' your time on that website.

Having 'last_executed' being a timer instead of a boolean is so that in the future it can be changed so that the interrupt occures again after a certain time.
*/

var interrupt_list = ["https://www.youtube.com/", "https://www.reddit.com/"]
var alternative_list = ["https://medium.com/", "https://github.com/TimAmadeoSobania?tab=repositories"]
var last_executed = window.sessionStorage.getItem("last_executed");
console.log("new load");
console.log((new Date - last_executed));

//execute this only once in a new session
if(interrupt_list.includes(window.location.href) && (last_executed == null || (new Date - last_executed) > 10000)){
  console.log("new timer");
  console.log((new Date - last_executed));
  var start = new Date;
  //start interval
  myInterval = setInterval(interrupt, 1000);
}

function interrupt() {
  let interrupt_timer = 10000;
  //if timer has expired
  if ((interrupt_timer - (new Date - start))/1000 < 1){
    window.sessionStorage.setItem("last_executed", new Date)
    //reload the page
    window.location.reload(false);
    clearInterval(myInterval);
  }
  else{
    //else display message with timer in seconds
    let timer_string = "If you really want to waste your time on Youtube wait for " + Math.trunc((interrupt_timer - (new Date - start))/1000) + " seconds.";
    let alternatives_string = "Maybe you rather want to look at this: ";
    let end_string = "...or do that something you really NEED to do."
    for(let i = 0; i < alternative_list.length; i++){
      alternatives_string += alternative_list[i].link(alternative_list[i]) + " ";
    }
    document.querySelector('html').innerHTML = '<h2>Youtube interrupt</h2> <p>' + timer_string + '</p> <p>' + alternatives_string + '</p> <p>' + end_string + '</p>';
  }
}
