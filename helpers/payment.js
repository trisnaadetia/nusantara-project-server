const midtransClient = require('midtrans-client');
// const midtransClient = require('midtrans-client'); // use this if installed via NPM

// initialize snap client object
let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : process.env.SERVER_KEY,
    clientKey : process.env.CLIENT_KEY
});


// create transaction

module.exports = {
    create: (parameter) => {
        return new Promise((resolve, reject) => {
            snap.createTransaction(parameter)
                .then((transaction)=>{
                    // transaction token
                    let transactionToken = transaction.token;
                    // console.log('transactionToken:',transactionToken);
            
                    // transaction redirect url
                    let transactionRedirectUrl = transaction.redirect_url;
                    // console.log('transactionRedirectUrl:',transactionRedirectUrl);

                    resolve({
                        token: transaction.token,
                        redirect_url: transaction.redirect_url,
                    })
                })
                .catch((e)=>{
                    // console.log('Error occured:',e.message);
                    reject(e.message)
                });
        })
    }

}

// transaction is object representation of API JSON response
// sample:
// {
// 'redirect_url': 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0a2cbe7-dfb7-4114-88b9-1ecd89e90121', 
// 'token': 'f0a2cbe7-dfb7-4114-88b9-1ecd89e90121'
// }