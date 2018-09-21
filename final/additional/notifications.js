//I'm trying make this in typescript but nothing work
//im also try third party libraires but webpack doesnt transpiler
//throwing some errors of include node.js libraries...


function createNotification(title, body){
    let myNotification = new Notification(title+" (MyWeek)", {
        body
    })

}

window.createNotification = createNotification;