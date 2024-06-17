import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('http://localhost:3001/warehouse/package', () => {
        return HttpResponse.json({
            status: 'received'
        })
    }),
]
