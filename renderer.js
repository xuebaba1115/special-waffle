// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var http = require('http');
var url = require('url');
var util = require('util');
const shell = require('electron').shell




var li1 = []
var options = {
    hostname: '103.10.1.140',
    port: 36901,
    path: '/api/alerts?state=alerting',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer eyJrIjoiNzdoOXh6MnA2cWYwTm5PbUljeE5rVFZqemNZYklkWTAiLCJuIjoiYWxldHJpbmciLCJpZCI6MX0='
    }
};
/*
var options1 = {
    hostname: '192.168.0.16',
    port: 53000,
    path: '/api/alerts?state=alerting',
    method: 'GET',
    headers: {
        //'Authorization': 'Bearer eyJrIjoiOXM5WmYxUDVQNENJUDVLd1dxZnducWd4NmFzcGNRMHAiLCJuIjoiYWxlcnRpbmciLCJpZCI6MX0='
        'Authorization': 'Bearer eyJrIjoiSTBTdkMyUjVkamFkakRNaTc1bUpsQnlUMEJIOW9Ea0YiLCJuIjoid2VjaGF0IiwiaWQiOjF9'
     
    }
};*/

function isEquals(a, b) {
    return JSON.stringify(a.sort()) != JSON.stringify(b.sort());
}
function intervalF1(num) {
    // console.log("The time of setInterval load is " + num);

    var req = http.request(num, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var returnData = JSON.parse(chunk);
            // console.log(xiaoxi1.li1)
            if (isEquals(li1, returnData)) {
                li1 = returnData

                li1.forEach(function (element) {
                    // console.log(typeof element); 
                    // console.log(element['name'])
                    //   util.format('Short message part%s', element['name']),
                    var notification = {
                        title: util.format('Grafana Alerting Notification From', num['hostname']),
                        timeout: 3,
                        body: util.format('Alerting:%s!', element['name']),

                    }
                    const myNotification = new window.Notification(notification.title, notification)
                    myNotification.onclick = () => {
                        shell.openExternal(util.format('http://%s:%s/dashboard/%s?panelId=%s&fullscreen&edit&tab=alert', num['hostname'], num['port'], element['dashboardUri'], element['panelId']))
                    }
                }, this);
            } else {
                console.log('same')
            }


        });
    });
    req.on('error', function (e) {
        console.log('错误：' + e.message);
    });
    req.end();

}
const BrowserWindow = require('electron').remote.BrowserWindow
const aButton = document.getElementById('basic-noti')
aButton.addEventListener('click', function (event) {
    //const modalPath = path.join('')
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL('http://www.baidu.com')
    win.show()
})

//每个1S执行一次
var interval1 = setInterval(intervalF1, 5000, options);












