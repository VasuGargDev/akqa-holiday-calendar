let modal = document.getElementById("myModal");
let modalcontent=document.querySelector("#modal-content")
let span = document.getElementsByClassName("close")[0];
let modellabel=document.querySelector("#model-label")
let monthhead=document.querySelector(".date h1")
let datehead=document.querySelector(".date p")
let mon=document.getElementById("Months")
let monthDays = document.querySelector(".days");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


// Current date and time 
const date = new Date();
// function for handling errors while fetching data
const handleErrors=(response)=> {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response.json();
}
// function for fetching the data from json file
const jsondata=()=>{

  fetch('holiday.json')
    .then(handleErrors)
    .then(data=>{
        // traversing the whole json data
        for(let l=0;l<data.length;l++){
          let holidayMonth=parseInt(data[l].date.slice(5,7));
          let currentMonth= currentmonth(); 
          // checking if the holiday date in current month
          if(data[l].date && holidayMonth===currentMonth){
              let holidayDate= parseInt(data[l].date.slice(-2)); 
              let element=document.getElementById(`${holidayDate}`);
              if(data[l].type==="floating"){
                // setting the color of the floating holidays
                    element.classList.add("floating");
                  // on click event for the modal pop up
                    element.addEventListener("click",()=>{
                      modal.style.display = "block";
                      modalcontent.classList.add("floating")
                      modellabel.innerHTML=data[l].label
                    })
                  }
              else if(data[l].type==="public"){
                // setting the color of the public holidays
                    element.classList.add("public");
                     // on click event for the modal pop up
                    element.addEventListener("click",()=>{
                      modal.style.display = "block";
                      modalcontent.classList.add("public")
                      modellabel.innerHTML=data[l].label
                    })
                  }
                }
            }
          }).catch(error=>{
            monthDays.innerHTML=`<h1>${error}</h1>`
            console.log("error"+error)
            
            
          })
        }




// getMonth() 	Get the month as a number (0-11)
//getFullYear() 	Get the year as a four digit number (yyyy)
//toDateString() interprets the date in the local timezone and formats the date part in English.
//getDate() returns the day of the month (from 1 to 31) of a date:
//Get the weekday as a number (0-6)
const Calendar = () => {
  // setting the current date=1 to get the day of the first date of the month to set the previous days of the month
  date.setDate(1);
  console.log(date)

// Getting the last date of the current month like 30 or 31 or 28
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

 
  //getDay() 	Get the weekday as a number (0-6)
  const firstDayIndex = date.getDay();
  
  
// getting the last day of the current month as(0-6)
  const lastDayIndex = new Date(
    date.getFullYear(),date.getMonth() + 1, 0 ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  monthhead.innerHTML = months[date.getMonth()];

  datehead.innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${""}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    // setting the cuurent date to colourful
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today" id="${i}">${i}</div>`;
    } else {
      days += `<div id="${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <=nextDays; j++) {
    days += `<div class="next-date">${""}</div>`;
  }


monthDays.innerHTML = days; 
jsondata()


};






// Event listener as the dropdown month changes
mon.addEventListener('change',()=>{
    let option=mon.options[mon.selectedIndex]
    date.setMonth(option.value)
    Calendar();
})
// getting the month value from the dropdown in number
const currentmonth=()=>{
    let option=parseInt(mon.selectedIndex);
    return option+1;
}
mon.value=date.getMonth()
// dark mode and light mode
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
// function to close the modal pop-up
span.onclick = function() {
    modal.style.display = "none";
    modalcontent.removeAttribute("class")
  }
  
// function to close the modal pop up 
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalcontent.removeAttribute("class")
    }
  }
  

Calendar();
