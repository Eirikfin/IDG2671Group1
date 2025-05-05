import puppeteer from 'puppeteer';

const createNewProject = async () => {
const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto("http://localhost:5173/dashboard");

await page.waitForSelector('#nav__button--newstudy');
console.log('Navigated to:', page.url())
// Click the new project link:
await page.click('#nav__button--newstudy');

// Optionally wait for navigation
await page.waitForSelector('#newproject__container');

// You’re now on the /create_study page
console.log('Navigated to:', page.url());

await page.waitForSelector('input[name="title"]'); // Wait until the input is present
//input project title:
await page.type('input[name="title"]', 'My Study Title'); // Type into it
//input project description:
await page.type('textarea', 'this is a test project generatede by my end to end test script');
//submit form
await page.click('#newProject__submit');

await page.waitForSelector('#addQuestion__btn');
console.log('Navigated to:', page.url())
browser.close();

}

createNewProject();

//log in and store token

//navigate to new quiz:

//post new project:

//add questions in front end:
//upload artifact:

//update project with questions and artifact

//retrieve project

//retrieve question section¨

//positive scenarios:
//entering legit data all the way through



//edge cases:
//uploading no artifacts, uploading 20 artifacts
//zero questions, 50 questions?
//try uploading questions with empty questiontext, or no answeralternatives

//negative cases:
//try to upload without authorization token
//try to change researcherid pefore upload
//try uploading with missing requirements
//try uploadging with different datatypes than expected


//a test where user goes to answer project page:
//answers questions then submit them to backend

//test positive:
//follow expected behaviour
//edgecases:


//negative cases:
//submitting blank answers on required fields
//submit not expected answers: different datatype than expected