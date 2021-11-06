
const dashboard=document.getElementById('dashboard');
fetch('http://localhost:3000/active/dashboarddata')
   .then(res=>res.json())
   .then(resp=>{ 
       console.log(resp)
       
       const gender = document.createElement('div');
       const  email= document.createElement('div');
       const firstName = document.createElement('div');
       const lastName = document.createElement('div');
       const username = document.createElement('div');
       const plans = document.createElement('div');
       email.textContent=`Email: ${resp.email}`;
       firstName.textContent=`First Name: ${resp.firstName}`;
       lastName.textContent=` Last Name : ${resp.lastName}`;
       username.textContent=` Username : ${resp.username}`;
       gender.textContent=`Gender : ${resp.gender}`;
       for (let i=0;i<resp.trainingPlans.length;i++){
        const link = document.createElement('div');
        const  startDate= document.createElement('div');
        const endDate = document.createElement('div');
        const week = document.createElement('div');
        const goals= document.createElement('div');
        link.textContent=resp.trainingPlans[i].link;
        startDate.textContent=resp.trainingPlans[i].startDate;
        endDate.textContent=resp.trainingPlans[i].endDate;
        week.textContent=resp.trainingPlans[i].week;
  
        for (let j=0;j<resp.trainingPlans[i].goals.length;j++){
            const content= document.createElement('div');
            
            const name=resp.trainingPlans[i].goals[j].name;
           const  date=resp.trainingPlans[i].goals[j].date;
             let details;
            if(resp.trainingPlans[i].goals[j].details==null){
              details=" "
            } else{
                details=resp.trainingPlans[i].goals[j].details
            }
            content.innerHTML=` <span> ${name}</span>  <span> ${date}</span><span> ${details}</span>  `;
            goals.append(content);
            
        }
        plans.append(link,startDate,endDate,week,goals);
       }
       dashboard.append(email,firstName,lastName,username,gender,plans);
       
   })