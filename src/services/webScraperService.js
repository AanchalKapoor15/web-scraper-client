import axios from 'axios'

import { GOOGLE_BROWSER, EMPTY_STRING } from '../constants'

export const getOccurrences = async (browser, searchTerm, url) => {
    const path = `${process.env.REACT_APP_API_URL}/webScraper?browser=${browser}&searchTerm=${searchTerm}&url=${url}`

    let response = (await axios.get(path)).data

    response = browser === GOOGLE_BROWSER ? updateResponseForGoogle(response) : response
    response = formatResponse(response)

    return response
}

const updateResponseForGoogle = (data) => {
    //The way Google's web page is structured, 
    //a single url is written double number of times in the HTML source
    return data.map(element => element / 2)
}

const formatResponse = (data) => {
    data = data.join()
    data = data === EMPTY_STRING ? '0' : data

    return data
}
