### SIL is a reading helper tool.
It's mainly aimed to assist kids as soon as they start learning to read.
It will take a phrase as input and it features full phrase reading, per word reading and per syllables reading.
It renders the words and syllables with bigs fonts inside a modal box, features audio reading and speed controls.

See the [live demo](https://silabas.herokuapp.com).

### Install:

    bower install
    npm install
    grunt

The `src/audio` and `build/audio` folders should be writable.
If you're in a linux/unix shell try:

    sudo chmod 777 src/audio build/audio

You can run the project in your brower either from the src dir of the build dir.
Running it from the src dir is recommended to quickly test things out when developing.
The build dir is generated when running grunt and its the production version.

You can also serve the app locally by running:

`node index.js`

This will start the app from the `build` folder in: 

`http://localhost:5000`

### TODO:
- concat and minimize
- add reading support (the Google Translate hack doesn't work anymore!)

Current limitations:
- language: only using spanish language right now

