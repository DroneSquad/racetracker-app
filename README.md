
of note: the package-lock.json files seem to add a lot of noise to commits and make diffing difficult, i would suggest these files get their own unique commit on change.

## Quick start

build scripts can be run with either `yarn` or `npm`. after cloning the repository run the following to setup the project for development/deployment.

`npm run setup` or `yarn setup`

this will install all the required npm dependencies for both the react project and the cordova project.

in addition the following scripts are also available

yarn start: debug of web app

yarn build: production build of web app

yarn test: start interactive test harness

## Cordova

cordova builds are handled in the 'cordova' directory.
be sure to add a cordova platform for development

cordova platform add android@6.2.3

anytime a cordova build/run command is issued a `yarn build` command it auto generated, via a hook.

thus running

cordova run android

automatically creates a production build that is then loaded to the phone or emulator for testing. source-maps are also generated so that chrome tools can be used to debug the minified js.

## Deployment

get the `upload certificate` and required password from: (see Pete)

cordova build android --release -- --keystore=<PATH>/upload_cert.jks --storePassword=<PASSWORD> --alias=dskey

## Docker

If you want to start up the application you just need to run `docker-compose up`.
This will build the application and run the dev server in a container.
You can access the website from your browser at `localhost:3000`.

todo use docker to build the images for cordova and its dev enviroment

## Fake Device Hot Swapping

After starting your development environment, with the dev server running on your computer.
You need to have the phone navigate to the dev server not the local files on the device.
Your phone and computer both need to be on the same network.

To do this, in chrome on your development machine go to `chrome://inspect` then inspect the WebView of the phone.
In the inspect window change the address from `file:///#!/` to your computer internal ip address `http://192.168.1.2:3000`.
If the loading spinner is not going away just refresh the page again, as chrome DataSaver may have cached the os version of the `cordova.js`.
If the loading spinner is still there, go in the chrome inspect console and force the deviceready event `window.document.dispatchEvent(new CustomEvent("deviceready"))`.
