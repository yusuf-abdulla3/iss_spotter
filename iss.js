//What we need to do:
//Fetch our IP address
//Fetch the geo coordinates (Latitude and Longitude) for our IP
//Fetch the next ISS flyovers for our geo coordinates

const request = require('request');

const fetchMyIp = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });

  //use request to fetch IP address from JSON API
};

const fetchCoordsByIp = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) =>{

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching timestamp for ISS fly over. Response: ${body}`;
      return callback(Error(msg), null);
    
    }
    const timeStamp = JSON.parse(body).response;

    callback(null, timeStamp);

  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIp(ip, (error, loc) => {
      if(error) {
        return callback(error, null) 
      }
      fetchISSFlyOverTimes(loc,(error, nextPasses) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, nextPasses);
      })
    })
  })
};

module.exports = { nextISSTimesForMyLocation };