type ParsedDescription = {
  imageLinks: string[];
  description: string;
};

/**
 * Gets parsed description for a product by separating image links from texts
 *
 * @param description
 *
 * @returns parsedDescription
 */

export const getParsedProductDescription = (
  description: string | undefined
) => {
  const regex = /(https?:\/\/.*\.(?:png|jpg|gif|webp|svg))/i;
  const parsedDescription: ParsedDescription = {
    imageLinks: [],
    description: '',
  };
  const words = description?.split(' ');

  words?.forEach(word => {
    if (word.match(regex)) {
      parsedDescription.imageLinks.push(word);
    } else {
      parsedDescription.description += word + ' ';
    }
  });

  return parsedDescription;
};
