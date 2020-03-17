import Watcher from './Watcher'
import * as fs from 'fs'
import * as path from 'path'

const start = () => {
    let config

    if (fs.existsSync(path.join(__dirname, '../', 'config/config.js'))) { // personalized config exists
        config = require('../config/config')
    } else {
        config = require('../config/config.sample')
    }

    const watcher: Watcher = new Watcher(config)
}

start()