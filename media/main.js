// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    const vscode = acquireVsCodeApi();

    console.log("Bismillah");
    const selector = '#player';

    const player = new Plyr(selector, {
        debug: true,
        title: 'Mantap Top',
        keyboard: {
            global: true,
        },
        tooltips: {
            controls: true,
        },
        captions: {
            active: true,
        },
    });

    // Expose for tinkering in the console
    window.player = player;


    setInterval(() => {

        vscode.postMessage({
            command: 'alert',
            text: 'Tes' + player.currentTime
        });
    }, 10000);

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'refactor':
                vscode.postMessage({
                    command: 'alert',
                    text: 'Tes' + player.currentTime
                });
                break;
        }
    });
}());