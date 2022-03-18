/* 1. send ajax request to the api URL
   2. test the request to make sure worked
   3. use the data to create html
   */
  /*
  
  async function useJsonData(){
      let response = await fetch("https://remoteok.com/api");
      let data = await response.json();
      let displayData = await data ;
      return await  displayData;
     
  }
  useJsonData()
  .then(displayData =>{
      let div = document.createElement('div');
      document.body.appendChild(div);
      div.id= "container";
      let container = document.getElementById('container');
      for(let d of displayData){
          let h4s = document.createElement('h4')
          h4s.innerHTML = d.company
          container.appendChild(h4s)
      }
      console.log("THIS IS DISPLAY DATA =>", displayData)
      
  })

*/
const colors = ['cornflowerblue', 'coral', 'blue', 'tan', 'teal', 'tamato', 'green', 'lightgreen', 'lightseagreen']
/* my intention is to use this array and generate the background colors randomy
    depending on the background color the button will either on hover appear white with the same text-color  as the background
        or
    it will appear standard coral with the text-color the same as the background color
        1. write a function 2. accepts the entire .row array as an argument       
        2.loops through it,
        3.test for value of color array element to determine button color
        4.than applys a function to it to change its color at random
        5. using math.random(enter the array length here) wrapped in math.floor() 
        so the number is an integer not a decimal 
*/ 


var xhttp = new XMLHttpRequest();// this is actually an object, and its methods interact with a webserver and website
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //Unlike fetch() respsonse.json() this is not yet parsed but is rendered as a json string still
            // solution? call the JSON.parse(xhttp.responseText) and put the response into the method to be converted to JSON objects
           const container = document.getElementById('container')
            let data = JSON.parse(xhttp.responseText);// if let gives me issues than change to var
            console.log(data)
            /*Now each object (which is a job post must be ) be looped through and accessed individually why?
            because it is part of an array of objects, so if I attempt to display all the data it would show up like this:[object] x 400!
        what to use? a forEach() loop to loop though and add each object to an html element
        */      //WHY THE SLICE? to remove the first obect which is not a job post
        data.slice(1).forEach((row, i) => {
        console.log(row, i)
           let rowDiv = document.createElement('div');
/* Using the innerHtml this way allows me to create multiple elements inside of this div as a string instead on of initiated each one 
        div class logo explained: I placed it at the top because I plan to flex direction - row on it to match the original sights layout    
        rowDiv.classList.add('row')? adding a  class to the div of each row of job posts, for? STYLING
            NOTE: all this is done in the forEach loop, why? because these DOM manipulations is what we want to apply to every objec i.e 'row'

        ${row.tags}? What is going on in the mid-section? because tags is an array of tags, in the tags property, you can use an array method on it 
            as long as it is within the ${} like so ${row.tags.map(()=>)}- you can use a higher order array method inside of it
            why the.map though? why not forEach etc.?    
            */  
           rowDiv.classList.add('row'); 
           
           let generateRandomBackgroundColor = (array, parentEl) => {
               let i;
           let colorIndex = ()=> i = Math.floor(Math.random() * array.length)
           if(parentEl.style.cssText !== 'background-color: white;'){
                colorIndex()
                parentEl.style.cssText = `background-color: ${array[i]}; color:${array[i]}; `;   
           } else {
                parentEl.style.cssText = `background-color: ${array[i]}; color:${array[i]};`;   
     
           }
           }
           
           generateRandomBackgroundColor(colors, rowDiv);
           console.log(rowDiv.style.backgroundColor, 'rowDiv backGround color')
       /* background of button, and tags need to be white, text color needs to be row background
       solution? reuse the generateRandomBackgroundColor on both of these elements text color   
       */
           rowDiv.innerHTML = `
           <div class="img-container">
           <img class="logo" src= ${row.logo}>
           </div>
           <div class = "left-section">
           <h5 class ="company">${row.company}</h5>
           <h3 class ="position">${row.position}</h3>
           <p class = "location">
           ${row.location.split(',').slice(0,2).join('')}
           </p>
           </div>
           <div class ="mid-section" >
           ${row.tags.map((tag)=>{ //the join below is to remove the commas, because map is rendering an array directly on the page
               return `<div class = "tags" >${tag}</div>`
           }).join('')}
           </div>
           <div class="mid-right-section hide-active">
           ${new Date(row.date).toLocaleString()}
           </div>
           <div class="right-section">
           <a href = ${row.url} target = '_blank' >
           <button class="apply" >Apply</button>
            </a>
           </div>
           `
           let apply = document.getElementsByClassName("apply")
           let mid = document.getElementsByClassName('mid-section');
           //mid.style.color = row.style.'background-color';
           /*console.log('mid-section test =>', mid, 'and apply test=>', apply)*/
           container.appendChild(rowDiv);
        });
    }
    // first a loop through every object, a way to generate random numbers from 0- end of array length, store in variable, assign to row
};
xhttp.open("GET", "https://remoteok.com/api", true);
xhttp.send();