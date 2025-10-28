import express from 'express';

const app = express();
const PORT = 3001;
const order = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.render('home');

});
app.get('/confirm', (req,res) =>{
    res.render('confirmation');

});
app.get('/admin', (req,res) =>{
    res.render('admin');

});

app.listen(PORT,() =>{
    console.log(`Server is running at http://localhost:${PORT}`)
    // console.log("Server is running at http://137.184.41.43:3001")
})
