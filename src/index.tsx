import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import anime, { AnimeInstance } from 'animejs';
import { v4 as uuidv4 } from 'uuid';

interface AnimeProps {
  className?: string;
  style?: object;
  config?: any;
  children?: React.ReactNode;
}

// Need to use a forwardRef, obtaining a ref from the parent to allow the use of controls.
const Anime = forwardRef((props: AnimeProps, ref) => {
  if (typeof window === 'undefined') {
    return <div className={props.className} />;
  }

  const animeInstance = useRef<AnimeInstance>(anime({}));
  const uuid = uuidv4();

  useEffect(() => {
    // Cleanup any other wandering anime tags.
    anime.remove(`.__anime__${uuid}`);

    const myAnimeInstance = anime({
      targets: document.querySelectorAll(`.__anime__${uuid}`),
      ...props.config,
    });

    animeInstance.current = myAnimeInstance;
  }, [props, props.config, props.children]);

  // Setup controls here.
  useImperativeHandle(ref, () => ({
    restart() {
      animeInstance.current.restart();
    },
    play() {
      animeInstance.current.play();
    },
    pause() {
      animeInstance.current.pause();
    },
    reverse() {
      animeInstance.current.reverse();
    },
    seek(timeStamp: number) {
      animeInstance.current.seek(timeStamp);
    },
    seekPercent(scrollPercent: number) {
      animeInstance.current.seek((scrollPercent / 100) * animeInstance.current.duration);
    },
  }));

  const childArray = Array.isArray(props.children) ? props.children : [props.children];

  return (
    <div className={props.className} style={{ ...props.style }}>
      {childArray.map((child) => (
        // Wrap the user's elements with a div containing the __anime__ tag so we can apply the animations to them.

        <div className={`__anime__${uuid}`}>{child}</div>
      ))}
    </div>
  );
});

// Expose anime to the user so they can do things such as anime.random(0, 270) for the config for Anime components.
export { Anime as default, anime };
