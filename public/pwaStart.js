function registerServiceWorker() {
    if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker.register(`${window.location.origin}/sw.js`, { scope: '/' }).then(() => {
            console.log('Service Worker registrado com sucesso.');
        }).catch(error => {
            console.log('Service Worker falhou:', error);
        });
    }
}
registerServiceWorker()