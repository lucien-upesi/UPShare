const bcrypt = require('bcrypt')
const saltrounds = 11
const CRUD = require('./CRUD')
const jwt = require('jsonwebtoken')
const strings = require('../../config/strings')

class User extends CRUD {
  constructor () {
    super('user', 'user')
  }

  get (idOrEmail) {
    const attr = idOrEmail.search('@') > 0 ? 'email' : 'id'
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT user_id, user_email, user_last_name, user_first_name, user_birthday, user_ctry FROM user WHERE user_${attr} = ?`, [idOrEmail], (err, results) => {
        if (err) reject(new Error(err.message))
        else if (results.length < 1) reject(new Error('User not found'))
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
          user['user_password'] = hash
          user.user_id = CRUD.generateID()
          this.db.query(`INSERT INTO user SET ?`, user, (err, result) => {
            if (err) reject(new Error(err.message))
            else {
              resolve(this.get(user.user_id))
            }
          })
        }
      })
    })
  }

  async getByJWT (token) {
    return jwt.verify(token, strings.secretJWT, async (err, decoded) => {
      if (err) return { error: err.message }
      else {
        return this.get(decoded.user)
      }
    })
  }

  login (email, password) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT user_id as id, user_password as password FROM ${this.table} WHERE user_email = ?`, [email], (err, result) => {
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
                reject(new Error('Invalid password or login !'))
              }
            }
          })
        }
      })
    })
  }
  /* Verify if password match w/bdd */
  verifyPwd(password, id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT user_password as password FROM ${this.table} WHERE user_id = ?`, [id], (err, result) => {
        if (err) reject(new Error(err.message))
        else {
          bcrypt.compare(password, result[0].password, async (err, valid) => {
            if (err) reject(new Error(err.message))
            else {
              if (valid) {
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
  /* Verify and Change Password */
  changePwd (oldPassword, newPassword, rePassword, id) {
    return new Promise((resolve, reject) => {
      this.verifyPwd(oldPassword, id).then( () => {
        if (newPassword === rePassword) {
            bcrypt.hash(newPassword, saltrounds, (err, hash) => {
                if (err) reject(new Error(err.message))
                else {
                    newPassword = hash
                    this.db.query(`UPDATE ${this.table} SET ${this.prefix}_password = ? WHERE ${this.prefix}_id = ?`, [newPassword, id], (err, results) => {
                        if (err) reject(new Error(err.message))
                        else {
                            resolve({success: 1})
                        }
                    })
                }
            })
        } else {
          reject(new Error('Password Mismatch'))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  /* Override update method w/verifyPwd */
  update (password, id, user) {
    return new Promise((resolve, reject) => {
      this.verifyPwd(password, id).then(() => {
        this.db.query(`UPDATE ${this.table} SET ? WHERE ${this.prefix}_id = ?`, [user, id], (err, result) => {
          if (err) reject(new Error(err.message))
          else {
            resolve(this.get(id))
          }
        })
      }).catch( (err) => {
          reject(err)
      })
    })
  }
  /* Insert Token */
  insertToken (email) {
    return new Promise((resolve, reject) => {
      const token = CRUD.generateToken(10)
      this.db.query(`UPDATE ${this.prefix} SET reset_token = ? WHERE ${this.prefix}_email = ?`, [token, email], (err) => {
        if (err) reject(new Error(err.message))
        else resolve(token)
      })
    })
  }
  /* Verify token */
  verifyToken (token, email) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT reset_token as token FROM ${this.table} WHERE ${this.prefix}_email = ?`, [email], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          if (results.length > 0 && token === results[0].token) {
            resolve()
          } else reject(new Error('Token Error'))
        }
      })
    })
  }
  /* ResetPassword w/ Token */
  resetPassword(email, token, newPassword, rePassword) {
    return new Promise((resolve, reject) => {
        this.verifyToken(token, email).then(() => {
            if (newPassword === rePassword) {
                bcrypt.hash(newPassword, saltrounds, (err, hash) => {
                    if (err) reject(new Error(err.message))
                    else {
                        newPassword = hash
                        this.db.query(`UPDATE ${this.table} SET ${this.prefix}_password = ?, reset_token = null WHERE ${this.prefix}_email = ?`, [newPassword, email], (err) => {
                            if (err) reject(new Error(err.message))
                            else resolve({success: 1})
                        })
                    }
                })
            } else reject(new Error('Password Mismatch'))
        }).catch((err) => {
            reject(err)
        })
    })
  }
  getTeams (id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT DISTINCT t.team_id, team_name, grd_name FROM grade g, team t,grade_team_user as j, user u WHERE t.team_id = j.team_id AND j.user_id = ? AND g.grd_level = j.grd_level AND t.disabled = 0',
        [id], (err, results) => {
          if (err) reject(new Error(err.message))
          else resolve(results)
        })
    })
  }
  getTeam (id, teamId) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT t.team_id, t.team_name, g.grd_name FROM grade g, team t,grade_team_user as j, user u WHERE t.team_id = j.team_id AND j.user_id = ? AND g.grd_level = j.grd_level AND j.team_id = ?',
        [id, teamId], (err, results) => {
          if (err) reject(new Error(err.message))
          else resolve(results[0])
        })
    })
  }
  inviteInTeam (id, teamId) {
    return new Promise((resolve, reject) => {
      const token = CRUD.generateToken(10)
      this.db.query('INSERT INTO grade_team_user VALUES(?, ?, ?, ?)', [id, 3, teamId, token], (err) => {
        if (err) reject(new Error(err.message))
        else resolve(token)
      })
    })
  }
  joinTeam (id, teamId, token) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE grade_team_user SET grd_level = 2, inv_token = null WHERE user_id = ? AND team_id = ? AND inv_token = ?`, [id, teamId, token], (err, results) => {
        if (err) reject(new Error(err.message))
        else if (results.affectedRows < 1) reject(new Error('Invitation not found'))
        else resolve({success: 1})
      })
    })
  }
  getOwnFiles (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM file WHERE owner_id = ?`, [id], (err, results) => {
        if (err) reject(new Error(err.message))
        else resolve(results)
      })
    })
  }
  getSharedFiles (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT `)
    })
  }
}

module.exports = User
