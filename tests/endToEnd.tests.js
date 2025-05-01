import puppeteer from 'puppeteer';

const createNewProject = async () => {

// launch browser
const browser = await puppeteer.launch();
//open new tab
const page = await browser.newPage();
//navigate to page
await page.goto("http://localhost:5173/login");
  // Wait for email input field
  await page.waitForSelector('input[name="email"]');
  console.log('Successfully navigated to:', page.url());
  await page.type('input[name="email"]', 'testmail@gmail.com');

  // Wait for password input field
  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', 'Password12345');


  // Click login button
await page.click('._login__container__form__button_1o4z7_42');

// Wait for navigation to complete and new study button to be visible
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.waitForSelector('#nav__button--newstudy');

  console.log('Successfully logged in and navigated to:', page.url());

// Click the new project link:
await page.click('#nav__button--newstudy');

//wait for page to load
await page.waitForSelector('#newproject__container');

// /create_study page
console.log('Navigated to:', page.url());

//wait for page to load
await page.waitForSelector('input[name="title"]'); // Wait until the input is present
//input project title:
await page.type('input[name="title"]', 'My Study Title'); // Type into it
//input project description:
await page.type('textarea', 'this is a test project generatede by my end to end test script');
//submit form
await page.click('#newProject__submit');

//wait for page to load
await page.waitForSelector('#addQuestion__btn');

// /create_study/questions
console.log('Navigated to:', page.url())

// enter question text
let inputs = await page.$$('input[name="questiontext"]');
await inputs[0].type('how do you feel?');  // Types into the first one
//initializes the variable value for use:
let value = inputs[0];
const evaluateInput1 = await page.evaluate(input => input.value, value);
console.log('Value in Question 1:', evaluateInput1);

//add a question to section:
await page.click('#addQuestion__btn');

inputs = await page.$$('input[name="questiontext"]');
await inputs[1].type('What artifact do you prefer?');
value = inputs[1];
const evaluateInput2 = await page.evaluate(input => input.value, value);
console.log("Value in Question 2:", evaluateInput2)

//change question type:
let questionTypes = await page.$$('select[name="questionType"]');

await questionTypes[1].select('MultipleChoice')
const evaluateQuestionType1 = await page.evaluate(input => input.value, questionTypes[1]);
console.log("question 2 type:", evaluateQuestionType1); 

//input alternatives:
await page.waitForSelector('input[name=alternative-0]');
await page.type('input[name=alternative-0]', "Image 1");

await page.click('.addAlternative');
await page.waitForSelector('input[name=alternative-1]');
await page.type('input[name=alternative-1]', "Image 2");

const alternative1 = await page.$('input[name=alternative-0]');
const alternative2 = await page.$('input[name=alternative-1]');

//check if values were inserted correctly
const evalAlternative1 = await page.evaluate(input => input.value, alternative1);
const evalAlternative2 = await page.evaluate(input => input.value, alternative2);
 console.log("alternative 1", evalAlternative1);
 console.log("alternative 2:", evalAlternative2);

//add question 3 to section:
await page.click('#addQuestion__btn');

inputs = await page.$$('input[name="questiontext"]');
await inputs[2].type('On a scale from 1 to 10, how much do you like it?');
value = inputs[2];
const evaluateInput3 = await page.evaluate(input => input.value, value);
console.log("Value in Question 3:", evaluateInput3)

//change question type:
questionTypes = await page.$$('select[name="questionType"]');

await questionTypes[2].select('SlidingScale');
const evaluateQuestionType2 = await page.evaluate(input => input.value, questionTypes[2]);
console.log("question 3 type:", evaluateQuestionType2); 








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