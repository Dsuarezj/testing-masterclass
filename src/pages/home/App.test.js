import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('should render a button to clean basket', () => {
  const view = render(<App/>);
  const button = view.getByText('Clean basket');
  expect(button).toBeInTheDocument();
});


test('should allow the user to modify the collect fruits on the basket', () => {
  const view = render(<App/>);
  const input = view.getByLabelText('Fruits\' basket');

  fireEvent.change(input, {target: {value: '🍎🍂🍎🍂🍂🍏🍏🍏🍏'}});

  expect(input.value).toEqual('🍎🍂🍎🍂🍂🍏🍏🍏🍏');
});

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
