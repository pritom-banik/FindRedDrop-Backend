function Welcome() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>FindRedDrop Backend</title>
    </head>
    <body style="
      margin: 0;
      background-color: #DAD4D2;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    ">
      <div style="text-align: center;">
        <h1>Hi this is the backend of FindRedDrop!</h1>
        <h2>- Pritom Banik</h2>
        <h2><a href="https://github.com/pritom-banik">Github</a></h2>
      </div>
    </body>
    </html>
  `;
}

module.exports = Welcome;