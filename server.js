const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersDB = {};

app.post('/api/register', (req, res) => {
    const { username, password, upiId } = req.body;
    if (usersDB[username]) return res.status(400).json({ success: false, message: "User pehle se hai!" });
    usersDB[username] = { password, upiId, balance: 20 };
    res.json({ success: true, message: "Account Ban Gaya! Ab Login Karein." });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersDB[username];
    if (!user || user.password !== password) return res.status(400).json({ success: false, message: "Galat Credentials!" });
    res.json({ success: true, message: "Login Success!", username, balance: user.balance });
});

app.post('/api/complete-task', (req, res) => {
    const { username } = req.body;
    if (!usersDB[username]) return res.status(400).json({ success: false, message: "User invalid" });
    usersDB[username].balance += 10;
    res.json({ success: true, newBalance: usersDB[username].balance, message: "Task complete! ₹10 jude." });
});

app.post('/api/withdraw', (req, res) => {
    const { username, amount } = req.body;
    if (!usersDB[username] || usersDB[username].balance < amount) {
        return res.status(400).json({ success: false, message: "Insufficient balance" });
    }
    usersDB[username].balance -= amount;
    res.json({ success: true, newBalance: usersDB[username].balance, message: `₹${amount} withdrawal request submit ho gayi!` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
