const axios = require('axios')

class LocationController{
    static getLocation(req, res, next) {
        const { search } = req.body
        const LOCATION_IQ_KEY = process.env.LOCATION_IQ_KEY
        axios({
            method: 'GET',
            url: 'https://us1.locationiq.com/v1/search.php',
            params: {
                key: LOCATION_IQ_KEY,
                format: 'json',
                addressdetails: '1',
                limit: '1',
                q: search
            }
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = LocationController
