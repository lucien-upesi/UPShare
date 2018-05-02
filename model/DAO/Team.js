const CRUD = require('./CRUD')

class Team extends CRUD {
  constructor () {
    super('team', 'team')
  }
}
module.exports = Team
