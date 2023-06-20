
const stripe = require('stripe')(process.env.SECRET_KEY)

const createCustomer = async(req, res)=>{
    console.log(req.body)
    try{
        const customer = await stripe.customers.create({
            name:req.body.name,
            email:req.body.email
        });
        res.send(customer).status(200)
    }
    catch(error){
        res.send({success:false, message:error.message}).status(400)
    }
};
const addNewCard = async(req, res)=>{
    try{
        const {customer_id, card_Name, card_ExpYear,
        card_ExpMonth, card_Number, card_CVC} = req.body;

        const card_token = await stripe.tokens.create({
            card:{
                name: card_Name,
                number: card_Number,
                exp_year: card_ExpYear,
                exp_month: card_ExpMonth,
                cvc: card_CVC
            }
        });

        const card= await stripe.customers.createSource(customer_id, {
            source: `${card_token.id}`
        });
        res.send({card:card.id}).status(200)
    }
    catch(error){
        res.send({success:false, message:error.message}).status(400)
    }
};

const createCharges = async(req, res)=>{
    try{
        const createCharge = await stripe.charges.create({
            receipt_email: "tester@gmail.com",
            amount: parseInt(req.body.amount)*100,
            currency:"INR",
            card: req.body.card_id,
            customer: req.body.customer_id
        });
        res.send(createCharge).status(200);
    }
    catch(error){
        res.send({success:false, message:error.message})
    }
};

module.exports = {createCustomer, addNewCard, createCharges}