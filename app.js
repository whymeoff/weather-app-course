const geoLocation = require('./utils/geoLocation');
const forecast = require('./utils/forecast');
const yargs = require('yargs');

yargs.command({
    command: 'weather',
    describe: 'Some weather service',
    builder: {
        place: {
            describe: 'What place you need to check',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        geoLocation(argv, (err, { lat, long } = {}) => {
            if (err) {
                console.log(err);
            } else {
                forecast(lat, long, (err, {temp, maxTemp, precipProbability} = {}) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Current temperature is: ${temp}. Max temperature is: ${maxTemp}. Chance of rain today is: ${precipProbability}%`);
                    }
                })
            }
        })
    }
})

yargs.parse();