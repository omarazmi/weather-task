// html skeleton provider
function template(title, initialState = {
    weather: {
        cities: [],
        preCities: ['San Diego, CA', 'New York, NY', 'Juneau, AK']
    }
}, content = "") {
    let scripts = ''; // Dynamically ship scripts based on render type
    if (content) {
        scripts = ` <script>
                     window.__STATE__ = ${JSON.stringify(initialState)}
                  </script>
                  <script src="assets/client.js"></script>
                  `
    } else {
        scripts = ` <script src="assets/bundle.js"> </script> `
    }
    let page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title> ${title} </title>
                  <link href="assets/style.css" rel="stylesheet">
                </head>
                <body>
                     <div id="root">
                        <!--- magic happens here -->  ${content}
                     </div>
                    ${scripts}
                </body>
                `;

    return page;
}

module.exports = template;
