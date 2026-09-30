const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.get('*', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Money Power - Full Version</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; background: #eef2f5; margin: 0; padding: 20px; }
            .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; margin-bottom: 15px; }
            input { width: 90%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; }
            button, .btn-link { display: block; background: #28a745; color: white; border: none; padding: 12px; border-radius: 6px; width: 100%; font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 8px; text-decoration: none; box-sizing: border-box; }
            .btn-withdraw { background: #007bff; }
            .hidden { display: none; }
            .balance { font-size: 26px; color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>

        <h2>⚡ Money Power v2.0 ⚡</h2>

        <!-- LOGIN / REGISTER SECTION -->
        <div id="authBox" class="card">
            <h3 id="formTitle">User Login</h3>
            <input type="text" id="username" placeholder="Phone Number / Username">
            <input type="password" id="password" placeholder="Password">
            <input type="text" id="upiId" placeholder="UPI ID / Cashfree Details" class="hidden">
            
            <button onclick="handleAuth()">Login Karein</button>
            <p style="cursor:pointer; color:#007bff; font-size:14px;" onclick="toggleAuth()">
                <span id="toggleText">Naya Account Banayein (Register)</span>
            </p>
        </div>

        <!-- MAIN DASHBOARD -->
        <div id="dashboard" class="hidden">
            <div class="card">
                <h3>Welcome, <span id="userDisp">User</span>!</h3>
                <p>Wallet Balance:</p>
                <div class="balance">₹<span id="bal">100</span></div>
            </div>

            <!-- TASK SECTION -->
            <div class="card">
                <h3>Daily Tasks & Ads</h3>
                <p>Task complete karke ₹10 kamaein</p>
                <a href="https://thoroughgear.com/9O07aE" target="_blank" class="btn-link" onclick="rewardUser()">Complete Task & Claim ₹10</a>
            </div>

            <!-- WITHDRAWAL SECTION -->
            <div class="card">
                <h3>Instant Withdrawal</h3>
                <input type="number" id="withdrawAmt" placeholder="Minimum ₹10">
                <button class="btn-withdraw" onclick="processWithdrawal()">Instant Redeem</button>
            </div>
            
            <button style="background:#dc3545;" onclick="logout()">Logout</button>
        </div>

        <script>
            let isRegister = false;

            function toggleAuth() {
                isRegister = !isRegister;
                document.getElementById('formTitle').innerText = isRegister ? "Naya Account Register Karein" : "User Login";
                document.getElementById('upiId').classList.toggle('hidden', !isRegister);
                document.getElementById('toggleText').innerText = isRegister ? "Pehle se account hai? Login karein" : "Naya Account Banayein (Register)";
            }

            function handleAuth() {
                let user = document.getElementById('username').value;
                if(!user) { alert("Kripya Phone Number / Username dalein!"); return; }
                
                document.getElementById('userDisp').innerText = user;
                document.getElementById('authBox').classList.add('hidden');
                document.getElementById('dashboard').classList.remove('hidden');
            }

            function rewardUser() {
                let bal = document.getElementById('bal');
                bal.innerText = parseInt(bal.innerText) + 10;
            }

            function processWithdrawal() {
                let amt = parseInt(document.getElementById('withdrawAmt').value);
                let currentBal = parseInt(document.getElementById('bal').innerText);

                if(!amt || amt < 10) {
                    alert("Minimum withdrawal amount ₹10 hai!");
                    return;
                }
                if(amt > currentBal) {
                    alert("Aapke wallet me paryapt balance nahi hai!");
                    return;
                }

                document.getElementById('bal').innerText = currentBal - amt;
                alert("Withdrawal request successful! Cashfree / UPI dwara ₹" + amt + " process ho raha hai.");
                document.getElementById('withdrawAmt').value = '';
            }

            function logout() {
                document.getElementById('dashboard').classList.add('hidden');
                document.getElementById('authBox').classList.remove('hidden');
            }
        </script>

    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
