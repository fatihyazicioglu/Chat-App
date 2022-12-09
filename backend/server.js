const express = require('express');
const app = express();

const rooms = ['web-dev-team', 'football','musicband','family','friends'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server,{
    cors:{
        origin
    }
})

