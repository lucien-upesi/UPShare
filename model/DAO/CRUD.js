class CRUD {
  constructor (table, prefix) {
    this.table = table
    this.prefix = prefix
    this.db = require('../../config/db')
  }

  get (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM ${this.table} WHERE ${this.prefix}_id =  ?`, [id], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(results[0])
        }
      })
    })
  }
  getAll () {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM ${this.table}`, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          if (results[0]) resolve(results)
          else resolve('no data')
        }
      })
    })
  }
  put (entity) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO ${this.table} SET ?`, entity, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          console.log(results)
          resolve(this.get(results.insertId.toString()))
        }
      })
    })
  }
  update (id, entity) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE ${this.table} SET ? WHERE ${this.prefix}_id = ?`, [entity, id], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(id))
        }
      })
    })
  }
  erase (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`DELETE FROM ${this.table} WHERE ${this.prefix}_id = ?`, id, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve({id: id})
        }
      })
    })
  }
}
module.exports = CRUD
