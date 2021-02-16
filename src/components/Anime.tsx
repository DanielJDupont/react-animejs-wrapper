import React, { Fragment, useEffect, createRef } from 'react';
import anime, { AnimeParams } from 'animejs';

// Use the types from @types/animejs in addition to a children and svg fields.
interface AllProps extends AnimeParams {
  children: React.ReactNode;
  svg?: boolean;
}

export const Anime = (props: AllProps) => {
  const targetRefs: any[] = [];

  // UseEffect to component mount run createAnime() function.
  // Only plays the animation upon component mount.
  const createAnimeNoHook = () => {
    createAnime();
  };
  useEffect(() => {
    createAnimeNoHook();
  }, []);

  const createAnime = () => {
    const targets = [];

    // Attach the targetRefs to targets.
    for (const ref of targetRefs) {
      if (ref.current) {
        targets.push(ref.current);
      }
    }

    // Mutable pattern, replace this with const.
    const animeProps = { ...props, targets };

    // Delete the property of children from the anime props.
    delete animeProps.children;

    // Delete the property of children from the svg.
    delete animeProps.svg;

    // Create an instance of anime with the anime() constructor. Not sure how it is used from here.
    // I think that our key of __anime__ will grab whatever is created by anime().
    anime(animeProps);
  };

  // Force the children to be in a list if there is only 1 child, so the .map() always works in the render.
  const children = Array.isArray(props.children) ? props.children : [props.children];

  // Not sure what this does.
  const refs = targetRefs;

  return (
    <Fragment>
      {children.map((child, i) => {
        refs.push(createRef());
        const El = props.svg ? 'g' : 'div';
        return (
          <El ref={refs[refs.length - 1]} key={`${'__anime__'}${i}`}>
            {child}
          </El>
        );
      })}
    </Fragment>
  );
};

export default Anime;
