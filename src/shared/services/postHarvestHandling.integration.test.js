import { sentToWarehouse } from "./postHarvestHandling";
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '../../mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Storage', () => {
    it('should sent the basket to the warehouse', async () => {
        const fetchSpy =
            vi.spyOn(global, 'fetch')

        let response = await sentToWarehouse('🍎🍎🍏');

        expect(response).toEqual({status: 'received', message: 'Basket received'});
        expect(fetchSpy).toHaveBeenCalled();
        fetchSpy.mockRestore();
    });

    it('should return a user error when the basket is empty', async () => {
        let response = await sentToWarehouse('');
        expect(response).toEqual({status: 'error', message: 'Basket is empty'});
    });
});




