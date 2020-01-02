const readline = require('readline');
const fs = require('fs');
const axios = require("axios");
const inquirer = require("inquirer");

let repoArray=[];

const questions = ["What is your favorite color?", "What is your GitHub user name?"];

var data = {
    github: ""
}


// function getgithub(username){
// axios.get('https://api.github.com/users/' + username)
//   .then(function(response){
//     console.log(response.data); // ex.: { user: 'Your User'}
//     console.log(response.status); // ex.: 200
//   }); 
  
// }

// inquirer
// .prompt({
//    message: "Enter you Github username",
//    name: "username"
// })
// .then(function({ username }){
//  const queryUrl= `https://api.github.com/users/${username}/repos?per_page=100`;
//  axios.get(queryUrl).then(function(res){
//      console.log(queryUrl);
//     //  console.log(res);
//      getRepoInfo(res);
//  })
// });

function getRepoInfo(response){
    console.log("getinfo");
    // console.log(response.data);

    //get login
    console.log(response.data.login);

    //get repos
    for(repo of response.data){
        console.log(repo.name);
        //save to array
        repoArray.push(repo.name);
    }
    // var gitlogin = response.owner.login;
    // console.log(gitlogin);

}




function writeToFile(fileName, data) {
 
}

function init() {
    inquirer
    .prompt({
       message: "Enter you Github username",
       name: "username"
    })
    .then(function({ username }){
     const queryUrl= `https://api.github.com/users/${username}/repos?per_page=100`;
     axios.get(queryUrl).then(function(res){
         console.log(queryUrl);
        //  console.log(res);
         getRepoInfo(res);
     })
    })
    
    // getgithub("julie-git");
    //  const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });
    
      
      
    //   rl.question(questions[0], (answer) => {
    //     // TODO: Log the answer in a database
    //     console.log(`Your favorite color is: ${answer}`);
    //    data.color=answer;
    //    console.log(data.color);
    //     // rl.close();
    //   });

    //   const r2 = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    //   });

    //   r2.question(questions[1], (answer) => {
    //     // TODO: Log the answer in a database
    //     console.log(`Your github user id: ${answer}`);
    //    data.github=answer;
    //    console.log(data.githb);
    //     r2.close();
    //   });
    
}
 init();
// var newHTML = generateHTML(data);
