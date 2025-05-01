const path = require('path');
const cnf = require(path.join(__dirname, '..', '..', 'Config.js'));
const express = require('express');
const router = express.Router();

function generateGuestID() {
    return 'guest_' + Math.random().toString(36).substr(2, 9);
}

router.all('/', function (req, res) {
    const { isGuest, username, password } = req.body;

    if (isGuest) {
        const guestID = generateGuestID();
        return res.redirect(`/game/${guestID}`);
    }

    if (username && password) {
        if (username === 'newUser' && password === 'securepassword') {
            return res.redirect(`/game/${username}`);
        } else {
            return res.render('HomeView', { errorMessage: 'Invalid username or password' });
        }
    }

    res.render('HomeView');
});

module.exports = router;
