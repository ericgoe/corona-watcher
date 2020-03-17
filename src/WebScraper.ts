import axios, { AxiosResponse, AxiosError } from 'axios'
import Result from './Request'

class WebScraper {
    private static axios: any
    constructor () {
        if (!WebScraper.axios) {
            WebScraper.axios = axios.create({
                baseURL: 'https://thevirustracker.com'
            })
        }
    }


    /**
     * Creates a result of the numbers in Luxembourg
     */
    public async checkCasesInLuxembourg (): Promise<Result> {
        try {
            const result: AxiosResponse = await WebScraper.axios.get('/free-api?countryTotal=LU')
            return new Result(result)
        } catch (err) {
            throw err.response?.status || err.code
        }
    }
}

export default WebScraper