const fs = require("fs");
const blackHoleDeployer = require('./utils/BlackHoleDeployer');
const check = require('./utils/Check');

const getParams = () => {
    const argv = require('minimist')(process.argv.slice(2), {
        default: {
            config: 'config.json'
        }
    });

    const configFile = argv.config;
    check(fs.existsSync(configFile), "configuration file: " + configFile);
    const config = JSON.parse(fs.readFileSync(configFile));
    return config;
}

const params = getParams().blackhole;

params.contract_file = "./blackhole/build/contracts/BlackHoleEosAccount.json";

blackHoleDeployer(params)
.then(blackHole => {
    console.log("(RESULT) blackhole address: " + blackHole.options.address)
    fs.writeFileSync('./blackhole_address', blackHole.options.address)
})
.catch(console.error);

// const argv = require('minimist')(process.argv.slice(2), {
//     default: {
//         provider: 'http://localhost:8545',
//         contract_file: './blackhole/build/contracts/BlackHoleEosAccount.json',
//         gas: 3000000
//     },
//     boolean: ['help'],
//     string: ['erc20_address', 'sender']
// });


// if (argv.help){
//     console.log("Help for BlackHole contract deployer:");
//     console.log("");
//     console.log("  --sender           address of account that is installing the contract");
//     console.log("  --erc20_address    address of erc20 contract blackhole will teleport from");
//     console.log("  --gas              amount of gas used in the transaction");
//     console.log("  --critic_block     after it anyone can close the blackhole");
//     console.log("  --minimum_amount   the minimum number of teportable tokens");
//     console.log("  --contract_file    compiled blackhole contract");
//     process.exit(0);
// }
