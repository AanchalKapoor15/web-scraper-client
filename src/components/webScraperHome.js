import React, { useState } from 'react'
import {
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Label
} from 'reactstrap'

import { BROWSERS } from '../constants'
import { getOccurrences } from '../services/webScraperService'
import { GlobalStyles } from '../styles'


const Home = () => {
    const [browser, setBrowser] = useState('')
    const [isBrowserDropdownOpen, setIsBrowserDropdownOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [url, setUrl] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    const browserDropdownElement = (browser) => {
        return (
            <DropdownItem key={browser}
                onClick={() => { setBrowser(browser) }}>
                {browser}
            </DropdownItem>
        )
    }

    const formNotValid = () => {
        return browser === '' || keyword === '' || url === ''
    }

    const resultAvailable = () => {
        if (loading) {
            return <span>Loading...</span>
        }
        else if (result && result.length > 0) {
            return (
                <div>
                    <Label>Result: {result}</Label>
                </div>
            )
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)

        let response = await getOccurrences(browser, keyword, url.replace('https://', ''))
        
        setResult(response)
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={onSubmit}
                style={GlobalStyles.form}>
                <h1
                    style={GlobalStyles.header}>
                    Web Scraper
                </h1>
                <Dropdown
                    isOpen={isBrowserDropdownOpen}
                    toggle={() => { setIsBrowserDropdownOpen(!isBrowserDropdownOpen) }}
                    style={GlobalStyles.browserDropDown}>
                    <DropdownToggle
                        caret>
                        {browser === '' ? 'Select Browser' : browser}
                    </DropdownToggle>
                    <DropdownMenu>
                        {Object.values(BROWSERS).map(browserDropdownElement)}
                    </DropdownMenu>
                </Dropdown>
                <br />
                <Input
                    type="text"
                    placeholder="Keyword to search"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)} />
                <br />
                <Input
                    type="text"
                    placeholder="URL to search, eg, www.infotrack.com.au"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)} />
                <br />
                <Button type="submit" disabled={formNotValid()}>Search</Button>
            </form>
            <br />
            <div style={GlobalStyles.result}>
                <br />
                {resultAvailable()}
            </div>
        </div>
    )
}

export default Home
