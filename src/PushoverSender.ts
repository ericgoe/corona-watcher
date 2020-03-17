import { PushoverMessage } from './types/constants'
const Pushover = require('pushover-notifications')

class PushoverSender {
    private sender?: any
    constructor (userToken: string, applicationToken: string) {
        this.sender = new Pushover({
            user: userToken,
            token: applicationToken
        })
    }


    /**
     * Sends a message to Pushover
     * @param msg The message which will be sent
     */
    public send (msg: PushoverMessage) {
        this.sender.send({
            ...msg,
            html: 1,
            retry: 30,
            expire: 10800
        }, (err: Error | undefined, res: any) => {
            if (err) {
                console.error('[PushoverSender]' + err.message)
                return
            }
            console.log('[PushoverSender] Sending following message \'' + msg.message + '\'')
        })
    }
}

export default PushoverSender