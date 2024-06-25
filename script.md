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
- [ ] Finish with a recap of what is unit test.

### Component test

- [ ] Go to [App.test.js](./src/pages/home/App.test.js) and mention that we will use a new library now for running this test: [react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet).
- [ ] Add the `.only` to the test, so we can focus on this test only and add a line of `screen.debug();` inside the test.
- [ ] Run the test, show that the component is rendered as html. Mention that this test avoids including implementation details of your components and you can on how they are going to behave.
- [ ] Add the test to check if the button is rendered and if the button is clickable.
  ```javascript
  import { render, screen } from '@testing-library/react';
  import App from './App';

  test.only('should render a button to clean basket', () => {
    const view = render(<App/>);
    const button = view.getByText('Clean basket');
    screen.debug();
    expect(button).toBeInTheDocument();
  });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Remove all the extra code and change the text of the button to `Clean basket` and run the test to check if it is green.

   ```javascript
  import './App.css';
  import {useState} from "react";

  function App() {

    const [count, setCount] = useState(0);
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => {
              setCount(count + 1);
          }}>
              Clean basket
          </button>
        </header>
      </div>
    );
  }

  export default App;
   ```
- [ ] Remove the only and debug, and write the second test that will check that we have an input that allow the user to enter the fruit basket.

Note: refer to the cheatsheet to show what will be the best way to find the element. Mention that this is promoting good practices of accessibility and that is why is reinforcing to user a label or a placeholder for an input.

  ```javascript
  import { render, fireEvent } from '@testing-library/react';
  import App from './App';

  ...

  test('should allow the user to modify the collect fruits on the basket', () => {
    const view = render(<App/>);
    const input = view.getByLabelText('Fruits\' basket');
    fireEvent.change(input, {target: {value: '🍎🍂🍎🍂🍂🍏🍏🍏🍏'}});
    expect(input.value).toEqual('🍎🍂🍎🍂🍂🍏🍏🍏🍏');
  });
  ```

- [ ] Run the test to check if it is failing.
- [ ] Implement the input and run the test to check if it is green. (mention that for testing purpose we are going to add a initial state to the basket)

  ```javascript
  import './App.css';
  import {useState} from "react";

  function App() {
    const [count, setCount] = useState(0);
    const [basket, setBasket] = useState('🍎🍂🍎🍂🍂🍏🍏🍏');
    return (
      <div className="App">
      <header className="App-header">
      <label htmlFor="basketFruits">Fruits' basket</label>
      <input
          id="basketFruits"
          value={basket}
          onChange={(event) => {
            setBasket(event.target.value);
          }}
      />
      <button onClick={() => {
          setCount(count + 1);
      }}>
        Clean basket
      </button>
      </header>
      </div>
    );
  }

  export default App;
  ```
- [ ] Write a test that check that the user can click the button and the basket is cleaned.

  ```javascript
  import { render, fireEvent } from '@testing-library/react';
  import App from './App';

  ...

  test('should allow the user to clean the basket', () => {
    const view = render(<App/>);
    const input = view.getByLabelText('Fruits\' basket');
    const button = view.getByText('Clean basket');

    fireEvent.change(input, { target: { value: '🍎🍂🍎🍂🍂🍏🍏🍏' } });
    fireEvent.click(button);

    expect(input.value).toEqual('🍎🍎🍏🍏🍏');
  });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Run the minimum code to make it pass.

  ```javascript
  ...
  <button onClick={() => { setBasket('🍎🍎🍏🍏🍏'); }}>
    Clean basket
  </button>
  ...
  ```
Note: Mention that sometimes we need to think on how we can test different cases so we can avoid this. 
- [ ] Introduce (test.each)[https://jestjs.io/es-ES/docs/api]
- Rewrite the test to use test.each.
  ```javascript
  import { render, fireEvent } from '@testing-library/react';
  import App from './App';

  ...

  test.each([
        {basket: '🍎🍂🍎🍂🍂🍏🍏🍏', expected: '🍎🍎🍏🍏🍏'},
        {basket: '🍎🍂🍂🍏', expected: '🍎🍏'},
    ])('should clean the basket with $basket when the user click on the button', ({ basket, expected }) => {
        const view = render(<App/>);
        const input = view.getByLabelText('Fruits\' basket');
        const button = view.getByText('Clean basket');

        fireEvent.change(input, { target: { value: basket } });
        fireEvent.click(button);

        expect(input.value).toEqual(expected);
    });
  ```
- [ ] Check that you have one more test, and now it is failing, you can add also one more line on the cases. 
- [ ] Implement the code to make it pass.
  ```javascript
  ...
  import { cleanFruitBasket } from "../../shared/services/postHarvestHandling";
  ...
  <button onClick={() => {
    setBasket(cleanFruitBasket(basket));
  }}>
    Clean basket
  </button>
  ...
  ```
- [ ] With all the test green make a commit.
- [ ] Propose a refactor, probably in the code there is not refactor and only the test need to be refactored. (question if the first two test that we wrote is needed now that we have the test.each, there is nothing wrong on delete test as long there are other test that cover that behavior, we can also include a describe method to be more descriptive on what we are testing)
  ```javascript
  import { render, fireEvent } from '@testing-library/react';
  import App from './App';

  describe('clean harvest basket', () => {
    test.each([
      {basket: '🍎🍂🍎🍂🍂🍏🍏🍏', expected: '🍎🍎🍏🍏🍏'},
      {basket: '🍎🍂🍂🍏', expected: '🍎🍏'},
    ])('should clean the basket with $basket when the user click on the button', ({ basket, expected }) => {
      const view = render(<App/>);
      const input = view.getByLabelText('Fruits\' basket');
      const button = view.getByText('Clean basket');

      fireEvent.change(input, { target: { value: basket } });
      fireEvent.click(button);

      expect(input.value).toEqual(expected);
    });
  });
  ```
- [ ] Recap what is component test.
- [ ] Make a break.

### Integration test

- [ ] Describe that now we want to create a client to connects to an external server to sent the fruits' basket.
- [ ] Create a `client` folder in [shared folder](./src/shared) with the name `warehouse.test.js`.
- [ ] Explain the concept of test doubles and how we can use them to test our code without depending on external services.
- [ ] Write the first test we are pointing to the correct endpoint with the right verb and the body.
  ```javascript
  import { packageFruitBasket } from "./warehouse";

    global.fetch = jest.fn();

    beforeEach(() => {
      fetch.mockClear();
    });

    it('should call the correct URL with a fruit of basket', () => {
      let basket = '🍎🍎🍏';
      packageFruitBasket(basket);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })
      });
  })
  ```
- [ ] Mention that this is a mock, we have change the fetch method to a mock function and check if it was called with the correct parameters.
- [ ] Run the test to check if it is failing
- [ ] Implement the code to make it pass.
  ```javascript
  export function packageFruitBasket(basket) {
    fetch('http://localhost:3001/warehouse/package', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ basket: basket })
    });
  }
  ```
- [ ] Run the test to check if it is green.
- [ ] Write a test that check if the method return ok when the basket was received.
  ```javascript
  it('should  return ok if the basket was receive correctly', async () => {
    let basket = '🍎🍎🍏';
    let expectedResponse = { status: 'received' };
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json:
                () => Promise.resolve(expectedResponse),
        }
    ));

    const response = await packageFruitBasket(basket);

    expect(response).toEqual(expectedResponse);
  });
  ```
- [ ] Mention that in here we are using a stub, in this case we are providing a response that we could like to receive given certain conditions.
- [ ] Run the test to check if it is failing.
- [ ] Implement the code to make it pass.
  ```javascript
  export async function packageFruitBasket(basket) {
    const response = await fetch('http://localhost:3001/warehouse/package', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ basket: basket })
    });
    return await response.json();
  }
  ```
- [ ] Run the test to check if it is green.
- [ ] Remove the previous test and move to assert to this test and remark the difference between the mock and stub.
```javascript
it('should  return ok if the basket was receive correctly', async () => {
    ...
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })
    });
   ...
});
```
- [ ] Write what happen when the api is down and can not make the request.
  ```javascript
  it('should return an error the api is down', async () => {
    let basket = '🍎🍎🍏';
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    const response = await packageFruitBasket(basket);

    expect(response).toEqual({ status: 'failed' });
  });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Implement the code to make it pass.
  ```javascript
  export async function packageFruitBasket(basket) {
    try {
      const response = await fetch('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })
      });
      return await response.json();
    } catch (error) {
      return { status: 'failed' };
    }
  }
  ```
- [ ] Run the test to check if it is green.
- [ ] Write a test that check if the basket is empty, we should not make the request.
  ```javascript
  it('should not make the request if the basket is empty and throw an error' , async () => {
    let basket = null;
    await expect(packageFruitBasket(basket)).rejects.toThrow('Basket is empty');
  });
  ```
- [ ] Run the test to check if it is failing.
- [ ] Implement the code to make it pass.
  ```javascript
  export async function packageFruitBasket(basket) {
    if (!basket) throw new Error('Basket is empty');
    ...
  }
  ```
- [ ] commit the code
- [ ] refactor the code
    **Code**
    We can change the await for a then to show that we are not testing implementation details but the behavior of the code.
    ```javascript
    export async function packageFruitBasket(basket) {
      if (!basket) throw new Error('Basket is empty');
      try {
          return await fetch('http://localhost:3001/warehouse/package', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ basket: basket })
          }).then(response => response.json());
      } catch (e) {
          return { status: 'failed' };
      }
    }
    ```
    **Test**
    ```
    import { packageFruitBasket } from "./warehouse";

- [ ] refactor, show that we can change the implementation and instead of using await async we can use then and catch. 
  ```javascript
  export async function packageFruitBasket(basket) {
      if (!basket) return Promise.reject(new Error('Basket is empty'));

      return await fetch('http://localhost:3001/warehouse/package', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ basket: basket })})
          .then(response => response.json())
          .catch(() => ({ status: 'failed' }));
  }
  ```
- [ ] refactor the test and instead of using mockImplementationOnce you can use mockResolvedValueOnce and mockRejectedValueOnce.
  ```javascript
  it('should  return ok if the basket was receive correctly', async () => {
    ...
    fetch.mockResolvedValue({
        json: () => Promise.resolve(expectedResponse)
    });
    ...
  });

  it('should return an error when the api is down', async () => {
    ...
    fetch.mockRejectedValueOnce('API is down');
    ...
  });
  ```
- [ ] recap what is integration test

### Mock server

- [ ] Explain that when we try to make our test more realistic we can use a mock server to simulate the behavior of the server, since we are going to use the real implementation of the fetch method. 
- [ ] Create the integration test `postHarvestHandling.integration.test.js` file in the [services folder](./src/shared/services).
- [ ] Mention that in here we will use a spy that will allow us to check if the fetch method was called with at least once. 
```javascript
import { sentToWarehouse } from "./postHarvestHandling";

describe('Storage', () => {
    it('should sent the basket to the warehouse', async () => {
        const fetchSpy =
            jest.spyOn(global, 'fetch')

        let response = await sentToWarehouse('🍎🍎🍏');

        expect(response).toEqual({status: 'received', message: 'Basket received'});
        expect(fetchSpy).toHaveBeenCalled();
        fetchSpy.mockRestore();
    });
});
```

- [ ] Run the test to check if it is failing.
- [ ] Implement the code to make it pass.
  ```javascript
  export const sentToWarehouse = async (basket) => {
    let response = await packageFruitBasket(basket);
    return { "status": response.status, message: "Basket received"};
  }
  ```
- [ ] See that test is failing and ask why? (In here we are doing a request to the real server, and we are not running the server)
- [ ] Show the backend (a dummy endpoint that is under construction).
- [ ] Start the backend and run the test again to check if it is green.
  `cd backend && npm install && npm start`
- [ ] Mention that what happen if the api we are calling is not ready or charge money every time we do a request. Mention than alternative can be use a library to mock the server.
- [ ] Mention that jest is great library for start but when you want to do more things will be great to use modern tools as Vitest, that have better performance and allow us to have a easy integration with other tools, that sadly jest could not keep up with.
- [ ] The structure of the test will be the same, but there are some minor adjustments that we need to our code in order to make it work with Vite. Make sure the branch is up-to-date with main. Run the script ` node migrateToVitest.js`
- [ ] The migration is done, we can check a bit the files and see that the test hasn't change except for the mocks and some configuration files that were added. 
- [ ] Remark the use of the new library msw that will help us to mock the server.
- [ ] Start the mockserver before each test run in `postHarvestHandling.integration.test.js`
```javascript
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '../../mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```
- [ ] Stop the real server of the backend and rerun the test, see that all of them still green because now you have a folder of mocks that will intercept the request and return the response that you want.
- [ ] Commit the code
- [ ] Recap what is mock server.


### E2E
- We will use [Playwright](https://playwright.dev/) to run the test.
- Run the command to install Playwright `npm install -D playwright`
- Run the command to install the browser that you want to use `npm init playwright@latest`
- [ ] While installing explain that in here we try to test the whole application as close as possible to the real world, always taking into account the user perspective, try to write one or two base on the longest user journey. These are the most expensive tests, since it will write on the real database and will use the real server, and we will try to simulate real devices. 
- [ ] Mention the extension that you can use to record the test write test.
- [ ] add the script to run the test in the package.json
  ```json
  "scripts": {
    ...
    "e2e": "playwright test",
    "e2e-ui": "playwright test --ui"
  }
  ```
- [ ] Check the playwright.config.js file and see that we have the configuration to run the test in different browsers. Uncomment the last part: 
```
webServer: {
     command: 'npm run start',
     url: 'http://localhost:5173/',
     reuseExistingServer: !process.env.CI,
},
```
- [ ] Run `npm run e2e-ui` to see the test running in the browser.
- [ ] Run `npm test` and mention that is also taking the playwright test and trying to run with vitest. So we will to exclude on the vite.config.ts
```
import { configDefaults, defineConfig } from 'vitest/config'

...
  exclude: [ 
         ...configDefaults.exclude,
        '**/tests/**'
      ],
```
- [ ] Commit the code
