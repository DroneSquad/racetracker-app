# RaceTracker
Welcome! Here's some quick background on why this repository exists.

## RaceTracker History
Drone Squad wanted to make it easy for pilots to practice and organize races. So in 2017, the company exclusively partnered with Team Black Sheep to add support for an inexpensive, app connected race timing system. Drone Squad released basic timing functionality and based on feedback from pilots started working on a new version. The company struggled for months to evolve the software as they hoped due to hardware and API limitations. Pursuing this as a business was not viable so Drone Squad decided to open source the technology so the community could extend functiomnality and add support for additional commercial or open source timing hardware.

## Drone Squad History
After facing challenges finding pilots to fly with locally, Pete Mauro started Drone Squad with the goal of using technology to connect pilots around the world for fun in competition. In 2016 Drone Squad a released an app to help pilots find and organize meetups, and by 2018, 30,000 pilots in 117 countries used the software. 

# Quick start

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

