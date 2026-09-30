const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.send(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Money Power</title>
        <style>
            body { font-family: sans-serif; text-align: center; background: #eef2f5; padding: 20px; margin: 0; }
            .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
            .btn-ad { display: block; background: #28a745; color: white; padding: 15px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 18px; margin-top: 15px; }
            .balance { font-size: 28px; color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>

        <h2>⚡ Money Power ⚡</h2>

        <div class="card">
            <h3>Welcome User!</h3>
            <p>Wallet Balance:</p>
            <div class="balance">₹<span id="bal">100</span></div>
        </div>

        <div class="card" style="margin-top: 15px;">
            <h3>Daily Tasks & Ads</h3>
            <p>Task complete karke ₹10 kamaein</p>
            
            <a href="https://thoroughgear.com/9O07aE" target="_blank" class="btn-ad" onclick="document.getElementById('bal').innerText = parseInt(document.getElementById('bal').innerText) + 10;">Complete Task & Claim ₹10</a>
        </div>

    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
