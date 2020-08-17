import axios from 'axios'

import { getOccurrences } from './webScraperService'
import { GOOGLE_BROWSER, SEARCH_TERM, URL } from '../constants'

jest.mock('axios')

describe('getOccurrences', () => {
    it('fetches successfully data from an API', async () => {
        const input = {
            data: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0]
        }

        const expectedResponse = '1,1,0,0,0,0,0,0,0,0'

        axios.get.mockImplementationOnce(() => Promise.resolve(input))

        await expect(getOccurrences(GOOGLE_BROWSER, SEARCH_TERM, URL)).resolves.toEqual(expectedResponse)
    })
})