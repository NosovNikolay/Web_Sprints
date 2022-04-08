const db = require('./db')

module.exports = class Model {
  static tableName = null
  static idField = 'id'
  id = null

  static __requireTable() {
    if (this.tableName === null) throw new Error('static tableName is not set')
  }

  static __getFieldSetter(field, value) {
    const preparedValue = typeof value === 'string' ? `"${value.replaceAll('"', '\\"')}"` : value + ''
    return `${field}=${preparedValue}`
  }

  static fromObject(obj) {
    return new this(...Object.values(obj))
  }

  static async find(id) {
    this.__requireTable()
    const [res] = await db.query(`SELECT *
                                  FROM ${this.tableName}
                                  WHERE id = ${id}`)
    return res.length ? this.fromObject(res[0]) : null
  }

  constructor(id = null) {
    this.id = id
  }

  toFieldsSet(excludes = []) {
    return Object.entries(this).reduce(([fields, values], [k, v]) =>
      excludes.includes(k) ? [fields, values] : [[...fields, k], [...values, v]], [[], []])
  }

  delete() {
    this.constructor.__requireTable()
    if (this.id === null) throw new Error('Can`t find \'id\' of instance, maybe instance have not representation in database yet')
    return db.query(`DELETE
                     FROM ${this.constructor.tableName}
                     WHERE ${this.constructor.idField} = ${this.id}`)
  }

  save() {
    this.constructor.__requireTable()
    if (this.id === null) {
      const [fields, values] = this.toFieldsSet(['id'])
      return db.query(`INSERT INTO ${this.constructor.tableName} (${fields.join(', ')})
                       VALUES (${values.map(v => '"' + v + '"').join(', ')})`)
    }
    return db.query(`UPDATE ${this.constructor.tableName}
                     SET ${Object.entries(this).map(([k, v]) => this.constructor.__getFieldSetter(k, v)).join(', ')}
                     WHERE ${this.constructor.idField} = ${this.id}`)
  }
}
