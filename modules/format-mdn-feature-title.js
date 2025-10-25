
export default async (path) => {

    let title = null;

    switch (path[0]) {

        case 'api':
            if (path.length === 1) {
                title = "API";
            } else if (path.length === 2) {
                title = `${path[1]} API`;
            } else if (path.length > 2) {
                title = `${path[1]} API: ${path.slice(2).join(' ')}`;
            }
            break;

        case 'css':
            const cssCategory = path[1];
            if (path.length === 3) {
                const name = path[2];
                if (cssCategory === "at-rules") {
                    title = `CSS at-rule: @${name}`;
                } else if (cssCategory === "properties") {
                    title = `CSS Property: ${name}`;
                } else if (cssCategory === "selectors") {
                    title = `CSS Selector: :${name}`;
                } else if (cssCategory === "types") {
                    title = `CSS Data Type: ${name}`;
                }
            } else if (path.length > 3) {
                const rest = path.slice(2);
                if (cssCategory === "at-rules") {
                    title = `CSS at-rule: @${rest.join(' ')}`;
                } else if (cssCategory === "properties" && rest.length > 0) {
                    title = `CSS Property: ${rest[0]}:${rest.slice(1).join(' ')}`;
                } else if (cssCategory === "selectors") {
                    title = `CSS Selector: :${rest.join(' ')}`;
                } else if (cssCategory === "types") {
                    title = `CSS Data Type: ${rest.join(' ')}`;
                }
            }
            break;

        case 'html':
            const htmlCategory = path[1];
            const htmlName = path[2];
            if (htmlCategory === "global_attributes") {
                if (path.length === 3) {
                    title = `Global HTML Attribute: ${htmlName}`;
                } else if (path.length > 3) {
                    title = `Global HTML Attribute: ${htmlName}:${path.slice(3).join(' ')}`;
                }
            } else if (htmlCategory === "elements") {
                if (path.length === 3) {
                    title = `HTML Element: ${htmlName}`;
                } else if (path.length > 3) {
                    title = `HTML Element: ${htmlName}:${path.slice(3).join(' ')}`;
                }
            }
            break;

        case 'http':
            const httpCategory = path[1];
            const httpRest = path.slice(2);
            if (httpCategory === "methods") {
                title = `HTTP Method: ${httpRest.join(' ')}`;
            } else if (httpCategory === "status") {
                title = `HTTP Status: ${httpRest.join(' ')}`;
            } else if (httpCategory === "headers") {
                title = `HTTP Header: ${httpRest.join(' ')}`;
            }
            break;

        case 'javascript':
            title = `Javascript ${path[1]}: ${path.slice(2).join(' ')}`;
            break;

        case 'manifests':
            if (path[1] === "webapp") {
                const manifestName = path[2];
                if (path.length === 3) {
                    title = `Web App Manifest: ${manifestName}`;
                } else if (path.length > 3) {
                    title = `Web App Manifest: ${manifestName}:${path.slice(3).join(' ')}`;
                }
            }
            break;

        case 'mathml':
            const mathmlCategory = path[1];
            const mathmlRest = path.slice(2);
            if (mathmlCategory === "elements") {
                title = `MathML Element: ${mathmlRest.join(' ')}`;
            } else if (mathmlCategory === "global_attributes") {
                title = `MathML Global attributes: ${mathmlRest.join(' ')}`
            } else if (mathmlCategory === "attribute_values") {
                title = `MathML Attribute values: ${mathmlRest.join(' ')}`
            }
            break;

        case 'svg':
            const svgCategory = path[1];
            const svgName = path[2];
            if (svgCategory === "elements") {
                if (path.length === 3) {
                    title = `SVG Element: ${svgName}`;
                } else if (path.length > 3) {
                    title = `SVG Element: ${svgName}:${path.slice(3).join(' ')}`;
                }
            } else if (svgCategory === "global_attributes") {
                if (path.length === 3) {
                    title = `SVG Attribute: ${svgName}`;
                } else if (path.length > 3) {
                    title = `SVG Attribute: ${svgName}:${path.slice(3).join(' ')}`;
                }
            }
            break;

        case 'webextensions':
            const webextCategory = path[1];
            const webextRest = path.slice(2);
            if (webextCategory === "manifest") {
                title = `WebExtension Manifest Property: ${webextRest.join(' ')}`;
            } else if (webextCategory === "api") {
                if (webextRest.length === 0) {
                    title = "WebExtensions API";
                } else if (webextRest.length === 1) {
                    title = `WebExtensions API: ${webextRest[0]}`;
                } else if (webextRest.length > 1) {
                    title = `WebExtensions API: ${webextRest[0]}.${webextRest.slice(1).join(' ')}`;
                }
            } else if (webextCategory === "match_patterns") {
                title = `WebExtensions Match patterns: ${webextRest.join(' ')}`;
            }
            break;
    }

    if (!title) title = path.join(' ');
    return title;
};
