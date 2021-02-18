import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import anime, { AnimeInstance } from 'animejs';

interface AnimeProps {
  className?: string;
  animeConfig: any;
  children: React.ReactNode;
}

// Need to use a forwardRef, obtaining a ref from the parent to allow the use of controls.
const Anime = forwardRef((props: AnimeProps, ref) => {
  if (typeof window === 'undefined') {
    return <div className={props.className} />;
  }

  console.log(props.children);

  const animeInstance = useRef<AnimeInstance>(anime({}));

  useEffect(() => {
    console.log(document.querySelectorAll('.__anime__'));

    // Cleanup any other wandering anime tags.
    anime.remove('.__anime__');

    const myAnimeInstance = anime({
      targets: document.querySelectorAll('.__anime__'),
      ...props.animeConfig,
    });

    animeInstance.current = myAnimeInstance;
  }, [props, props.animeConfig, props.children]);

  useEffect(() => {
    console.log(animeInstance);
  }, [animeInstance]);

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
    <div className={props.className}>
      {childArray.map((child) => (
        // Wrap the user's elements with a div containing the __anime__ tag so we can apply the animations to them.
        <div className="__anime__">{child}</div>
      ))}
    </div>
  );
});

export default Anime;
