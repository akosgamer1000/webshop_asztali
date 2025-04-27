import {app, BrowserWindow} from 'electron'
import path from 'path'

app.on('ready',()=>{
    let mainWindow = new BrowserWindow({ 
        width: 1300, 
        height: 900,
        minWidth: 1200, 
        minHeight:800,
        //autoHideMenuBar: true,
        title: 'Pixelforge Admin',
        icon: path.join(app.getAppPath(), 'logo1.ico'), 
        
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#242424' 
    })
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'))
})