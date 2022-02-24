// This Website Created by ZaaDev
// Dont Forget to follow my instagram
// https://instagram.com/zaadevofc
// https://github.com/zaadevofc
// Happy to use :)

var express = require('express');
var nodemailer = require('nodemailer');
var axios = require('axios').default;
var router = express.Router();

const sendMails = (frm, t, s, txt, req, res) => new Promise((resolve, reject) => {
  var mailOpt = nodemailer.createTransport({
    service: 'gmail',
    auth: { // How to use see on https://github.com/zaadev/anonymous-mail/readme.md
      user: 'your_mail@eek.com', // Input your mail required!
      pass: 'your_password' // Input your password required!
    }
  });

  var setOpt = {
    from: `"${frm}" <zaadev@hack.com>`,
    to: `${t}`,
    subject: `${s}`,
    html: `${txt}`
  };

  mailOpt.sendMail(setOpt, (err, info) => {
    if (err) {
      sd = 'System error <h1 class="animate-pulse">❌</h1>'
      tl = 'Failed send email ❌'
    } else {
      sd = 'Send success <h1 class="animate-pulse">✅</h1>'
      tl = 'Succes send email ✅'
    }
    resolve({sd, tl})
  });
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Send Email Anonymous',
    my_url: "https://hack-mail.vercel.app",
    desc: "Mau ngirim email ke orang tanpa ketauan? Atau mau ngerjain pacar? Hehe :)",
    author: "ZaaDev"
  });
});

router.post('/send', function (req, res) {
  const {
    subject,
    sendto,
    email,
    message
  } = req.body
  f = email,
    t = sendto,
    s = subject,
    txt = message
  sendMails(f, t, s, txt, req, res)
    .then((ress) => {
      res.render('msg', {
        title: ress.tl,
        my_url: "https://hack-mail.vercel.app",
        desc: "Mau ngirim email ke orang tanpa ketauan? Atau mau ngerjain pacar? Hehe :)",
        author: "ZaaDev",
        msgInfo: ress.sd
      });
    })
})

router.get('*', function (req, res) {
  res.status(404).render('error')
})

module.exports = router;