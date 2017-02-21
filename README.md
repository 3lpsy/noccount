## While this project will evolve, currently it is just an example of using electron, vue and python through the zerorpc server.

### Requirements

- Node 7.1.0: Later versions cause and ABI error where Electron expects 51, but node provides 50.
- zerorpc (node): Installing the node module typically requires node-gyp and electron-rebuild.
- zerorpc (python): The python zerorpc module needs to be globally accessible as the nodejs process does not include the virtualenv
- C/C++ compilers
- python: the server process is spawned with python3 cmd so edit main/server.js and augment the relevant server files.

**Note: if node fails to start the server, you won't receive much feedback. It may be worth starting the server manually to check that it is working**

### Config / Setup

### buildable node dependencies (required)

export npm_config_target=1.4.15 # electron version
export npm_config_arch=x64
export npm_config_abi=50
export npm_config_target_arch=x64
export npm_config_disturl=https://atom.io/download/electron
export npm_config_runtime=electron
export npm_config_build_from_source=true
npm config ls

### clean caches (required)

rm -rf ~/.node-gyp
rm -rf ~/.electron-gyp
rm -rf ./node_modules

### install (required)

npm install

### cd in src directory (requied)

cd src

### application dependencies (optional?)

export npm_config_target=1.4.15 # electron version
export npm_config_arch=x64
export npm_config_abi=50
export npm_config_target_arch=x64
export npm_config_disturl=https://atom.io/download/electron
export npm_config_runtime=electron
export npm_config_build_from_source=true
npm config ls

### install (required)

npm install

It will probably take some debugging to get electron/node/python/zerorpc to cooperate

### Boilerplates/Frameworks

- Python/Electron Guide: https://www.fyears.org/2017/02/electron-as-gui-of-python-apps-updated.html (if you're not looking to use vuejs, just follow this guide)
- Electron Vue: https://github.com/SimulatedGREG/electron-vue (explains the two package.json configs)
- Vuejs: https://vuejs.org/

### Helpful Resources

Possible Solutions/info related to electron/node conflicts:

- https://github.com/electron/electron/issues/7904
- https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md
- https://github.com/tessel/node-usb/issues/157
- https://github.com/Jam3/devtool/issues/102
