import {app, BrowserWindow} from 'electron'
import path from 'path'

app.on('ready',()=>{
    let mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        // Prevent white flash during load
        backgroundColor: '#242424' 
    })
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'))
})