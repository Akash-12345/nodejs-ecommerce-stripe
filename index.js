const express=require('express')
const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv')
const userRoute=require("./routes/User")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/Product")
const cartRoute=require("./routes/Cart")
const orderRoute=require("./routes/Order")
const stripeRoute=require("./routes/Stripe")
const cors=require("cors")
dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
)
.then(()=>
console.log("DB connection successfull")
).catch((err)=>{
console.log(err)
})

app.use(express.json());
app.use(cors())
app.use("/api/checkout",stripeRoute)
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)

app.listen(process.env.PORT||5000, ()=>{
    console.log("BACKEND SERVER IS RUNNING")
})
