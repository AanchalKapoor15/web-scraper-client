import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

import Home from './webScraperHome.js'

describe('Web Scraper Home', () => {
    it('renders without crashing', async () => {
        const div = document.createElement('div')
        await act(async () => {
            ReactDOM.render(
                <Home/>,
                div
            )
        })
        ReactDOM.unmountComponentAtNode(div)
    })
})