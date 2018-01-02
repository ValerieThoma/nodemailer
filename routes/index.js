var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const creds = require('../config/config');

var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
}

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success)=>{
	if(error){
		console.log('error');
	}else{
		console.log('server is ready');
	}
});
/* GET home page. */
router.get('/', function(req, res, next) {
	var message = '';
	if(req.query.msg != undefined){
		message = req.query.msg;
	}
	res.render('index', { title: 'SunnyDale', message: message });
});


router.post('/send', (req, res)=>{
	var email = req.body.email;
	var content = req.body.content;
	var name = req.body.name;
	var phone = req.body.phone;
	var finalMessage = `${content} \n\n phone: ${phone}\n email: ${email}`;

	var mail = {
		from: email,
		to: 'lisagarlandrn@gmail.com',
		subject : 'test',
		text: finalMessage
	}

	transporter.sendMail(mail, (err, data)=>{
		if(err){
			console.log(err);
			res.redirect('/msg=fail');
		}else{
			console.log('success');
			res.redirect('/?msg=sucess');
		}
	});
});

module.exports = router;

