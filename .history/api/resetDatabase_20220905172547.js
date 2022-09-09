const User = require('./models/User.js');
const State = require('./models/State.js');
const City = require('./models/City.js');
const Publisher = require('./models/Publisher.js');

(async () => {
    //await User.sync({ force: true });
    //await State.sync({ force: true });
    //await City.sync({ force: true });
    await Publisher.sync({ force: true });
})();