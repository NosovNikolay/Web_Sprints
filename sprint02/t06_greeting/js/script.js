function greetings(f_input, l_input) {
    let f_name = String(f_input.match(/^[a-zA-Z]+$/))
    let l_name = String(l_input.match(/^[a-zA-Z]+$/))

    if (!f_name || !l_name || isNaN(f_name) || isNaN(l_name)) {
        console.log('Wrong input')
        alert('Wrong input')
        return
    }

    f_name = f_name.charAt(0).toUpperCase() + f_name.slice(1)
    l_name = l_name.charAt(0).toUpperCase() + l_name.slice(1)

    console.log(`Hey, ${f_name} ${l_name}`);
    alert(`Hey, ${f_name} ${l_name}`);
}

let f_input = prompt("Enter your first name")
let l_input = prompt("Enter your last name")
greetings(f_input, l_input)