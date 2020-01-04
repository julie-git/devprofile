var genhtml = require('./generateHTML');

const readline = require('readline');
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

let location = "";
let googleURL ="https://www.google.com/maps/place/";

let repoArray=[];
// let answers = {};

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
    }
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
   let getgit={};
   console.log("getgithub usernmane =" + username);
   const { data } = await axios.get('https://api.github.com/users/' + username);
    //  console.log(data); 
    // console.log("getgithub 1 answers: " + answers);
     console.log(data.name)
    // console.log(data.blog);
    //  console.log(data.location);
    //  console.log(data.url);
    getgit.name = data.name;
    console.log("getgithub getgit.name = " + getgit.name);
    // getgit.blog= data.blog;
    // getgit.location= data.location;
    // getgit.giturl= data.url;
    
    // getgit.followers = data.followers;
    // getgit.following = data.following;
    //  getgit.numrepos = data.public_repos;
    console.log("getgithub  after:" + getgit);
    return getgit;
    //  console.log(repoArray);
    // console.log(data.name)
    // console.log(data.blog);
    // console.log(data.location);
    // console.log(data.url);

    // console.log(res); 
 }catch(err){
   console.log(err);
 }

//  try{
//    const { data } = await axios.get('https://api.github.com/users/' + username);
//  }catch(err){
//    console.log(err);
//  }
   
 }



// function getRepoInfo(response){
//     console.log("getinfo");
//     // console.log(response.data);

//     //get login
//     console.log(response.data.login);

//     //get repos
//     for(repo of response.data){
//         console.log(repo.name);
//         //save to array
//         repoArray.push(repo.name);
//     }
//     // var gitlogin = response.owner.login;
//     // console.log(gitlogin);

// }




function writeToFile(fileName, data) {
 
}

async function init() {
    console.log("init")
   try {
       let answers = await promptUser();
      
      console.log(answers);

      

      var username =answers.github;
      console.log(username);
      const { data } = await axios.get('https://api.github.com/users/' + username);
      console.log(data);
      answers.name = data.name;
      answers.blog= data.blog;
      answers.location= data.location;
      answers.giturl= data.url;
      
      answers.followers = data.followers;
      answers.following = data.following;
      answers.numrepos = data.public_repos;
      answers.picurl= data.avatar_url;
      answers.company = data.company;
      answers.locurl = googleURL + answers.location;
      console.log(answers);

      
      // let  gitanswers ={};
      //  gitanswers  = getgithub(gitname);
    

      //  console.log("init gitanswer.name=")
      //  console.log(gitanswers.name);
      // const answers = Object.assign(userAnswers, gitanswers);
      
      // console.log("init after merge name= " );
      // console.log(answers.name);
      
      // answer.push({gitname: "julie-git"});
      const htmlString = genhtml.generateHTML(answers);
  
      await writeFileAsync("index.html", htmlString,"utf-8");
  
      console.log("Successfully wrote to index.html");
      
    } catch(err) {
      console.log(err);
    }
    
    
  }
    
    

 init();

