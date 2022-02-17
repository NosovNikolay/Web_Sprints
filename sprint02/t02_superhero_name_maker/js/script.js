var name = prompt("What animal is the superhero most similar to?")
var gender = prompt("Is the superhero male or female? Leave blank if unknown or other.")
var old = prompt("How old is the superhero?")

const r_name = new RegExp("/^[a-zA-Z]+$/.{1,20}$/.");