const nodemailer = require('nodemailer')
const strings = require('../../config/strings')
const poolConfig = {
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: 'teamupshare@gmail.com',
    pass: '4Z6ze+XGNL3JcMLr'
  },
  tls: {
    rejectUnauthorized: false
  }
}
const transporter = nodemailer.createTransport(poolConfig)

const message = {
  from: 'teamupshare@gmail.com' // listed in rfc822 message header
}

const mail = {
  poolConfig,
  transporter,
  message,
  async send () {
    return this.transporter.sendMail(this.message)
  },
  url: strings.host
}

module.exports = mail
