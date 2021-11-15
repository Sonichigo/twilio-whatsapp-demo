const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH;
const whatsapp = process.env.WHATSAPP_PHONE;
const joePhone = process.env.JOE_PHONE;
const client = require("twilio")(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/send", (req, res) => {
  client.messages
    .create({
      from: whatsapp,
      to: joePhone,
      body: "Your appointment is coming up on October 22 at 4PM",
    })
    .then((message) => res.send(`Message ${message.sid}`));
});

app.post("/receive", (req, res) => {
  console.log(`New message: ${req.body.Body}`);

  const twiml = new MessagingResponse();

  twiml.message(`You sent ${req.body.Body}`);

  res.writeHead(200, { "Content-Type": "text/xml" });

  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
