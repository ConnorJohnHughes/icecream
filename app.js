import express from 'express';
import mysql2 from "mysql2";
import dotenv from 'dotenv';



dotenv.config();
const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise()

const PORT = 3001;
const orders =[];

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


app.get('/db-test', async(req,res) =>{
    try{
        const [orders] = await pool.query('SELECT * FROM orders');
        res.send(orders);
    } catch(err){
        console.error('Database error:', err)
    }
});

app.get('/', (req,res) =>{
    res.render('home');

});
app.post('/submit-form', async(req,res) =>{
   
    try{
        const order = req.body;
        console.log('New order submitted: ', order);

        order.toppings = Array.isArray(order.toppings) ?
        order.toppings.join(",") : "";

        const sql = 
        `INSERT INTO orders (customer, email, flavor, cone, toppings) VALUES (?,?,?,?,?);`;

        const params = [
            order.name,
            order.email,
            order.flavor,
            order.method,
            order.toppings
        ];

        const[result] = await pool.execute(sql, params);
        console.log('Order saved with Id:', result.insertId)
    }catch(err){
        console.error('Database error:', err);
        res.status(500).send('Sorry there is a problem processing your order' + err.message);
    }
    res.render('confirmation',{order});

});
app.get('/admin', async (req, res) => {
    try{
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
        res.render('admin', {orders});
    } catch(err){
        console.error('Database error:', err);
        res.status(500).send('Error loading orders' + err.message);
    }
});


app.get('/home', (req,res) =>{
    res.render('home');

});
// app.post('/submit-form', (req, res) => {



//     const order = req.body;
//     order.timestamp = new Date().toLocaleDateString();


//     orders.push(order);
//     console.log(orders);

 
//     res.render('confirmation', { order });
// });

app.listen(PORT,() =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
