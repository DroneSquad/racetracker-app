
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

cordova platform add android

anytime a cordova build/run command is issued a `yarn build` command it auto generated, via a hook.

thus running

cordova run android

automatically creates a production build that is then loaded to the phone or emulator for testing. source-maps are also generated so that chrome tools can be used to debug the minified js.

## Docker

If you want to start up the application you just need to run `docker-compose up`.
This will build the application and run the dev server in a container.
You can access the website from your browser at `localhost:3000`.

todo use docker to build the images for cordova and its dev enviroment