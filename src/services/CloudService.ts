import {baseURL} from '../utils/constants/base-url-constants';
import {BlobType, getBlobExtension} from '../utils/get-blob-extension';

export type CloudService = {
  /**
   * Uploads the svg and returns the url
   */
  uploadSvg: (svg: Blob) => Promise<string>;
  /**
   * Uploads the blob of the icon and returns the url
   */
  uploadIcon: (icon: Blob, name?: string) => Promise<string>;
};

export type UploadSvgResult = {
  url: string;
};

const baseAPI =
  process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

export const cloudService: CloudService = {
  uploadSvg: async svg => {
    const formdata = new FormData();
    formdata.append('file', svg, 'svg_file.svg');

    const response = await fetch(`${baseAPI}/File/svg`, {
      method: 'POST',
      body: formdata,
    });

    const result: UploadSvgResult = await response.json();

    return result.url;
  },
  uploadIcon: async (icon, name) => {
    const fileName = name || `icon${getBlobExtension(icon.type as BlobType)}`;

    const formdata = new FormData();
    formdata.append('file', icon, fileName);

    const response = await fetch(`${baseAPI}/File/icons`, {
      method: 'POST',
      body: formdata,
    });

    const result: UploadSvgResult = await response.json();

    return result.url;
  },
};
