import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import anime, { AnimeInstance } from 'animejs';
import { v4 as uuidv4 } from 'uuid';

interface AnimeProps {
  className?: string;
  style?: React.CSSProperties;
  config?: any;
  children?: React.ReactNode;
}

// Need to use a forwardRef, obtaining a ref from the parent to allow the use of controls.
const Anime = forwardRef((props: AnimeProps, ref) => {
  if (typeof window === 'undefined') {
    return <div className={props.className} style={props.style} />;
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

  // Setup controls here, the user can access these if they use a ref.
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

  // Ensure that props.children is always an array so .map works.
  const childArray = Array.isArray(props.children) ? props.children : [props.children];

  // Attach __anime__id to each child so Anime.js can track and manipulate the elements.
  const styleChildren = (children: any) => {
    return React.Children.map(children, (child) =>
      React.cloneElement(child, {
        className: `${child?.props?.className} __anime__${uuid}`,
      }),
    );
  };

  return (
    // This outer <div></div> appears as <Anime></Anime> to the user.
    <div style={{ ...props.style }} className={`${props.className}`}>
      {/* The children are the individual components or divs that the user passes in. */}
      {styleChildren(childArray)}
    </div>
  );
});

// Expose anime to the user so they can do things such as anime.random(0, 270) for the config for Anime components if they want.
export { Anime as default, anime };
