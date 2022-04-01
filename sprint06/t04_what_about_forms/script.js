const form = document.getElementById('quest')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const answer = data.get('soulStoneAction')
    switch (answer) {
        case null:
            result.innerText = 'Choose an answer'
            break
        case 'a3':
            result.innerText = 'You are right'
            break
        default:
            result.innerText = 'Noup'
            break
    }
})