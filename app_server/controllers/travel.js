const tripEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync("./data/trips.json","utf8"));

// const travel = (req, res) => {
//     res.render('travel', {title: 'Travlr Gateways - Travel', trips});
// };

const travel = async function(req, res, next) {
    await fetch(tripEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!json instanceof Array) {
                message = 'API lookup error'
                json = [];
            } else {
                if(!json.length) {
                    message = 'No trips exist in the database'
                }
            }
            res.render('travel', {title: 'Travlr Gateways - Travel', trips: json, message});
        })
        .catch(err => res.status(500).send(e.message))
}

module.exports = {
    travel
}