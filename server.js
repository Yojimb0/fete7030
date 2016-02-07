var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
app.use(session({
	secret: 'mynotsosecretsecret',
	resave: true,
	saveUninitialized: true
}));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.render('index', { auth: req.session.auth });
});

app.post('/login', function(req, res) {
	if(req.body.password === process.env.SECRET) req.session.auth = true;
	res.redirect('/');
});


app.listen(port);