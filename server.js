const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 52273


//__dirname은 전역변수이며, root의 위치를 의미한다.
app.use(express.static(__dirname+'/public'));
app.use(cookieParser('signcookie')); //비밀키
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false})); //extended 옶션은 중첩된 object를 파싱할 수 있는가 없는가를 결정. 
app.use(session({
    secret: 'brandyun',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5000
    }
}))
// app.get('/getCookie', (req, res) => {
//     res.status(200).send(req.cookies);
// })

// app.get('/setCookie', (req, res) => {

//     res.cookie('string', 'cookie', {
//         maxAge: 5000,
//         secure: true,
//         httpOnly: true
//     });
//     res.cookie('json', {
//         name: 'cookie',
//         property: 'delicious'
//     });

//     res.redirect('/getCookie');
// });

// app.get('/', (req, res) => {

//     res.status(200).send('<h1>Success</h1>');
// });
// app.get('/login', (req, res) => {
//     console.log(req.cookies);
// });
// app.post('/login',(req, res) => {

//     const userid = req.body.userid;
//     const password = req.body.password;

//     console.log(userid, password);
//     console.log(req.body);

//     if(userid === 'brand13' && password === 'kind0314'){
       
//         res.cookie('auth', true);
//         res.cookie('user', 'brand13');

//         res.redirect('/');
//     }else{
//         res.status(200).send('<h1>Fail</h1>');
//     }
// });

app.use((req, res) => {
    req.session.now = (new Date()).toUTCString();

    res.status(200).send(req.session);
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404 ERROR - PAGE NOT FOUND</h1>');
})

app.listen(port, () => {
    console.log(`Server Running at http://127.0.0.1:${port}`);
});

