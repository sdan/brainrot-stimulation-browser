you found brainrot stimulation in your vscode now its in your browser

## 🎮 how to get this thing running

1. grab the latest zip from [releases](https://github.com/sdan/brainrot-stimulation-browser/releases)
2. go to `chrome://extensions/` in your browser
3. turn on "Developer mode" in the top right
4. click "Load unpacked" and pick the folder you just unzipped

## 🚀 for developers

### making a new release
want to push out a new version? just do:
```bash
git tag v1.0.0  # use whatever version number you want
git push origin v1.0.0
```

the github action will automatically:
- zip up the extension files
- create a new release
- attach the zip file
- generate some cool release notes

### local development
1. clone this repo
2. open `chrome://extensions/`
3. turn on "Developer mode"
4. click "Load unpacked" and pick the `chatgpt-overlay` folder

## 🎥 what it does
- adds two video panels (20% width each) on the sides of chatgpt
- switches up the videos every 30 seconds to keep things fresh
- works on chat.openai.com
