let myBtn = document.getElementById("myBtn");
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let hour;
let minute;
let timeLeft;
let isRunning;


document.addEventListener("DOMContentLoaded", function(){
  chrome.storage.local.get(function(result)
  {
    if(Object.keys(result).length === 0 && result.constructor === Object){
      console.log("TADA")
     let data = "false";
     chrome.storage.local.set({'isRunning': data}, function() {
    });
    }
  })

  chrome.storage.local.get(['selectedHour'], function(result) {
    if(result){
      hour = result.selectedHour;
    }
  });
  chrome.storage.local.get(['selectedMinute'], function(result) {
    if(result){
      minute = result.selectedMinute;
    }
  });
  chrome.storage.local.get(['isRunning'], function(result) {
    isRunning = result.isRunning;
  if(isRunning === 'true'){
    document.getElementById("myBtn").classList.remove("btn-primary")
    document.getElementById("myBtn").classList.add("btn-danger")
    document.getElementById("myBtn").innerText = "STOPED"

    countDownAndBuy();
  }
  else{
    document.getElementById("myBtn").classList.add("btn-primary")
    document.getElementById("myBtn").classList.remove("btn-danger")
    document.getElementById("myBtn").innerText = "START"
    clearInterval(timeLeft);
    document.getElementById("demo").innerHTML = "";
  }
  });
});


myBtn.addEventListener("click", async () => {
  chrome.storage.local.get(['isRunning'], function (result) {
    setRunning(result);
    });
})

function countDownAndBuy()  {
   timeLeft = setInterval(function () {
    const etaMs = new Date(year, month, date, hour, minute).getTime() - Date.now();
    var hoursLeft = Math.floor((etaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesLeft = Math.floor((etaMs % (1000 * 60 * 60)) / (1000 * 60));
    var secondsLeft = Math.floor((etaMs % (1000 * 60)) / 1000);
    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = hoursLeft + "h "
      + minutesLeft + "m " + secondsLeft + "s ";
    if (etaMs < 0) {
      clearInterval(timeLeft);
      document.getElementById("demo").innerHTML = "EXPIRED";
      
      // Buy
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs[0].url);
        console.log(tabs[0].id);
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ['myscript.js'],
          });
      });
      document.getElementById("myBtn").classList.add("btn-primary")
      document.getElementById("myBtn").classList.remove("btn-danger")
      document.getElementById("myBtn").innerText = "START"

      chrome.storage.local.set({'isRunning': "false"}, function() {
      });
    }
  }, 1000)
}

// chrome.storage.local.clear();
// chrome.storage.local.get(function(result){console.log(result)})
function setRunning(res) {
  isRunning = res.isRunning;
  chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      if (tabs[0].url.includes("https://entrepot.app/sale")) {

        var timeControl = document.querySelector('input[type="time"]');

        hour = timeControl.value.split(":")[0]
        minute = timeControl.value.split(":")[1]
        let bool;
        if(isRunning === "false" || isRunning === undefined){
          bool = "true";
        }
        else {
          bool = "false";
        }

        if(bool === 'true'){
          document.getElementById("myBtn").classList.remove("btn-primary")
          document.getElementById("myBtn").classList.add("btn-danger")
          document.getElementById("myBtn").innerText = "STOPED"

          countDownAndBuy();
        }
        else{
          document.getElementById("myBtn").classList.add("btn-primary")
          document.getElementById("myBtn").classList.remove("btn-danger")
          document.getElementById("myBtn").innerText = "START";
          clearInterval(timeLeft);
    document.getElementById("demo").innerHTML = "";
        }

        chrome.storage.local.set({'selectedHour': hour, 'selectedMinute': minute, 'isRunning': bool}, function() {
          
        });
        chrome.storage.local.get(['isRunning'], function(result) {

        });
      }
      else {
        alert("Must login and go to Entrepot sale");
      }
    }
  );

}