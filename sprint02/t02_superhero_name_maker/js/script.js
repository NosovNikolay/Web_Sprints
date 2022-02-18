function getAge() {
    let age = prompt('How old is the superhero?');
    let reqAge = RegExp(/^[1-9]|[0-9]{0,4}$/)

    if (age.length > 5 || !reqAge.test(age)) {
        alert('ERROR: Accepts only digits, cannot start with a zero, no more than 5 characters!');
        return
    }
    return age;
}

function getName() {
    let name = prompt('What animal is the superhero most similar to?')
    let regex = RegExp('^[a-zA-Z]+$');
    if (name.length > 20 || !regex.test(name)) {
        alert('ERROR: Accepts only one word, which consists only of Latin letters and its length does not exceed 20 characters.');
        return null
    }
    return name
}

function getGenger() {
    let gender = prompt('Is the superhero male or female? Leave blank if unknown or other.')
    let regex = RegExp('^male$|^female$|^$', 'i');
    if (!regex.test(gender)) {
        alert('ERROR: Accepts only male, female gender or blank!');
        return null
    }
    return gender
}

function createName() {
    let name
    let gender
    let age
    if (!(name = getName()))
        return
    if (!(gender = getGenger()))
        return
    if (!(age = getAge()))
        return
    let description
    if (RegExp('^male$', 'i').test(gender) && age < 18) {
        description = "boy";
    } else if (RegExp('^male$', 'i').test(gender) && age >= 18) {
        description = "man";
    } else if (RegExp('^female$', 'i').test(gender) && age < 18) {
        description = "girl";
    } else if (RegExp('^female$', 'i').test(gender) && age >= 18) {
        description = "woman";
    } else if (RegExp('^$').test(gender) && age < 18) {
        description = "kid";
    } else if (RegExp('^$').test(gender) && age >= 18) {
        description = "hero";
    }
    alert('The superhero name is: ' + name + '-' + description)
}

createName()