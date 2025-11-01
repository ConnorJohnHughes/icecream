import express from 'express';

const app = express();
const PORT = 3001;
const orders =[];

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
    res.render('admin', {orders});

});
app.get('/home', (req,res) =>{
    res.render('home');

});
app.post('/submit-form', (req, res) => {



    const order = req.body;
    order.timestamp = new Date().toLocaleDateString();


    orders.push(order);
    console.log(orders);

 
    res.render('confirmation', { order });
});

app.listen(PORT,() =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
