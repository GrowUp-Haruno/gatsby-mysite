import { contentsType } from './../models/microcms';
import { createClient } from 'microcms-js-sdk';
import { ImageLoader } from 'next/image';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICEDOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_APIKEY!,
});

export const dummyMicrocmsData: contentsType = {
  categories: [{ createdAt: '', id: '', name: '', publishedAt: '', revisedAt: '', updatedAt: '' }],
  content: '',
  createdAt: '',
  eyecatch: { height: 0, url: '', width: 0 },
  id: '',
  mainTitle: '',
  publishedAt: '',
  revisedAt: '',
  subTitle: '',
  updatedAt: '',
};

export const microCMSLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?auto=format&fit=max&w=${width}`;
};