const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const configPath = './config.json';
const adminPath = './admin.json';

function getConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function getAdmin() {
  return JSON.parse(fs.readFileSync(adminPath, 'utf-8'));
}

function saveAdmin(data) {
  fs.writeFileSync(adminPath, JSON.stringify(data, null, 2), 'utf-8');
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🔁 JavaScript déplacé de index.html vers ici
app.get('/index.js', (req, res) => {
  res.type('.js').send(`
// Chargé dynamiquement depuis /index.js
async function checkStatus() {
  const res = await fetch('/status');
  const data = await res.json();
  if (data.banned) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('bannedMessage').style.display = 'block';
  } else if (data.locked) {
    bloquerFormulaire(data.timeLeft);
  }
}

function bloquerFormulaire(ms) {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('lockedMessage').style.display = 'block';
  const txt = document.getElementById('countdownText');
  const interval = setInterval(() => {
    ms -= 1000;
    if (ms <= 0) return location.reload();
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    txt.textContent = \`⏳ Essayez à nouveau dans \${m}m \${s}s\`;
  }, 1000);
}

async function envoyer() {
  const input = document.getElementById('passwordInput').value.trim();
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: input })
  });
  const data = await res.json();

  if (data.success) {
    window.location.href = 'unlock.html';
  } else if (data.banned) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('bannedMessage').style.display = 'block';
  } else if (data.locked) {
    bloquerFormulaire(data.timeLeft);
  } else {
    document.getElementById('errorMsg').textContent = "Mot de passe incorrect.";
  }
}

window.onload = checkStatus;
  `);
});

// 🔐 Authentification
app.post('/login', (req, res) => {
  const { password } = req.body;
  const config = getConfig();
  const admin = getAdmin();
  const now = Date.now();

  if (!config.ENABLE_BLOCKING) {
    if (password === config.PASSWORD) return res.json({ success: true });
    else return res.json({ success: false, message: "Mot de passe incorrect" });
  }

  if (admin.banned) {
    return res.json({ success: false, banned: true, message: "Vous êtes banni" });
  }

  if (now < admin.lockUntil) {
    return res.json({
      success: false,
      locked: true,
      timeLeft: admin.lockUntil - now
    });
  }

  if (password === config.PASSWORD) {
    saveAdmin({ attempts: 0, lockUntil: 0, banned: false });
    return res.json({ success: true });
  }

  admin.attempts++;

  if (admin.attempts >= config.MAX_TOTAL_ATTEMPTS_BAN) {
    admin.banned = true;
  } else if (admin.attempts >= config.MAX_ATTEMPTS_SHORT_LOCK) {
    admin.lockUntil = now + config.LONG_LOCK_DURATION;
  } else {
    admin.lockUntil = now + config.SHORT_LOCK_DURATION;
  }

  saveAdmin(admin);
  res.json({
    success: false,
    locked: true,
    timeLeft: admin.lockUntil - now
  });
});

// 🔎 Statut
app.get('/status', (req, res) => {
  const admin = getAdmin();
  const now = Date.now();

  if (admin.banned) return res.json({ banned: true });
  if (now < admin.lockUntil) return res.json({ locked: true, timeLeft: admin.lockUntil - now });

  return res.json({ locked: false });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});