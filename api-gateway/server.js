const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', proxy('http://localhost:4001'));      // Auth Service
// app.use('/api/employees', proxy('http://localhost:4002')); // Core Service
// app.use('/api/lifecycle', proxy('http://localhost:4003')); // Onboarding/Offboarding
// app.use('/api/leaves', proxy('http://localhost:4004'));    // Leave Service

app.listen(8000, () => {
    console.log('Gateway running on Port 8000');
});