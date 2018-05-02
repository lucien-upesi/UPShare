const db = require('../../config/db')

class CRUD {
  constructor (table, prefix) {
    this.table = table
    this.prefix = prefix
  }
  get (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${this.table} WHERE ${this.prefix}_id =  ${id}`, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(results[0])
        }
      })
    })
  }
  getAll () {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${this.table}`, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(results[0])
        }
      })
    })
  }
  put (entity) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${this.table} SET ?`, entity, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(results.insertId.toString()))
        }
      })
    })
  }
  update (id, entity) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${this.table} SET ? WHERE ${this.prefix}_id = ?`, [entity, id], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(results.insertId.toString()))
        }
      })
    })
  }
  erase (id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${this.table} WHERE ${this.prefix}_id = ?`, id, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve({id: id})
        }
      })
    })
  }
}
module.exports = CRUD
