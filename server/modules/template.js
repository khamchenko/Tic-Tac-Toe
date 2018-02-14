export default ({ content, initialState }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tic Tac Toe</title>
        <link rel="stylesheet" href="/static/styles.css">
      </head>
      <body>
      <div id="root">${content}</div>
         <script type="text/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script type="text/javascript" src="/static/app.js"></script>
      </body>
      </html>
  `;
};
