// creating a model
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const monthhead=document.querySelector(".date h1");
const datehead=document.querySelector(".date p");
const modellabel= document.querySelector(".model-label")
const monthDays = document.querySelector(".days");
const mon=document.getElementById("Months")
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


// Current date and time from browser
const date = new Date();
mon.value=date.getMonth()

mon.addEventListener('change',()=>{
  let option=mon.options[mon.selectedIndex]
  
  date.setMonth(option.value)
  Calendar();
})
const currentmonth=()=>{
  let option=parseInt(mon.selectedIndex);
  return option+1;
}

// fetching the json data from holiday.json
const jsondata=()=>{
  fetch('holiday.json')
    .then(response=>response.json())
    .then(data=>{
        
        for(let l=0;l<data.length;l++){
          let holidayMonth=parseInt(data[l].date.slice(5,7));
          let currentMonth= currentmonth(); 
          if(data[l].date && holidayMonth===currentMonth){
              let holidayDate= parseInt(data[l].date.slice(-2)); 
              let element=document.getElementById(`${holidayDate}`);
              if(data[l].type==="floating"){
                    element.classList.add("floating");
                    element.addEventListener("click",()=>{
                      modal.style.display = "block";
                      modellabel.innerHTML=data[l].label
                    })
                  }
              else if(data[l].type==="public"){
                    element.classList.add("public");
                    element.addEventListener("click",()=>{
                      modal.style.display = "block";
                      modellabel.innerHTML=data[l].label
                    })
                  }
                }
        }
    })
}


const Calendar = () => {




// Getting the last day of the current month like for march it is 31
// 0 in the argument gives the last day
// getDate gives the only date 
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

 
// date.getDay gives the index of the week day like 1 for monday
  const firstDayIndex = date.getDay();
  const lastDayIndex=new Date(date.getFullYear(),
  date.getMonth()+1,0).getDay();
  const nextDays=7-lastDayIndex-1;
 

// date.getMonth() gives the index of the current month like 0 for January
monthhead.innerHTML = months[date.getMonth()];

// date.toDateString gives the current day date year
datehead.innerHTML = new Date().toDateString();

  let days = "";
// creating empty divs as first day may not be sunday
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${""}</div>`;
  }

// Looping through the first day to last day of the month
// checking the date is todays date
  for (let i = 1; i <= lastDay; i++) {

    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today" id="${i}">${i}</div>`;
    } else {
      days += `<div id="${i}">${i}</div>`;
    }
  }
  for(let j=1;j<nextDays;j++){
    days+=`<div class="next-date>${""}</div>`
  }


monthDays.innerHTML = days; 
jsondata()


};











span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  

Calendar();
