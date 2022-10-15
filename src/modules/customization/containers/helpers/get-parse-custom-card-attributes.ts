export const getParseCustomCardAttributes = (stringifiedAttributes: string) => {
  try {
    const parsedAttributes = JSON.parse(stringifiedAttributes);

    return {
      boxes: parsedAttributes.boxes || [],
      circles: parsedAttributes.circles || [],
      straightLines: parsedAttributes.straightLines || [],
      texts: parsedAttributes.texts || [],
      lines: parsedAttributes.lines || [],
      images: parsedAttributes.images || [],
    };
  } catch (e) {
    return {
      boxes: [],
      circles: [],
      straightLines: [],
      texts: [],
      lines: [],
      images: [],
    };
  }
};
