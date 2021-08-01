const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   return ip;
// });

// fetchCoordsByIp("199.7.157.89", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates: ", coordinates);
// });
// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, time) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates: ", time);
// });

const printPassTimes = (passTimes) => {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work", error);
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes };