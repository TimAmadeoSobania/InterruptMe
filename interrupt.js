/*
This is a simple tool to interuppt entering a website. If the site is loaded a message will be displayed to wait for a timer if you want to 'waste' your time on that website.

Having 'last_executed' being a timer instead of a boolean is so that in the future it can be changed so that the interrupt occures again after a certain time.
*/

chrome.storage.sync.set({"forbidden_list": ["https://www.youtube.com/", "https://www.reddit.com/"]});
chrome.storage.sync.set({"alternatives_list": ["https://medium.com/", "https://github.com/TimAmadeoSobania?tab=repositories"]});
console.log("new load");
var start = new Date;

//execute once and then recheck the site every x ms
check_site();
setInterval(check_site, 1000*60)

function check_site() {
  let le = sessionStorage.getItem("last_executed");
  chrome.storage.sync.get(["forbidden_list"], function(result){
    let forbidden_list = result.forbidden_list
    console.log("list: " + forbidden_list);
    console.log("le: " + le);
    //is this a forbidden website and has the script never been executed or is the last execute more then x seconds ago
    if(forbidden_list.includes(window.location.href) && (le == null || (Date.now() - le)/1000 > 60*15 )) {
      console.log("should be interrupted");
      start = new Date;
      //start countdown and update every second
      countdown = setInterval(interrupt, 1000);
    }
  });
  
}
 
function interrupt() {
  let interrupt_timer = 10000;
  console.log("interrrupted" + start);
  console.log((interrupt_timer - (new Date - start))/1000);
  //if timer has expired
  if ((interrupt_timer - (new Date - start))/1000 < 1){
    sessionStorage.setItem("last_executed" , Date.now());
    //reload the page
    window.location.reload(false);
    clearInterval(countdown);
  }
  else{
    //else display message with timer in seconds
    let timer_string = "If you really want to waste your time here wait for " + Math.trunc((interrupt_timer - (new Date - start))/1000) + " seconds.";
    let alternatives_string = "";
    chrome.storage.sync.get("alternatives_list", function(result){
      let alternatives_list = result.alternatives_list
      for(let i = 0; i < alternatives_list.length; i++){
        alternatives_string += "<li>" + alternatives_list[i].link(alternatives_list[i]) + "</li>";
      }
      //document.querySelector('html').innerHTML = '<h2>Youtube interrupt</h2> <p>' + timer_string + '</p> <p>' + alternatives_string + '</p> <p>' + end_string + '</p>';
      let newHTML = document.open();
      newHTML.write(
        '<h2 id="title">Youtube interrupt</h2>'
        + '<timer id="timer">' 
        + timer_string 
        + '</timer>'

        + '<alternatives_title id="alternatives_title">'
        + "Maybe you rather want to look at this: "
        + '</alternatives_title>'
        + '<ul>' 
        + alternatives_string 
        + '</ul>'

        + '<end_string id="end_str">' 
        + "...or do that something you really NEED to do."
        + '</end_string>');

      newHTML.close();
    });
  }
}
