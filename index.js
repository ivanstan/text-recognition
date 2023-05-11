const ReadText = require('text-from-image')

ReadText('./IvV2y.png').then(text => {
    console.log(text);
}).catch(err => {
    console.log(err);
})
