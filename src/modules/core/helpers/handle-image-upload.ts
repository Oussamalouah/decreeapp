export type Dimensions = {
  x: number;
  y: number;
  height: number;
  width: number;
};

/**
 * Handles the modification of business type cards
 *
 * @param uploadedLogo
 * @param svg
 * @param dimensions
 * @param originalLogo
 * @param onCloneLogo
 */
export const handleImageUpload = (
  uploadedLogo: string,
  svg: SVGSVGElement,
  dimensions: Dimensions,
  originalLogo: Element | null | undefined,
  onCloneLogo: (element: Element, dimensions: Dimensions) => void
) => {
  const g = svg.querySelector('#logo');
  if (!g) return;

  if (originalLogo) {
    // Remove all children inside since we'll be replacing them
    while (g.lastChild) {
      g.removeChild(g.lastChild);
    }

    if (uploadedLogo) {
      // Create image tag and set its attributes
      const logoImage = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image'
      );
      logoImage.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href',
        uploadedLogo
      );

      // Append user image to the svg
      logoImage.setAttribute('height', `${dimensions.height}`);
      logoImage.setAttribute('width', `${dimensions.width}`);
      logoImage.setAttribute('x', `${dimensions.x}`);
      logoImage.setAttribute('y', `${dimensions.y}`);
      logoImage.setAttribute('preserveAspectRatio', 'none');

      g.appendChild(logoImage);
    } else {
      // Clone so we dont ruin our original logo reference
      const logoClone = originalLogo.cloneNode(true) as Element;

      // Append original image to the svg
      g.appendChild(logoClone);
    }
  } else {
    const ctm = svg.getCTM();

    // Clone g element if it has more than 1 child
    const logoClone = g.cloneNode(true) as Element;
    const {x: groupX, y: groupY, width, height} = g.getBoundingClientRect();
    const {x: svgX, y: svgY} = svg.getBoundingClientRect();

    // Scales the values if svg isn't in its original size
    const scale = ctm?.a || 1;

    logoClone.removeAttribute('id');

    // Gets copy of the clone and the dimensions
    onCloneLogo(logoClone, {
      x: (groupX - svgX) / scale,
      y: (groupY - svgY) / scale,
      width: width / scale,
      height: height / scale,
    });
  }
};
