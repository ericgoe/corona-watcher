import { State, Config } from './types/constants'
import WebScraper from './WebScraper'
import StateComparator from './StateComparator'
import PushoverSender from './PushoverSender'
import Result from './Request'

class Watcher {
    private lastUpdate: State = {
        cases: 0,
        infected: 0,
        deaths: 0,
        recovered: 0
    }
    private scraper: WebScraper = new WebScraper()
    private pushoverSender: PushoverSender
    private config: Config

    constructor (config: Config) {
        this.config = config
        this.pushoverSender = new PushoverSender(
            config.pushoverToken.user,
            config.pushoverToken.application
        )
        console.log('[Corona-Watcher] started')
        this.setupTimer()
    }

    /**
     * Setup a time of 15s to fetch for new data
     */
    private setupTimer () {
        this.fetchData()
    }

    /**
     * Fetches the numbers of cases, infections, recoveries and deaths
     */
    async fetchData () {
        try {
            const result: Result = await this.scraper.checkCasesInLuxembourg()

            if (!result.isCorrupt()) {
                if (!StateComparator.compare(this.lastUpdate, result.getState())) { // states are different
                    this.sendResults(result.getState())
                }
            } else {
                console.log('Error: raw data \'' + JSON.stringify(result.getRawData()) + '\'')
            }

        } catch (e) {
            this.sendError(e)
            return
        }

        finally  {
            setTimeout(this.fetchData.bind(this), this.config.APIrequestInterval) // restart Timeout
        }
    }

    /**
     * Sends the new data to Pushover
     * @param state the new state
     */
    private async sendResults (state: State) {
        console.log('[Corona-Watcher] new data available - pushing to Pushover.net')
        this.pushoverSender.send({
            message: 'Cases: ' + state.cases + '<br />Infections: ' + state.infected + '<br />Deaths: ' + state.deaths + '<br />Recoveries: ' + state.recovered,
            title: 'Corona-Watcher',
            priority: this.config.developmentMode ? -1 : 2,
        })
         
        this.lastUpdate = state
    }

    /**
     * Sends a message to Pushover and prints it out in the console
     * @param err HTTP-Error as string
     */
    private async sendError (err: string) {
        const errMsg: string = '[Error] Error occured during API fetch (' + err + ')'
        this.pushoverSender.send({
            message: errMsg,
            title: 'Corona-Watcher',
            priority: this.config.developmentMode ? -1 : 0,
        })
        console.log(errMsg)
    }
}


export default Watcher