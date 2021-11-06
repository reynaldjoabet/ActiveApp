console.log('hello from js')
const test=document.getElementById('test');
fetch('http://localhost:3000/active/dashboard')
   .then(res=>res.text())
   .then(plans=>{
       test.innerHTML=plans;
   })