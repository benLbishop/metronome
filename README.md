# Setup changes

## Howler

At first, I was trying to use 
```javascript
const sound = new Howl({
    src: ['some-string-to-audio-file']
})
```
in my `Howl` object. This was giving me an onloaderror of "Decoding audio data failed." Instead, I had to do
```javascript
import exampleSound from '../res/sounds/exampleSound.wav'
...
const sound = new Howl({
    src: [exampleSound]
})
```
I was getting a typescript error for the import, saying that the exampleSound.wav module could not be found. I had to add a global.d.ts file with a '*.[file-extension]' for any audio files I wanted to import to different files.