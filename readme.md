# Under Construction

**This npm package is not ready for use and is still under early development.**

The package has not been properly configured to allow others to install and use it.

Features are still being developed locally, some features that are working locally include:

- The ability to easily copy everything in the `anime()` constructor examples from [the Anime.js documentation](https://animejs.com/documentation) into the config of the `<Anime config={}></Anime>` components.

- No need to specify the 'targets' field in `config={}` as the target css selectors will be automatically created for the child elements of `<Anime></Anime>` components. The default css target generator can be overriden and done manually by simply providing your own targets field in the `config={}` object if needed.

- The ability to use the Anime.js controls with a simple `const myRef = useRef(null)` attached to the `<Anime ref={myRef}></Anime>` component, allowing you to control that animation with the following:
  
  ```jsx
  myRef.current.play()
  myRef.current.pause()
  myRef.current.restart()
  myRef.current.reverse()
  myRef.current.seek(miliseconds)
  myRef.current.seekPercent(percentage)
  ```

A prominent bug is how hotloading seems to meddle with the parameters of currently existing anime() instances, causing the animations to change behaviour. This is easy to deal with by refreshing the page.

## React Animejs Wrapper

Allows the use of Anime.js with React JSX elements to quickly and easily create powerful animations.

Intended to be used with Next.js and with TypeScript but it should work with React and JavaScript as is.

This package was also created to meet the needs of **Interview Py**. Interview Py is a comprehensive interview prepration resource that prepares software developers and engineers for coding interviews using Python.

## Installation

You need to install react-animejs-wrapper and it's dependency animejs.

Using npm:

```sh
npm i react-animejs-wrapper
```

Using yarn:

```sh
yarn add react-animejs-wrapper
```

Designed for React 17.0.1. It should work for any relatively recent version of React.

## Easy to Use Examples

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
