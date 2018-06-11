const CRUD = require('./CRUD')
const strings = require('../../config/strings')

class File extends CRUD {
  constructor () {
    super('file', 'file')
  }
  put (file) {
    if (!file.file_id) file.file_id = CRUD.generateID()
    file.file_url = `${strings.host}/document/${file.file_id}`
    const date = new Date().toISOString().split('T')[0]
    file.file_created_at = date
    file.file_updated_at = date
    file.file_deleted = 0
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO ${this.table} SET ?`, [file], (err) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(file.file_id))
        }
      })
    })
  }
  folderContents (id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT f.file_id, f.file_type, f.file_created_at, f.file_updated_at, f.file_deleted, f.file_folder, f.owner_id, f.file_name ' +
          'FROM file f, contains c ' +
          'WHERE c.file_id = ? AND c.file_id_file = f.file_id', [id], (err, results) => {
        if (err) reject(new Error(err.message))
        else resolve(results)
      })
    })
  }
  putIntoFolder (folderId, fileId) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO contains(file_id, file_id_file) VALUES(?, ?)`, [folderId, fileId], (err) => {
        if (err) reject(new Error(err.message))
        else resolve(resolve(this.get(fileId)))
      })
    })
  }
}
module.exports = File
