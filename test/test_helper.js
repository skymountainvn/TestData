const User = require ('../src/models/user.model.js');
require('../src/startDatabase');
beforeEach('Remove all data before each Test', async () => {
    await User.remove();

});

