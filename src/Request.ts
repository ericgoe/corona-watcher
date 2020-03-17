import { State } from './types/constants'
import { AxiosResponse } from 'axios'

class Result {
    private result: AxiosResponse
    constructor (result: AxiosResponse) {
        this.result = result
    }

    public getState (): State {
        const countrydata = this.result.data.countrydata[0]
            return {
                cases: countrydata.total_cases,
                infected: countrydata.total_active_cases,
                deaths: countrydata.total_deaths,
                recovered: countrydata.total_recovered
            }
    }

    public getRawData (): AxiosResponse {
        return this.result
    }

    public isCorrupt (): boolean {
        return this.getState().cases === undefined
    }
}

export default Result