const CRUD = require('./CRUD')

class Team extends CRUD {
  constructor () {
    super('team', 'team')
  }
  get (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT team_id, team_name FROM ${this.table} WHERE ${this.prefix}_id =  ? AND disabled = 0`, [id], (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(results[0])
        }
      })
    })
  }
  put (team, ownerId) {
    team[this.prefix + '_id'] = CRUD.generateID()
    return new Promise((resolve, reject) => {
      this.db.query(`CALL createGroup('${team[this.prefix + '_id']}', '${team.team_name}', '${ownerId}')`, team, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(team[this.prefix + '_id']))
        }
      })
    })
  }
  getAll () {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT team_id, team_name FROM ${this.table} WHERE disabled = 0`, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          if (results[0]) resolve(results)
          else resolve('no data')
        }
      })
    })
  }
  erase (id) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE ${this.table} SET disabled = 1 WHERE ${this.prefix}_id = ?`, id, (err, results) => {
        if (err) reject(new Error(err.message))
        else {
          resolve({id: id})
        }
      })
    })
  }

}
module.exports = Team
