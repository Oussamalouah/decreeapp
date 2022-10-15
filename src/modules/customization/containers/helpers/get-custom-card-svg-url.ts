import {PaperSettings} from '../../models/CustomCardElements';
import {Environment} from '../../../../Environment';

export const getCustomCardSvgUrl = async (
  paperSettings: PaperSettings,
  customCardDataUrl: string
) => {
  const {services} = Environment.current();

  const paperHeight = paperSettings.dimensions.height;
  const paperWidth = paperSettings.dimensions.width;

  const headSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${paperWidth}px" height="${paperHeight}px" fill="white" x="0px" y="0px" enable-background="new 0 0 ${paperWidth} ${paperHeight}" viewBox="0 0 ${paperWidth} ${paperHeight}" xmlns:xlink="http://www.w3.org/1999/xlink"  xml:space="preserve">`;
  const img = `<image width="${paperWidth}" height="${paperHeight}" href="${customCardDataUrl}"/>`;
  const svg = headSvg + img + '</svg>';

  const blob = new Blob([svg], {type: 'image/svg+xml'});
  return await services.cloud.uploadSvg(blob);
};
