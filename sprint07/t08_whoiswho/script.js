let data = null

const updateOptions = i => {
  valueSelect.innerHTML = ''
  if (!data) return
  const defaultOption = document.createElement('option')
  defaultOption.innerText = 'None'
  defaultOption.value = ''
  valueSelect.append(defaultOption, ...[...new Set(data.records.map(r => r[i]))].map(o => {
    const opt = document.createElement('option')
    opt.innerText = opt.value = o
    return opt
  }))
}

const filters = new Proxy({
  fieldIdx: null,
  value: null,
}, {
  set(target, p, value) {
    target[p] = value
    if (p === 'fieldIdx') updateOptions(value)
    return true
  },
})

const selectFieldHandler = idx => () => filters.fieldIdx = idx

const generateRow = (arr, header) => {
  const row = document.createElement('tr')
  const component = header ? 'th' : 'td'
  row.append(...arr.map((str, i) => {
    const c = document.createElement(component)
    if (header) {
      const b = document.createElement('button')
      b.innerText = str
      b.addEventListener('click', selectFieldHandler(i))
      c.append(b)
    } else c.innerText = str
    return c
  }))
  return row
}

const update = () => {
  document.getElementsByTagName('table')[0]?.remove()
  const table = document.createElement('table')
  table.append(generateRow(data.head, true),
    ...data.records
      .filter(r => filters.value ? r[filters.fieldIdx] === filters.value : true)
      .map(r => generateRow(r)),
  )
  document.body.append(table)
}

const parseCSV = text => {
  const [head, ...records] = text.trim().split('\n').map(l => l.split(','))
  return {
    head,
    records,
  }
}

const readFile = async file => new Promise((res, rej) => {
  const reader = new FileReader()
  reader.onload = ({ target: { result } }) => fetch(result).then(res).catch(rej)
  reader.readAsDataURL(file)
})

uploadForm.addEventListener('submit', async e => {
  e.preventDefault()
  readFile(new FormData(e.target).get('fileInput')).then(async res => {
    data = parseCSV(await res.text())
    filterForm.style.display = 'block'
    filters.fieldIdx = 0
    filters.value = null
    update()
  }).catch(() => {
    filterForm.style.display = 'none'
  })
})
filterForm.addEventListener('submit', async e => {
  e.preventDefault()
  filters.value = new FormData(e.target).get('valueSelect')
  update()
})
