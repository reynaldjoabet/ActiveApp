
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
const todo=document.querySelector('.todo-list');
const table=document.querySelector('.table');
const add=document.querySelector('.bx-plus');
const weektodo=document.querySelector('.todo');


const completed=document.querySelector(".cgoals");
const uncompleted=document.querySelector(".ugoals");
const points=document.querySelector(".pgained");
const num=document.querySelector(".num");


allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

add.style.color= "blue";
add.addEventListener("onclick",(e)=>{
  console.log("hello")
})
console.log(todo.nodeName)
 
// 
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})


//const dashboard=document.getElementById('dashboard');
fetch('http://localhost:3000/v1/active/dashboarddata')
   .then(res=>res.json())
   .then(resp=>{ 
      
    console.log(resp.trainingPlans.length)
    if(resp.trainingPlans.length!=0)   {
       
       for (let i=0;i<resp.trainingPlans.length;i++){
         const week=`${resp.trainingPlans[i].week}`;
  
        for (let j=0;j<resp.trainingPlans[i].goals.length;j++){
            const content= document.createElement('div');
            if(resp.trainingPlans[i].goals[j].completed==true){
              
           

               const tr = document.createElement('tr');

               const td1 = document.createElement('td');
              const p1 = document.createElement('p');
              p1.textContent=`${resp.trainingPlans[i].goals[j].name}`;
                   td1.appendChild(p1);
                   const td2 = document.createElement('td');
                   td2.textContent=`${resp.trainingPlans[i].goals[j].date}`;
                   const td3 = document.createElement('td');
                   const span = document.createElement('span');
                  span.setAttribute("class","status completed");
                  span.textContent="Completed";
                  td3.appendChild(span);
                

                  const td4 = document.createElement('td');
                   
                  
                  const a2=document.createElement('a');
                 
             
                  a2.href=`/v1/active/deletegoal`;
                  

                  const span5 = document.createElement('span');
                  span5.setAttribute("class","bx bxs-trash-alt");
                  span5.setAttribute("id",`${j+1}`);
                  span5.style.color="red";
                  a2.appendChild(span5);
                  
                  td4.appendChild(a2);
                  tr.append(td1,td2,td3,td4);
              
                table.append(tr);
                
              
            
            } else{
              
              const li = document.createElement('li');
              const a = document.createElement('a');
              li.setAttribute("class","not-completed");
              const p = document.createElement('p');
              p.innerHTML= `${resp.trainingPlans[i].goals[j].name}`   + `<br>`    +    `${week}` +  `<br>` + `${resp.trainingPlans[i].goals[j].date}`.toString().slice();
              const k = document.createElement('i');


                
               k.setAttribute("class","bx bxs-trash-alt")
              k.style.color="red";
              k.textContent="delete";
              a.href=`/v1/active/about`;
           
              a.appendChild(k);
               li.append(p,a);
              
              todo.append(li);
              const tr = document.createElement('tr');

               const td1 = document.createElement('td');
              const p1 = document.createElement('p');
              p1.textContent=`${resp.trainingPlans[i].goals[j].name}`;
                   td1.appendChild(p1);
                   const td2 = document.createElement('td');
                   td2.textContent=`${resp.trainingPlans[i].goals[j].date}`;
                   console.log(resp.trainingPlans[i].goals[j].date)
                   const td3 = document.createElement('td');
                   const span = document.createElement('span');
                  span.setAttribute("class","status pending");
                  span.textContent="Pending";
                  td3.appendChild(span);
                 

                  const td4 = document.createElement('td');
                   const span4 = document.createElement('span');
                  span4.setAttribute("class","bx bxs-edit-alt");
                  const a1=document.createElement('a');
                  const a2=document.createElement('a');
                  const a3=document.createElement('a');
                  a1.href=`/v1/active/updategoal`;
                  a2.href=`/v1/active/deletegoal`;
                  a3.href=`/v1/active/goalcomplete`;
                  span4.style.color="blue";
                  span4.style.paddingRight="1.7vw";
                  span4.style.paddingLeft="0.4vw";
                  a1.appendChild(span4);
                  

                  const span6 = document.createElement('span');
                  span6.setAttribute("class","bx bx-check");
              
                  span6.style.color="green";
                  span6.style.fontSize="2.8vw";
                  a3.appendChild(span6);

                  const span5 = document.createElement('span');
                  span5.setAttribute("class","bx bxs-trash-alt");
                  a1.setAttribute("id",`${j+1}`);
                  span5.style.color="red";
                  span6.style.paddingRight="1vw";
              
                  a2.appendChild(span5);
                  
                  td4.append(a3,a1,a2);

                  tr.append(td1,td2,td3,td4);
              
                table.append(tr)
              
              
              
            }

   
           
        } 
        
      }  
       
      completed.textContent=10;
        uncompleted.textContent=23;
        points.textContent=300; 
        num.textContent=10;
        weektodo.textContent=`Week's Todo (${resp.trainingPlans[0].startDate.toString().slice(4,11) } to ${resp.trainingPlans[0].endDate.toString().slice(4,11) })`
      }  else{
        completed.textContent=0;
        uncompleted.textContent=0;
        points.textContent=0; 
        num.textContent=0;

        weektodo.textContent=`Week's Todo`;
      }



       
   })




   const search = document.querySelector('.search-btn');

search.addEventListener("click",(e)=>{
  console.log("clicked");
  const value=e.target.value
  fetch('http://localhost:3000/v1/active/search')
   .then(res=>res.json())
   .then(resp=>{ 
       console.log(resp)
      const length=resp.trainingPlans.filter(x=> x.week=="week1").length;
       if(length!=0){
 const data=resp.trainingPlans.filter(x=> x.week=="week1");
 console.log(data);
 for(let i=0; i<data[0].goals.length;i++){
  const tr = document.createElement('tr');

  const td1 = document.createElement('td');
 const p1 = document.createElement('p');
 p1.textContent=`${data[0].goals[i].name}`;
      td1.appendChild(p1);
      const td2 = document.createElement('td');
      td2.textContent=`${data[0].goals[i].date}`;
      const td3 = document.createElement('td');
      const span = document.createElement('span');
     span.setAttribute("class","status completed");
     span.textContent="Completed";
     td3.appendChild(span);
     tr.append(td1,td2,td3);

 
   table.append(tr);
   


 }
       } else{
         table.removeChild();
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
       const p1 = document.createElement('p');
       p1.textContent="";
            td1.appendChild(p1);
            const td2 = document.createElement('td');
            td2.textContent="";
            const td3 = document.createElement('td');
            const span = document.createElement('span');
      
           td3.appendChild(span);
           tr.append(td1,td2,td3);

       
         table.append(tr);
         

       }

   });
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');


searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})



 


