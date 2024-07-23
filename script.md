# Bulletproof Code: Automated Testing Strategies for Agile Developers

This is a guide about to how combine this repo with the slides.

🎦 - Use the slide
🔧 - Use the code

## Slides order 

### Introduction

- [ ] 🎦 SLIDE 1- 5: Provide introduction about the master class and show some examples about what can go wrong due the lack of testing.
- [ ] 🎦 SLIDE 6: Show the example of code with the method replace and includes, and ask the audience what will be the result.
- [ ] 🎦 SLIDE 7: Make then download the code 
- [ ] 🔧 Manual test the code and show the result.
  - use the [manual testing folder](./manualTesting)
  - `cd /manualTesting`
  - `node run.js`
  - show the result
  - change the replace method with the regex `/🍂/g`
  - `node run.js`
  - show the result
- [ ] Remark the importance of testing, is the best way to warranty the code is working as expected, and it will help us to know if we are breaking something when we are adding new features or refactoring the code.
- [ ] 🔧 Install all dependencies of the project before start
    - `cd ..`
    - `npm install`

## TDD
- [ ] 🎦 SLIDE 8: Before jumping into all type of test introduce TDD to the audience. TDD is a methodology that will help us to write better code, and it will help us to know what we want to implement and how we want it to behave. It will focus on the behavior of the code and not on the implementation details.
-  [ ] 🎦 SLIDE 9: Mention the steps (Red, Green, Refactor)

### Unit test
- [ ] 🔧- Show the code inside the [service to do the harvest handling](./src/shared/services/postHarvestHandling.js), read the comment that show how the method should behave and propose to rewrite it using TDD.
- [ ] Run the test to check that we are ready to run test.
  `npm test`
- [ ] Delete the fake test
- [ ] Write the first test that check if all the leaves are cleaned from the basket on the [test file](./src/shared/services/postHarvestHandling.test.js)
  ```javascript
  import { cleanLeaves } from "./postHarvestHandling";
  
  it('should collect only red and green apples', () => {
    expect(cleanLeaves('🍎🍂🍎🍂🍏')).toEqual('🍎🍎🍏');
  });
  ```
- [ ] Run the test to check if it is failing
- [ ] Ask do you think this step is necessary? (Because we want to double check that the test is actual testing what we want to implement, you can change the name of the method to show another error and prove that test might not be right implemented
- [ ] Implement the method to pass the test
  ```javascript
  export function cleanLeaves(basket) {
    return basket.replace(/🍂/g, '');
  }
  ```
- [ ] Check that the test is green. 
- [ ] Ask what will happen if we don't receive any basket.
  ```javascript
    it('should return an empty if no basket is provided', () => {
        expect(cleanLeaves()).toEqual('');
    });
  ```
- [ ] Remark that in here is where we can see the benefits of TDD, because it makes us stop and think about the edge cases that we might not ask ourselves about and how we want it to behave (want to return null, want to throw exception, want to return empty, etc).  
- [ ] Run the test to check if it is failing.
- [ ] Implement the method to pass the test
  ```javascript
  export function cleanLeaves(basket ) {
    if (!basket) return '';
    return basket.replace(/🍂/g, '');
  }
  ```
- [ ] Check that the test is green and remember that we should write the minimum code necessary to pass the test. 
- [ ] Ask what will happen if we receive another type of leave or other impurities? and write the test for it. 
  ```javascript
    it('should clean all the leaves or things that are not apples', () => {
        expect(cleanLeaves('🍎🍂🍎🍂🍀A🍎')).toEqual('🍎🍎🍎');
    });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Ask to use an ai tool to help us to implement the method base on our test. (you can use [Perplexit](http://perplexity.ai))
- [ ] Copy the code that the AI tool provide and check if the test is green (hopefully it is wrong and should break the other test, this should remark that test had help us to not break previous features trying to implement a new one)
  Example of the code that the AI tool provide:
  ```javascript
  function cleanLeaves(basket) {
      if (!basket) return '';
      return basket.replace(/[^🍎🍏]/g, '');
  }
  ```
- [ ] Implement the correct function: 
    ```javascript
    export function cleanLeaves(basket) {
       if (!basket) return '';
       let fruitsToHarvest = /🍎|🍏/g;
       return basket?.match(fruitsToHarvest)?.join('')
    }
    ```
- [ ] Check that the test is green.  
- [ ] Ask what happen with the refactor step? (mention that sometimes is not necessary to refactor every step but it is important to stop once in a while and clean the house).
- [ ] Recommend to first do a commit before refactor, and then do the refactor. Proposed refactor:


  **Code**

  ```javascript
  export function cleanFruitBasket(fruitBucket) {
    let fruitsToHarvest = /🍎|🍏/g;
    return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
  }
  ```

  **Test**

  ```javascript
  import { cleanFruitBasket } from "./postHarvestHandling";

  it('should collect only red and green apples and clean all the leaves or extra dirt', () => {
      const otherDirt = Math.random().toString(36);
      expect(cleanFruitBasket('🍎🍂🍎🍂🍀' + otherDirt + '🍏')).toEqual('🍎🍎🍏');
  });

  it('should return an empty if no basket is provided', () => {
      expect(cleanFruitBasket()).toEqual('');
  });

  ```

Note: First refactor the code so you can warranty that the new code is working as expected. Then you can refactor the test, try not to delete cases that are important to check the behavior of the code.

- [ ] Delete the comment and mention that our test will be our life documentation, that will help us to know what the code should do and how it should behave, and it will change if the feature change. 
- [ ] make a commit. 
- [ ]  🎦 SLIDE 12: Finish with a recap of what is unit test.

### Component test

- [ ] 🎦 SLIDE 13: Introduction to component test.
- [ ] 🔧 Change to solution branch
  `git checkout solution`
- [ ] Install dependecies.
  `npm install`
- [ ] Mention that in here we are migrating to vitest since it is a modern tool that will help us to have a better performance, and it will be easier to integrate with other tools. It is similar to jest that is why the previous test keep running without changes. 
- [ ] Go to [App.test.js](./src/pages/home/App.test.js) and mention that we will use a new library now for running this test: [react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet).
- [ ] Add a line of `screen.debug();` inside the test and the import `import { render, fireEvent, screen } from '@testing-library/react';`
- [ ] Run the test, show that the component is rendered as html. Mention that this test avoids including implementation details of your components and you can focus on how they are going to behave.

Note: refer to the [cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/) to show what will be the best way to find the element. Mention that this is promoting good practices of accessibility and that is why is reinforcing to user a label or a placeholder for an input.
- [ ] Review the code and mention that we are getting the input by label and then clicking on the button as a user will do and then just checking the result of the input without caring how the code is implemented.
- [ ] Introduce (test.each)[https://jestjs.io/es-ES/docs/api] to make the test more readable and to avoid repetition.
- [ ] Add one more line on the cases and see how test increase. Mention that this is a good way to test the same behavior with different inputs to have more reliable test. 
- [ ] Mention also that we can use describe to group the test and make it more readable.
- [ ] Check the implementation of the test and mention that the test has reminder us to proper label the input and the button.

### Integration test
- [ ] 🎦 SLIDE 14: Introduction to integration test.
- [ ] 🎦 SLIDE 15: Explain the concept of test doubles and how we can use them to test our code without depending on external services.
- [ ] Describe that now we want to create a client to connects to an external server to sent the fruits' basket.
- [ ] 🔧 Check the test for the `client` folder in [shared folder](./src/shared/warehouse.test.js)
- [ ] Mention that are mocking the fetch to see if it is correct config on to assert toHaveBeenCalledWith
- [ ] Mention that will upgrade the stub by adding behaviour, in this case we are providing a response that we could like to receive given certain conditions.
- [ ] Mention that we can also reject the promise to see if the code is handling the error correctly.
- [ ] Mention the AAA pattern (Arrange, Act, Assert) that will help us to write better test and that it is also the Given, When, Then pattern that we use in BDD. (join the fetch mock with the call). It is just a way to make more readable the test.
- [ ] Review the implementation, mention that is a smell to use await and then, better to stick with one of them. So propose a refactor 
  ```javascript
  export async function packageFruitBasket(basket) {
      if (!basket) throw new Error('Basket is empty');
      try {
          const response =  await fetch('http://localhost:3001/warehouse/package', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ basket: basket })
          })
  
          return await response.json();
      } catch (e) {
          return { status: 'failed' };
      }
  }
  ```
- [ ] Run the test to check if it is green.
    We can change the then for an await to show that we are not testing implementation details but the behavior of the code.

### Mock server

- [ ] Explain that when we try to make our test more realistic we can use a mock server to simulate the behavior of the server, since we are going to use the real implementation of the fetch method. 
- [ ] 🎦 SLIDE 16: Explain the concept of mock server and how we can use it to test our code without depending on external services.
- [ ] 🔧 Review the integration test `postHarvestHandling.integration.test.js` file in the [services folder](./src/shared/services/postHarvestHandling.integration.test.js).
- [ ] Mention that in here we will use a spy that will allow us to check if the fetch method was called with at least once. This is just for showing how it is used, but we will use a mock server to intercept the request and return the response that we want.
- [ ] Mention that what happen if the api we are calling is not ready or charge money every time we do a request. So alternative can be use a library to mock the server.
- [ ] Mention that jest is great library for start but when you want to do more things will be great to use modern tools as Vitest, that have better performance and allow us to have a easy integration with other tools, that sadly jest could not keep up with.
- [ ] Mention that is the reason why we migrate to vitest, so 


### E2E
- [ ] 🎦 SLIDE 17: Mention that we will run e2e test and We will use [Playwright](https://playwright.dev/) to run the test, but there are other tools like Cypress o Selenium.
- [ ] Explain that in here we try to test the whole application as close as possible to the real world, always taking into account the user perspective, try to write one or two base on the longest user journey. These are the most expensive tests, since it will write on the real database and will use the real server, and we will try to simulate real devices. 
- [ ] 🔧 Review script to run the test in the package.json
```json
"scripts": {
  ...
  "e2e": "playwright test",
  "e2e-ui": "playwright test --ui"
}
```
- [ ] Check the test file `harvest.spec.js` in the [test folder](./tests/harvest.spec.js) and explain the test and run it with ui
- [ ] Mention the extension that you can use to record the test write test.
- [ ] Check the playwright.config.js file and see that we have the configuration to run the test in different browsers.  `playwright.config.js`
- [ ] Run `npm run e2e-ui` to see the test running in the browser.
- [ ] 🎦 SLIDE 18: Mention that there are other types of test that we can use, as snapshot test, mutation test, contract test, etc.
- [ ] 🎦 SLIDE 20: Mention the test pyramid or test trophy and that we should try to have a balance between the test that we write.
- [ ] Mention that this might be too much when writing code, but we need to understand in which stage of our app we will require and if we start growing our codebase or more people is joining the team, we will need to have a good test coverage to warranty that we are not breaking anything. If it is a POC or something that we want to test fast, we can skip some of the test, but we should always try at least some e2e.
- [ ] Questions?
