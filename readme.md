# :construction: Under Construction :construction:

**This npm package is not ready for use and is still under early development. :seedling:**

 A website is currently being made to contains lots of practical examples of how to use this library.

Core features are still being developed, some include:

- The ability to easily copy everything in the `anime()` constructor examples from [the Anime.js documentation](https://animejs.com/documentation) into the config of the `<Anime config={}></Anime>` components.

- No need to specify the 'targets' field in `config={}` as the targets will be automatically created internally for the child elements of `<Anime></Anime>` components. You can override this if needed.

- The ability to use the Anime.js controls with a simple `const myRef = useRef(null)` attached to the `<Anime ref={myRef}></Anime>` component, allowing you to control that animation with the following:
  
  ```jsx
  myRef.current.play()
  myRef.current.pause()
  myRef.current.restart()
  myRef.current.reverse()
  myRef.current.seek(miliseconds)
  myRef.current.seekPercent(percentage)
  ```

## React Animejs Wrapper

Allows the use of Anime.js with React JSX elements to quickly and easily create powerful animations. :smiley:

## Installation

Using npm:

```sh
npm i react-animejs-wrapper
```

Using yarn:

```sh
yarn add react-animejs-wrapper
```

## Easy to Use Examples

Once the website is up there will be lots of easy to use examples for you to explore!

Some blue squares sliding back and forth:

```jsx
import React from 'react'
import Anime from 'react-animejs-wrapper'

export const myAnimeComponent = () => {
  const blueSquare = {
    height: '20px',
    width: '20px',
    backgroundColor: 'lightblue',
  };

  return (
    <Anime
      config={{
        translateX: 250,
        delay: function (_, i) {
          return i * 100;
        },
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true,
      }}
    >
      <div style={blueSquare}>1</div>
      <div style={blueSquare}>2</div>
      <div style={blueSquare}>3</div>
    </Anime>
  )
}
```

## Examples with Animation Controls

Attach a reference to the <Anime></Anime> component, then you can access the controls within the component directly through the reference.

```jsx
import React, { useRef } from 'react'
import Anime from 'react-animejs-wrapper'

export const myAnimeComponent = () => {
  const blueSquare = {
    height: '20px',
    width: '20px',
    backgroundColor: 'lightBlue',
  };

  const animatedSquaresRef = useRef(null)

  const restart = () => animatedSquaresRef.current.restart();
  const play = () => animatedSquaresRef.current.play();
  const pause = () => animatedSquaresRef.current.pause();
  const reverse = () => animatedSquaresRef.current.reverse();
  const seek = () => animatedSquaresRef.current.seek(1000);
  const seekPercent = () => animatedSquaresRef.current.seekPercent(50);

  return (
    <div>
      <Anime
        ref={animatedSquaresRef}
        config={{
          translateX: 250,
          delay: function (_, i) {
            return i * 100;
          },
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          autoplay: true,
        }}
      >
        <div style={blueSquare}>1</div>
        <div style={blueSquare}>2</div>
        <div style={blueSquare}>3</div>
      </Anime>
      <button onClick={restart}>Reset Animation</button>
      <button onClick={play}>Play Animation</button>
      <button onClick={pause}>Pause Animation</button>
      <button onClick={reverse}>Reverse Animation</button>
      <button onClick={seek}>Seek to 1000 ms</button>
      <button onClick={seekPercent}>Seek to 50%</button>
    </div>
  )
}

```
