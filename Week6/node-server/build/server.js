"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url = __importStar(require("url"));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello, World!</h1>');
    res.end();
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
server.on('request', (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Home</title></head><body><h1>Welcome to the home page!</h1><p>This is the home page of my simple server.</p><a href="/about">About</a><a href="/logger">Logger</a><a href="/data">Data</a><a href="/date">Date</a></body></html>');
        res.end();
    }
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>About</title></head><body><h1>About us</h1><p>We are a small company that specializes in creating simple servers.</p></body></html>');
        res.end();
    }
    else if (req.url === '/logger') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const messages = ['log message 1', 'log message 2', 'log message 3', 'log message 4', 'log message 5'];
        messages.sort();
        const html = `<html><head><title>Logger</title></head><body><h1>Logger</h1><ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul></body></html>`;
        res.write(html);
        res.end();
    }
    else if (req.url === '/data') {
        const data = {
            name: 'John Doe',
            age: 30,
            city: 'New York'
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url.startsWith('/date')) {
        const query = url.parse(req.url, true).query;
        const year = query.year;
        const month = query.month;
        const day = query.day;
        const hour = query.hour;
        const minute = query.minute;
        const second = query.second;
        const date = new Date(year, month - 1, day, hour, minute, second);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<html><head><title>Date</title></head><body><h1>Date</h1><p>${date.toString()}</p></body></html>`);
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>');
        res.end();
    }
});
