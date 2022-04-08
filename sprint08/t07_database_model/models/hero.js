const Model = require('../model')

module.exports = class Hero extends Model {
  static tableName = 'heroes'
  name = null
  description = null
  class_role = null
  race_id = null

  constructor(id = null, name, description, class_role, race_id = 1) {
    super(id)
    this.name = name
    this.description = description
    this.class_role = class_role
    this.race_id = race_id
  }
}

