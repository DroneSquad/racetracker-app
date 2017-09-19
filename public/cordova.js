// This is to fake cordova events needed for react

/** Fake the device ready event */
setTimeout(() => window.document.dispatchEvent(new CustomEvent("deviceready")), 5000);
