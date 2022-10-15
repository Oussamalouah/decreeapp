import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  src: string;
  width?: number | string;
  height?: number | string;
};

/**
 * A highly customizable video player component
 * for now, we can just use the src width and height property for the homepage but can be improved once we use it on other pages
 * other props can be seen here https://www.npmjs.com/package/react-player
 * */

export const DecreePlayer: React.FC<Props> = (props: Props) => {
  const {src, width = '100%', height = '100%'} = props;
  return <ReactPlayer url={src} width={width} height={height} />;
};
