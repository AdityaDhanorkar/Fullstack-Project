const{onRequest}=require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")  ("sk_test_51QA4UXRty9CXj9c8z3WqEEIli0RalHZ8n0VZpsrwXSQFmKgoANFE1fTAUFq2pdv0OnlIdcXpRyOibiAuO7ZfWA8l00rtkElXEO");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response)=>response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  logger.log("Payment Request Received BOOM !! for this Amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = onRequest(app); // Use onRequest from v2
