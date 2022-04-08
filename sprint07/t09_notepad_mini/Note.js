class Note {
  constructor(name, importance, content, created = null, id = null) {
    this.name = name
    this.importance = importance
    this.content = content
    this.created = created ?? new Date()
    this.id = id ?? this.created.toISOString()
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      importance: this.importance,
      content: this.content,
      created: this.created.toISOString(),
    }
  }

  static fromObject(obj) {
    return new Note(obj.name, obj.importance, obj.content, obj.created ? new Date(obj.created) : null, obj.id)
  }
}

try {
  module.exports = Note
} catch {
}
