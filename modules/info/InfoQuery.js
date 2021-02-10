const Query = require("../types/Query");

class InfoQuery extends Query {
    constructor(url, identifier, environment) {
        super(environment, identifier);
        this.url = url;
        this.environment = environment;
    }

    async connect() {
        //TODO FIX/IMPLEMENT CHANNELS
        try {
            let args = ["-J", "--flat-playlist"]
            let data = await this.start(this.url, args);
            return JSON.parse(data);
        } catch (e) {
            if(e.stderr != null && e.stderr.includes("Unsupported URL")) { // TODO Add more error handling
                console.log(`The url: ${this.url}, is not supported by youtube-dl.`);
                return null;
            } else  {
                console.log(e)
            }
        }
    }
}
module.exports = InfoQuery;
