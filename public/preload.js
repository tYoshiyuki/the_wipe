const { desktopCapturer, contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "electronApi", {
        async requestDesktopCapture() {
            const sources =  await desktopCapturer.getSources({types:['window'], thumbnailSize: {width:200,height:200}})
            sources.map((src) => {
                src.thumbnail = src.thumbnail.toDataURL()
            })
            return sources
        },
    },
);

ipcRenderer.on('drop-file', (e, data) => {
    const event = new CustomEvent('drop-file', {detail:data})
    document.dispatchEvent(event)
})

ipcRenderer.on('toggle-draw', (e) => {
    const event = new Event('toggle-draw')
    document.dispatchEvent(event)
})

