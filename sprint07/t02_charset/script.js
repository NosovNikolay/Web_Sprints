const PLACEHOLDER = '$ and € are currency'

const generateCharsetPreviewTemplate = (charset, placeholder, string) => `
<label for="input${charset}">
        ${charset}
        <textarea name="input${charset}" id="input${charset}" placeholder="${placeholder}">${string}</textarea>
</label>
<br>
`

const decode = (str, charset) => new TextDecoder(charset).decode(new TextEncoder().encode(str))

const inputHandler = e => state.input = e.target.value

const state = new Proxy({
    input: '',
    charsets: []
}, {
    set(target, p, value) {
        target[p] = value
        if (p === 'charsets') {
            previews.innerHTML = value.reduce((acc, ch) => `${acc}\n${generateCharsetPreviewTemplate(ch, decode(PLACEHOLDER, ch), decode(target.input, ch))}`, '')
            value.forEach(ch => document.getElementById(`input${ch}`).addEventListener('input', inputHandler))
            return true
        }
        inputString.value = value
        target.charsets.forEach(ch => document.getElementById(`input${ch}`).value = decode(value, ch))
        return true
    }
})

charsetForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target)
    state.charsets = formData.getAll('charsets')
    state.input = formData.get('inputString')
})

inputString.addEventListener('input', inputHandler)

