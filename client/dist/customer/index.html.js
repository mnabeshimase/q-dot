module.exports = function(options) {
  return (`
    <!DOCTYPE html>
      <html>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import customermain.css-->
        <link type="text/css" rel="stylesheet" href="/customer/css/customermain.css" media="screen,projection"/>
        <!--Import materialize.css NOTE: right now is combined with customermain, need to refactor -->
    <!--     <link type="text/css" rel="stylesheet" href="./css/materialize.min.css"  media="screen,projection"/> -->

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <title>q.</title>
      </head>

      <body>
        <div id='app'>${options.component}</div>
        <script src='/js/customerApp-bundle.js'></script>
        <!--Import jQuery before materialize.js-->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="/customer/js/materialize.min.js"></script>
      </body>

      <footer>
        <br><br><br>
        <hr>
        by eggs-coffee-toast
      </footer>
    </html>`
  )
}
