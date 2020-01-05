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
        geoLocation(argv.place, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                forecast(data.lat, data.long, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Current temperature is: ${data.temp}. Max temperature is: ${data.maxTemp}. Chance of rain today is: ${data.precipProbability}%`);
                    }
                })
            }
        })
    }
})

yargs.parse();