import React from "react"
import { renderToString } from "react-dom/server"

import { Provider } from "react-redux"
import { ConnectApp } from "../client/components/App"

export const indexCtrl = store => (req, res) => {
    var appString = renderToString(
        <Provider store={store}>
            <ConnectApp />
        </Provider>
    )

    const HTML = `
	  <!DOCTYPE html>
	  <html>
	  <head>
	      <meta charset="UTF-8" />
	      <title>Redux socket.io Chat app</title>
	      <link rel="stylesheet" href="/css/style.css">
	  </head>
	  <body>
	  	<div id="app">${appString}</div>
	  	<script src="/build/boundle.js"></script>
	  </body>
	  </html>
	  `
    res.end(HTML)
}