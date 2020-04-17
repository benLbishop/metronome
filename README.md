# Setup changes

This file will outline the changes/installs made to get the project working.

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

## Typescript

What the heck is going on with the index.ts in my types directory? If I have more than 2 interfaces/enums that I'm exporting, it yells and says that there's a parse error: cannot read property 'name' of undefined.

Ok....now it's yelling at me even though I deleted the file. I no longer know what's happening. Maybe the filename of `/src/types/index.ts` is reserved by react projects for something?

## CSS Stuff
Inputs are weird, and browsers give them a default width. This was leading to my styling on the input of `flex: 1` not changing the width of the input at all. To fix this, I had to explicitly set the width to 100% for flex to work. I think it might be only along the cross-axis of the flex-direction that the size doesn't change, and for inputs that you want to shrink. The inputs were fine when I wanted them to grow with flex, just not shrink, because a min-width must have been set as well.