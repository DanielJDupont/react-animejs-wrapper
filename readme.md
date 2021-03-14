# React Anime.js Wrapper

[![Build Status](https://travis-ci.com/DanielJDupont/react-animejs-wrapper.svg?branch=main)]([travisUrl]) ![Codecov][codecovUrl] ![GitHub top language][toplangUrl] ![Website][websiteUrl] ![GitHub][githubUrl]

![react animejs example animation](https://github.com/DanielJDupont/react-animejs-wrapper-website/blob/main/images/bigAnimation.gif?raw=true)

Allows the use of Anime.js with React JSX elements to quickly and easily create powerful animations.

**Check out the website to see more examples: [reactanimejswrapper.com](https://reactanimejswrapper.com)**

Features:

- Can nest `<Anime>< /Anime>` components within one another to make complex nested animations.

- The ability to easily copy everything in the `anime()` constructor examples from [the Anime.js documentation](https://animejs.com/documentation) into the config of the `<Anime config={}></Anime>` components.

- No need to specify the 'targets' field in `config={}` as the targets will be automatically created internally for the child elements of `<Anime></Anime>`. You can override and specify your own targets if needed.

- The ability to use the Anime.js controls with a ref `const myRef = useRef(null)` attached to the `<Anime ref={myRef}></Anime>` component, to control that animation with the following:

```jsx
myRef.current.play()
myRef.current.pause()
myRef.current.restart()
myRef.current.reverse()
myRef.current.seek(miliseconds)
myRef.current.seekPercent(percentage)
```

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

Some extra examples are present on the website with more to be added soon!

Translate elements, like with the text in an input.

```jsx
import React from 'react'
import Anime from 'react-animejs-wrapper'

export const myAnimeComponent = () => {

  return (
    <Anime
      style={{
        backgroundColor: 'lightgrey',
        width: '80px',
      }}
      config={{
        translateY: [0, 20],
        scale: [0.8, 1],
        loop: true,
        duration: 1500,
      }}
    >
      <div>Find</div>
    </Anime>
  )
}
```

Stagger multiple elements, such as in a sidebar.

```jsx
import React from 'react'
import Anime, { anime } from 'react-animejs-wrapper'

export const myAnimeComponent = () => {

  return (
    <Anime
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightgrey',
        alignItems: 'left',
        width: '80px',
      }}
      config={{
        translateX: [-35, 0],
        scale: [0, 1],
        loop: true,
        delay: anime.stagger(100, { start: 200 }),
      }}
    >
      <div style={{ backgroundColor: 'grey', width: '50px', margin: '5px' }}>
        Transit
      </div>
      <div style={{ backgroundColor: 'grey', width: '50px', margin: '5px' }}>
        Food
      </div>
      <div style={{ backgroundColor: 'grey', width: '50px', margin: '5px' }}>
        Events
      </div>
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
    <>
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
    </>
  )
}

```

[travisUrl]: https://travis-ci.com/DanielJDupont/react-animejs-wrapper
[codecovUrl]: https://img.shields.io/codecov/c/gh/danieljdupont/react-animejs-wrapper
[toplangUrl]: https://img.shields.io/github/languages/top/danieljdupont/react-animejs-wrapper
[sizeUrl]: https://img.shields.io/github/repo-size/danieljdupont/react-animejs-wrapper
[websiteUrl]: https://img.shields.io/website?url=https%3A%2F%2Freactanimejswrapper.com%2F
[githubUrl]: https://img.shields.io/github/license/danieljdupont/react-animejs-wrapper?style=flat-square
