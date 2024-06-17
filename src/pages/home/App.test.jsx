import { fireEvent, render } from '@testing-library/react';
import App from './App';

let view, input, button;

beforeEach(() => {
    view = render(<App />);
    input = view.getByLabelText('Basket Fruits');
    button = view.getByText('Clean basket');
});

describe('Cleaning', () => {
    test('should allow the user to modify the collect fruits on the basket', () => {
        fireEvent.change(input, { target: { value: '🍎🍂🍎🍂🍂🍏🍏🍏' } });
        expect(input.value).toEqual('🍎🍂🍎🍂🍂🍏🍏🍏');
    });

    test.each([
        {basket: '🍎🍂🍎🍂🍂🍏🍏🍏', expected: '🍎🍎🍏🍏🍏'},
        {basket: '🍎🍂🍂🍏', expected: '🍎🍏'},
    ])('should clean the basket with $basket when the user click on the button', ({ basket, expected }) => {
        fireEvent.change(input, { target: { value: basket } });
        fireEvent.click(button);
        expect(input.value).toEqual(expected);
    });
});
