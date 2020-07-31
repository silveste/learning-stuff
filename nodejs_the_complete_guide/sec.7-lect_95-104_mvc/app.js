const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

/*Pug template engine
app.set('view engine', 'pug');
*/
/* Handlebars template engine
//Initialize the engine (handlebars is not express built in therefore needs to be initialized). The name also matches the extension of the templates
app.engine('hbs', handlebars({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'})); //views/layout is default so it could be ignored
//Register handlebars
app.set('view engine', 'hbs');
*/
app.set('view engine', 'ejs');
app.set('views','views');  // This is redundant as the views folder is set to views by default

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
