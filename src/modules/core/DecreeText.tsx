import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

export type DecreeTextSize = keyof typeof texts;

/**
 * @typedef DecreeTextProps
 */
type DecreeTextProps = {
  size: DecreeTextSize;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A core module that automatically handles text responsiveness
 * @component
 * @param {DecreeTextProps} props
 * @returns
 */
export const DecreeText: React.FC<DecreeTextProps> = ({
  size,
  className,
  ...props
}) => {
  const Component = texts[size];
  return (
    <Component $className={className} {...props}>
      {props.children}
    </Component>
  );
};

type TwProps = {
  $className?: string;
};

const Text48 = tw.div<TwProps>`
  text-size-48
  ${p => p.$className}
`;

const Text41 = tw.div<TwProps>`
  text-size-41
  ${p => p.$className}
`;

const Text30 = tw.div<TwProps>`
  text-3xl
  ${p => p.$className}
`;

const Text24 = tw.div<TwProps>`
  text-2xl
  ${p => p.$className}
`;

const Text23 = tw.div<TwProps>`
  text-size-23
  ${p => p.$className}
`;

const Text21 = tw.div<TwProps>`
  text-size-21
  ${p => p.$className}
`;

const Text19 = tw.div<TwProps>`
  text-size-19
  ${p => p.$className}
`;

const Text18 = tw.div<TwProps>`
  text-size-18
  ${p => p.$className}
`;

const Text16 = tw.div<TwProps>`
  text-base
  ${p => p.$className}
`;

const Text15 = tw.div<TwProps>`
  text-size-15
  ${p => p.$className}
`;

const Text14 = tw.div<TwProps>`
  text-sm
  ${p => p.$className}
`;

const Text12 = tw.div<TwProps>`
  text-xs
  ${p => p.$className}
`;

const Text10 = tw.div<TwProps>`
  text-size-10
  ${p => p.$className}
`;

const texts: {[key: number]: React.ComponentType<TwProps>} = {
  48: Text48,
  41: Text41,
  30: Text30,
  24: Text24,
  23: Text23,
  21: Text21,
  19: Text19,
  18: Text18,
  16: Text16,
  15: Text15,
  14: Text14,
  12: Text12,
  10: Text10,
};
