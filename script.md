# Bulletproof Code: Automated Testing Strategies for Agile Developers

This is a guide about to how combine this repo with the slides. 

## Slides order 

### Introduction

- [ ] Provide introduction about the master class and show some examples about what can go wrong due the lack of testing.
- [ ] Show the example of code with the method replace and includes, and ask the audience what will be the result.
- [ ] Manual test the code and show the result. Remark the importance of testing to warranty the code is working as expected. 
  - use the [manual testing folder](./src/shared/manualTesting)
  - `cd src/shared/manualTesting`
  - `node run.js`
  - show the result
  - change the replace method with the regex `/🍂/g`
  - `node run.js`
  - show the result
- [ ] Introduce TDD to the audience and show the benefits of using it, mention the steps (Red, Green, Refactor). 

### Unit test 
- [ ] Show the code inside the [service to do the harvest handling](./src/shared/services/postHarvestHandling.js), read the comment that show how the method should behave and propose to rewrite it using TDD.
- [ ] Install all dependencies 
  `npm install`
- [ ] Run the test to check that we are ready to run test.
  `npm test`
- [ ] Delete the fake test
- [ ] Write the first test that check if all the leaves are cleaned from the basket on the [test file](./src/shared/services/postHarvestHandling.test.js)
  ```
  import { cleanLeaves } from "./postHarvestHandling";
  
  it('should collect only red and green apples', () => {
    expect(cleanLeaves('🍎🍂🍎🍂🍏')).toEqual('🍎🍎🍏');
  });
  ```
- [ ] Run the test to check if it is failing
- [ ] Ask do you think this step is necessary? (Because we want to double check that the test is actual testing what we want to implement, you can change the name of the method to show another error and prove that test might not be right implemented
- [ ] Implement the method to pass the test
  ```
  export function cleanLeaves(basket) {
    return basket.replace(/🍂/g, '');
  }
  ```
- [ ] Check that the test is green. 
- [ ] Ask what will happen if we don't receive any basket.
  ```
    it('should return an empty if no basket is provided', () => {
        expect(cleanLeaves()).toEqual('');
    });
  ```
- [ ] Remark that in here is where we can see the benefits of TDD, because it makes us stop and think about the edge cases that we might not ask ourselves about and how we want it to behave (want to return null, want to throw exception, want to return empty, etc).  
- [ ] Run the test to check if it is failing.
- [ ] Implement the method to pass the test
  ```
  export function cleanLeaves(basket ) {
    if (!basket) return '';
    return basket.replace(/🍂/g, '');
  }
  ```
- [ ] Check that the test is green and remember that we should write the minimum code necessary to pass the test. 
- [ ] Ask what will happen if we receive another type of leave or other impurities? and write the test for it. 
  ```
    it('should clean all the leaves or things that are not apples', () => {
        expect(cleanLeaves('🍎🍂🍎🍂🍀A🍎')).toEqual('🍎🍎🍎');
    });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Ask to use an ai tool to help us to implement the method base on our test. (you can use [Perplexit](http://perplexity.ai))
- [ ] Copy the code that the AI tool provide and check if the test is green (hopefully it is wrong and should break the other test, this should remark that test had help us to not break previous features trying to implement a new one)
  Example of the code that the AI tool provide:
  ```
  function cleanLeaves(basket) {
      if (!basket) return '';
      return basket.replace(/[^🍎🍏]/g, '');
  }
  ```
- [ ] Implement the correct function: 
    ```
    export function cleanLeaves(basket) {
       if (!basket) return '';
       let fruitsToHarvest = /🍎|🍏/g;
       return basket?.match(fruitsToHarvest)?.join('')
    }
    ```
- [ ] Check that the test is green.  
- [ ] Ask what happen with the refactor step? (mention that sometimes is not necessary to refactor every step but it is important to stop once in a while and clean the house).
- [ ] Recommend to first do a commit before refactor, and then do the refactor.
