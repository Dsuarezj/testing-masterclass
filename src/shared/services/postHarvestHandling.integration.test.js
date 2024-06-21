import { sentToWarehouse } from "./postHarvestHandling";

describe.only('Storage', () => {
    it('should sent the basket to the warehouse', async () => {
        const fetchSpy =
            jest.spyOn(global, 'fetch')

        let response = await sentToWarehouse('🍎🍎🍏');

        console.log("*******" + JSON.stringify(response));

        expect(response).toEqual({status: 'received', message: 'Basket received'});
        expect(fetchSpy).toHaveBeenCalled();
        fetchSpy.mockRestore();
    });
});
