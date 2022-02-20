function transformation() {
    if (hero.textContent === 'Bruce Banner') {
        lab.style.backgroundColor = '#70964b'
        hero.textContent = 'HULK'
        hero.style.fontSize = '130px'
        hero.style.letterSpacing = '6px'
    } else {
        hero.textContent = 'Bruce Banner'
        hero.style.fontSize = '60px'
        lab.style.backgroundColor = '#ffb300'
        hero.style.letterSpacing = '2px'
    }
}