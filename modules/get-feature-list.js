import bcd from '@mdn/browser-compat-data' with { type: 'json' };

import formatMDNTitle from './format-mdn-feature-title.js';

const sort_by = (field, primer) => {
    // http://stackoverflow.com/a/979325
    var key = primer ?
        function(x) {return primer(x[field])} :
        function(x) {return x[field]};
    return function (a, b) {
        return a = key(a), b = key(b), 1 * ((a > b) - (b > a));
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getMDNData = async () => {
    const finalPaths = [];

    const traverseObject = (obj, objPath) => {
        if (typeof obj !== 'object' || obj === null) {
            return;
        }
        Object.keys(obj).forEach(key => {
            const newPath = [...objPath, key];
            if (key.includes('__compat')) {
                finalPaths.push(objPath);
            } else {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    traverseObject(obj[key], newPath);
                }
            }
        });
        return null;
    };

    const excludedCategories = ['__meta', 'browsers', 'webdriver', 'webassembly'];

    Object.keys(bcd).forEach((category) => {
        if (excludedCategories.includes(category)) return;
        traverseObject(bcd[category], [category]);
    });

    const features = [];

    finalPaths.forEach(async (path) => {
        const feature = {
            id: 'mdn-' + path.join('__'), // @separator
            title: await formatMDNTitle(path),
            dataSource: 'mdn'
        };

        features.push(feature);
    });

    return features;
};

const getCanIUseData = async () => {

    const url = 'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const response = await fetch(url, options);
    const res = await response.json();

    const features = [];

    for (let key in res.data) {
        if (res.data.hasOwnProperty(key)) {
            const feature = {
                id: key,
                title: res.data[key].title,
                dataSource: 'caniuse'
            };

            feature.title = capitalizeFirstLetter(feature.title);

            features.push(feature);
        }
    }

    return features;
};

export default async (path) => {

    const mdn = await getMDNData();
    const ciu = await getCanIUseData();
    const features = [...ciu, ...mdn];

    features.sort(sort_by('title', function(a){return a}));

    return features;
};
