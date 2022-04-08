let isNode = true
try {
  isNode = !window
} catch {
}

let Note_
try {
  Note_ = require('./Note')
} catch {
  Note_ = Note
}

class NotePad {
  notes = null

  constructor(notes = [], updateCallback = null, filename = null) {
    this.filename = filename
    this.updateCallback = updateCallback
    const $this = this
    this.notes = new Proxy([...notes], {
      set(target, p, value) {
        target[p] = value
        return $this.update()
      },
    })
    this.update()
  }

  update() {
    return this.updateCallback?.(this) ?? true
  }

  add(note) {
    this.notes.push(note)
  }

  get(id) {
    return this.notes.find(n => n.id === id)
  }

  remove(id) {
    this.notes.splice(this.notes.findIndex(n => n.id === id), 1)
  }

  toJSON() {
    return {
      notes: this.notes,
      filename: this.filename,
    }
  }

  static fromObject(obj, updateCallback = null) {
    return new NotePad(obj.notes.map(Note_.fromObject), updateCallback, obj.filename)
  }
}

if (isNode)
  module.exports = NotePad
