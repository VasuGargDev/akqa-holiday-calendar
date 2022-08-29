// creating a model
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
const dates=["2022-01-14","2022-01-26","2022-03-01","2022-03-18","2022-04-15","2022-05-03","2022-08-11","2022-08-15","2022-08-19","2022-10-05","2022-10-24","2022-10-25","2022-10-26","2022-11-08"]
const date = new Date();

// fetching the json data from holiday.json
const jsondata=()=>{
  fetch('holiday.json')
.then(response=>response.json())
.then(data=>{
    console.log(data)
   
    for(let l=0;l<data.length;l++){
        // var holiday_label=document.getElementById("holiday-label")
        
        let holidayMonth=parseInt(data[l].date.slice(5,7));

        // console.log("holidayMonth "+holidayMonth) // holiday

        let currentMonth= currentmonth(); 

        
        // console.log("currentmonth "+currentMonth)

        if(dates.includes(data[l].date) && holidayMonth===currentMonth){
            
            let holidayDate= parseInt(data[l].date.slice(-2)); 
            // console.log("holidayDate"+holidayDate)
            
            var element=document.getElementById(`${holidayDate}`);

            // console.log("element"+element)

            if(data[l].type==="floating"){
                element.classList.add("floating");
                element.addEventListener("click",()=>{
                  modal.style.display = "block";
                  document.querySelector(".model-label").innerHTML=data[l].label
                  // console.log(data[l].label)
                })
                
                
            }
            
            else if(data[l].type==="public"){
                element.classList.add("public");
                element.addEventListener("click",()=>{
                  modal.style.display = "block";
                  document.querySelector(".model-label").innerHTML=data[l].label
                  console.log(data[l].label)
                })


                // document.querySelector(".model-label").innerHTML=data[l].label
                // console.log(data[l].label)
            }
        //     console.log(data[l].label)
         }
         
    }
})
}


const renderCalendar = () => {

   
// setting the first date as the 
  // date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  

  

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${""}</div>`;
  }


  

  for (let i = 1; i <= lastDay; i++) {

    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today day" id="${i}">${i}</div>`;
    } else {
      days += `<div class="day" id="${i}">${i}</div>`;
    }
  }

//   for (let j = 1; j <= nextDays; j++) {
//     days += `<div class="next-date">${j}</div>`;
//     monthDays.innerHTML = days;
//   }
monthDays.innerHTML = days; 
jsondata()


};

// const modalfunction=()=>{
//   modal.style.display = "block";
// }




const mon=document.getElementById("Months")
mon.addEventListener('change',()=>{
    let option=mon.options[mon.selectedIndex]
    // console.log(months[option.value])
    date.setMonth(option.value)
    renderCalendar();
})

const currentmonth=()=>{
    let option=parseInt(mon.selectedIndex);
    return option+1;
}
mon.value=date.getMonth()

span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  

renderCalendar();