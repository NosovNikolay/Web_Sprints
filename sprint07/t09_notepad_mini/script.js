let notepad = null

const state = new Proxy({
  selectedNote: null,
}, {
  set(target, p, value) {
    target[p] = value
    if (p === 'selectedNote') {
      if (!value) {
        selectedNote.style.display = 'none'
      } else {
        selectedNote.style.display = 'block'
        selectedNoteHeader.innerText = selectedNoteName.innerText = value.name
        selectedNoteCreated.innerText = value.created.toLocaleString()
        selectedNoteImportance.innerText = value.importance
        selectedNoteContent.innerText = value.content
      }
    }
    return true
  },
})

const setStatus = status => listHeader.innerText = status

const createButton = (text, action) => {
  const button = document.createElement('button')
  button.innerText = text
  button.addEventListener('click', action)
  return button
}

const deleteHandler = id => () => fetch(`/note/${id}`, {
  method: 'DELETE',
}).then(() => {
  notepad?.remove(id)
  state.selectedNote = null
}).catch(() => {})

const selectNoteHandler = note => () => state.selectedNote = note

const notepadUpdateHandler = () => {
  let isInit = true
  return np => {
    if (isInit) {
      setStatus('List of notes')
    }

    list.innerHTML = ''
    list.append(...[...np.notes.map(n => {
      const li = document.createElement('li')
      li.append(createButton(`${n.created.toLocaleString()} > ${n.name}`, selectNoteHandler(n)), createButton('Delete', deleteHandler(np.id)))
      return li
    })])

    isInit && (isInit = false)
  }
}

createForm.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  fetch('/note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
      importance: formData.get('importance'),
      content: formData.get('content'),
    }),
  }).then(async res => {
    notepad?.add(Note.fromObject(await res.json()))
    e.target.reset()
  }).catch(console.log)
})

setStatus('Loading...')

fetch('/notepad').then(async res => notepad = NotePad.fromObject(await res.json(), notepadUpdateHandler())).catch(err => {
  setStatus(err.message)
})
