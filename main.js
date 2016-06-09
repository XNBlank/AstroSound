"use strict";

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var open = require('open');
const path = require('path');

const mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
    let mainWindow = new BrowserWindow({
        width: 700,
        height: 600,
        frame: false,
        minWidth: 670,
        minHeight: 580,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        icon: __dirname + '/app.png'
    });

    mainWindow.setThumbarButtons([
  {
    tooltip: 'Play',
    icon: path.join(__dirname, '/img/play.png'),
    click() { document.getElementById("play_button").click(); }
  },
  {
    tooltip: 'Stop',
    icon: path.join(__dirname, '/img/stop.png'),
    click() { document.getElementById("stop_button").click(); }
  }
]);

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    var webContents = mainWindow.webContents;

    mainWindow.on('closed', function() {
        mainWindow = null;
        app.quit();
    });

    webContents.on('new-window', function(event, url){
        event.preventDefault();
        open(url);
    });

});