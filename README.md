SIL is a reading helper tool.
It's mainly aimed to assist kids as soon as they start learning to read.

Install:
bower install
npm install
grunt

The src/audio and build/audio folders should be writable.
If you're in a linux/unix shell try:
sudo chmod 777 src/audio build/audio

You can run the project in your brower either from the src dir of the build dir.
Running it from the src dir is recommended to quickly test things out when developing.
The build dir is generated when running grunt and its the production version.

TODO:
- concat and minimize

This is a preview of the idea.
It will be awesome if we can engage other devs to allow this to grow into a fully automated learning tool.

Current limitations:
- syllables dictionary: it's hand made and only has a few words
- language: only using spanish language right now

We should be able to create a simple tool to crowdsource the creation of the dictionary in multiple languages.
If you this this is a cool project and want to collaborate just fork this repo and feel free to make it grow.
:)