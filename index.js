var genhtml = require('./generateHTML');

const readline = require('readline');
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

let location = "";
let googleURL ="https://www.google.com/maps/place/" + location;

let repoArray=[];
let dataArry =[];

const questions = ["What is your favorite color?", "What is your GitHub user name?"];


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username?"
    },
    // {
    //   type: "input",
    //   name: "linkedin",
    //   message: "Enter your LinkedIn URL."
    // }
  ]);
}


// function getgithub(username){
//  axios.get('https://api.github.com/users/' + username)
//   .then(function(response){
//     console.log(response.data); // ex.: { user: 'Your User'}
//     console.log(response.status); // ex.: 200
//   }).then(function({ username }){
//     const queryUrl= `https://api.github.com/users/${username}/repos?per_page=100`;
//     axios.get(queryUrl).then(function(res){
//         console.log(queryUrl);
//        //  console.log(res);
//         getRepoInfo(res);
//     })
//    })
  
// }

async function getgithub(username){
 try{ 
   console.log("getgithub usernmane =" + username);
   const { data } = await axios.get('https://api.github.com/users/' + username);
    console.log(data); 
    console.log(answers);
    dataArry.push({'name': data.name});
    dataArry.push({'blog': data.blog});
    dataArry.push({'location': data.location});
    dataArry.push({'giturl': data.url});
    dataArry.push({'blog': data.blog});
     console.log(repoArray);
    console.log(data.name)
    console.log(data.blog);
    console.log(data.location);
    console.log(data.url);
    
    // console.log(res); 
 }catch(err){
   console.log(err);
 }

 try{
   const { data } = await axios.get('https://api.github.com/users/' + username);
 }catch(err){
   console.log(err);
 }
   
 }



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

async function init() {
    console.log("init")
    try {
      answers = await promptUser();
      console.log(answers);
  
      const htmlString = genhtml.generateHTML(answers);
  
      await writeFileAsync("index.html", htmlString,"utf-8");
  
      console.log("Successfully wrote to index.html");
      var gitname = answers.github;
      console.log(gitname);
      getgithub(gitname);
      console.log(answers);
    } catch(err) {
      console.log(err);
    }
    
    
  }
    
    

 init();

