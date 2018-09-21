const {shell,dialog} = require('electron').remote

window.openLink = function(link){
    shell.openExternal(link);
}

window.openFile = function(link){
    return shell.openItem(link);
}

window.chooseFile = function(){
    var path = dialog.showOpenDialog({
        properties: ['openFile']
    });
    return path;
}