import bcd from '@mdn/browser-compat-data' with { type: 'json' };
import formatMDNTitle from './format-mdn-feature-title.js';

export default async (feature) => {
    if (!feature) return bcd;

    const path = feature.split('mdn-')[1].split('__');

    let obj = bcd;
    let parent = null;
    for (let i = 0; i < path.length; i++) {
        parent = obj;
        obj = obj[ path[i] ];
    }

    const compat = obj['__compat'];
    compat.title = await formatMDNTitle(path);

    if (!compat.mdn_url && parent?.__compat?.mdn_url) {
        compat.mdn_url = parent.__compat.mdn_url + `#${path[path.length - 1]}`
    }

    return compat || bcd;
};
