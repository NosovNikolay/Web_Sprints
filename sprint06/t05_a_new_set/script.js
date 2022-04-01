const avangers = []

const form = document.getElementById('candidateForm')

const property2str = ([field, value]) => `[${field}] => ${typeof value === 'string' ? value : value.name}`

const avanger2str = obj =>
    `(\n\t${Object.entries(obj).map(property2str).join('\n\t')}\n)`

const update = () =>
    (list.innerText =
        'POST\n\nArray\n' + avangers.map(a => avanger2str(a)).join('\n'))

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const avanger = {}
    for (const [field, value] of data) avanger[field] = value
    avangers.push(avanger)
    update()
    form.reset()
})