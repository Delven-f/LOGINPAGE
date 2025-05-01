const path = require('path');
const cnf = require(path.join(__dirname, '..', '..', 'Config.js'));
const express = require('express');
const router = express.Router();

function generateGuestID() {
    return 'guest_' + Math.random().toString(36).substr(2, 9);
}

router.post('/server_data.php', function (req, res) {
    const content = `server|${cnf.server_ip}
port|${cnf.server_port}
type|1
#maint|lorem ipsum dolor sit amet
loginurl|${cnf.loginurl}
meta|${cnf.meta}
RTENDMARKERBS1001`;

    res.send(content);
});

router.post('/login_or_register.php', function (req, res) {
    const { username, password, isGuest } = req.body;

    if (isGuest) {
        const guestID = generateGuestID();
        return res.json({ status: 'success', message: 'Logged in as guest', playerID: guestID });
    }

    if (username && password) {
        const playerID = username;

        if (username === 'newUser' && password === 'securepassword') {
            return res.json({ status: 'success', message: 'Login successful', playerID: playerID });
        } else {
            return res.json({ status: 'error', message: 'Invalid username or password' });
        }
    }

    return res.json({ status: 'error', message: 'Missing username or password' });
});

module.exports = router;
