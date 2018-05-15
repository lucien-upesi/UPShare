const db = require('../../config/db')
const bcrypt = require('bcrypt')
const saltrounds = 11
const CRUD = require('./CRUD')
const jwt = require('jsonwebtoken')
const strings = require('../../config/strings')

class User extends CRUD {
  constructor () {
    super('user', 'user')
  }
  get (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT user_email, user_id, user_last_name, user_first_name, user_birthday, user_ctry FROM user WHERE user_id = ?`, [id], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(results[0])
        }
      })
    })
  }
  put (user) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.user_password, saltrounds, (err, hash) => {
        if (err) reject(new Error(err.message))
        else {
          user.user_password = hash
          db.query(`INSERT INTO user SET ?`, user, (err, result) => {
            if (err) reject(new Error(err.message))
            else {
              resolve(this.get(result.insertId.toString()))
            }
          })
        }
      })
    })
  }
  getByJWT (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, strings.secretJWT, (err, decoded) => {
        if (err) reject(new Error(err.message))
        else {
          db.query(`SELECT user_email, user_id, user_last_name, user_first_name, user_birthday, user_ctry FROM ${this.table} WHERE user_id = ?`, [decoded.user], (err, results) => {
            if (err) reject(new Error(err.message))
            else {
              resolve(results[0])
            }
          })
        }
      })
    })
  }
  login (email, password) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT user_id as id, user_password as password FROM ${this.table} WHERE user_email = ?`, [email], (err, result) => {
        if (err) reject(new Error(err.message))
        else {
          bcrypt.compare(password, result[0].password, async (err, valid) => {
            if (err) reject(new Error(err.message))
            else {
              if (valid) {
                const token = jwt.sign({user: result[0].id}, strings.secretJWT, {expiresIn: '7d'})
                const date = new Date(jwt.decode(token).exp * 1000)
                date.setHours(date.getHours() + 2)
                const user = await this.get(result[0].id)
                resolve({jwt: token, expire: date.toUTCString(), user: user})
              } else {
                reject(new Error('invalid password'))
              }
            }
          })
        }
      })
    })
  }
  // Verify if password match w/bdd
  verifyPwd(password, id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT user_password as password FROM ${this.table} WHERE user_id = ?`, [id], (err, result) => {
        if (err) reject(new Error(err.message))
        else {
          bcrypt.compare(password, result[0].password, async (err, valid) => {
            if (err) reject(new Error(err.message))
            else {
              if (valid) {
                console.log('Verify OK')
                resolve()
              } else {
                reject(new Error('Password Mismatch'))
              }
            }
          })
        }
      })
    })
  }
  // Verify and Change Password
  changePwd(oldPassword, newPassword, id) {
    return new Promise((resolve, reject) => {
      this.verifyPwd(oldPassword, id).then( () => {
            bcrypt.hash(newPassword, saltrounds, (err, hash) => {
                if (err) reject(new Error(err.message))
                else {
                    newPassword = hash
                    db.query(`UPDATE ${this.table} SET ${this.prefix}_password = ? WHERE ${this.prefix}_id = ?`, [newPassword, id], (err, result) => {
                        if (err) reject(new Error(err.message))
                        else {
                            resolve({success: 1})
                        }
                    })
                }
            })
        })
    })
  }
  // Override update method w/verifyPwd
  update(password, id, user) {
    return new Promise((resolve, reject) => {
      this.verifyPwd(password, id).then( () => {
        db.query(`UPDATE ${this.table} SET ? WHERE ${this.prefix}_id = ?`, [user, id], (err, result) => {
            if (err) reject(new Error(err.message))
            else {
                resolve(this.get(id))
            }
        })
      })
    })
  }
}

module.exports = User
