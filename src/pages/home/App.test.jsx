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
