var nodemailer = require('nodemailer');
require('dotenv').config();
var handlebars = require('handlebars');
var fs = require('fs');

export function sendEmail(email, order) {
 var readHTMLFile = function(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
   if (err) {
    throw err;
    callback(err);
   } else {
    callback(null, html);
   }
  });
 };

 const pass = process.env.GMAIL_USER_PASSWORD;
 const user = process.env.GMAIL_USER_EMAIL;
 let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user,
   pass,
  },
 });

 readHTMLFile(`${__dirname}/../../docs/templates/turing.html`, function(
  err,
  html
 ) {
  var template = handlebars.compile(html);
  const { order_id, total_amount, tax_percentage } = order;

  const sales_tax = Math.round(tax_percentage * total_amount / 100);

  var replacements = {
   total_amount,
   sales_tax,
   order_id: order_id,
   total: total_amount + sales_tax,
  };

  var htmlToSend = template(replacements);

  let mailOptions = {
   from: user,
   to: email,
   subject: 'You order has been confirmed',
   html: htmlToSend,
  };
  transporter.sendMail(mailOptions, function(error, info) {
   if (error) {
    return error;
   } else {
    return info;
   }
  });
 });
}
