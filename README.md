## Quick start

Build scripts can be run with either `yarn` or `npm`. After cloning the repository, run the following to setup the project for development/deployment.

`npm run setup` or `yarn setup`

This will install all the required npm dependencies for both the react project and the cordova project.

Builds are handled in the 'cordova' directory. Change to this directory and add a cordova platform for development.

`cordova platform add android@6.2.3`

When a cordova build or run command is issued a `yarn build` command is also auto generated, via a hook.

`cordova run android`

Automatically creates a build that is then loaded to the phone or emulator for testing. Source-maps are also generated so that chrome tools can be used to debug the minified js.

`cordova build android`

Creates a build located in the following directory

`cordova/platforms/android/build/outputs/apk/`

## Docker

If you want to start up the application you just need to run `docker-compose up`.
This will build the application and run the dev server in a container.
You can access the website from your browser at `localhost:3000`.

## Fake Device Hot Swapping

After starting your development environment, with the dev server running on your computer.
You need to have the phone navigate to the dev server not the local files on the device.
Your phone and computer both need to be on the same network.

To do this, in chrome on your development machine go to `chrome://inspect` then inspect the WebView of the phone.
In the inspect window change the address from `file:///#!/` to your computer internal ip address `http://192.168.1.2:3000`.
If the loading spinner is not going away just refresh the page again, as chrome DataSaver may have cached the os version of the `cordova.js`.
If the loading spinner is still there, go in the chrome inspect console and force the deviceready event `window.document.dispatchEvent(new CustomEvent("deviceready"))`.

