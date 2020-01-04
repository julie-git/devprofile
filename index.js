var genhtml = require('./generateHTML');

const readline = require('readline');
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const convertFactory = require('electron-html-to');

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
    
    console.log("getgithub  after:" + getgit);
    return getgit;
    
 }catch(err){
   console.log(err);
 }

   
 }







function writeToFile(fileName, data) {
  
  
}

async function convertToPDF(htmlString){
  var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });
   
  conversion({ html: htmlString }, function(err, result) {
    if (err) {
      return console.error(err);
    }
   
    console.log(result.numberOfPages);
    console.log(result.logs);
    result.stream.pipe(fs.createWriteStream('converted.pdf'));
    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  });
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

      
      const htmlString = genhtml.generateHTML(answers);
  
      await writeFileAsync("index.html", htmlString,"utf-8");
  
      console.log("Successfully wrote to index.html");
      // convertToPDF(htmlString);
      
    } catch(err) {
      console.log(err);
    }
    
    
  }
    
    

 init();
 convertToPDF();


