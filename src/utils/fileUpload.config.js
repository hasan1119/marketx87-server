const path = require('path');

const imagConfig = {

    profile: {
        DIR: path.join(__dirname + './../../public/files/profile'),
        SIZE: 10000000,
        MINE: ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml'],
    }
};

module.exports = {
    imagConfig,
};
