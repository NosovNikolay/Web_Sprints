const express = require('express')
const expressThymeleaf = require('express-thymeleaf')
const {TemplateEngine} = require('thymeleaf')
const bodyParser = require('body-parser')
const PORT = process.env.PORT ?? 8080

const app = express()
const templateEngine = new TemplateEngine()
app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

const User = require('./models/user')

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})

app.get('/', function (req, res) {
    res.render('./views/registration')
})

app.post('/signup', (req, res) => {
    let get = req.body
    if (!get) {
        return res.sendStatus(400)
    }
    if (get.login === '' || get.full_name === '' || get.email === '' || get.password === '') {
        return res.render('./views/registration', {
            login: get.login,
            fullName: get.full_name,
            email: get.email,
            errorMsg: 'Fields cannot be empty! Fill in all fields!'
        })
    }
    if (get.password !== get.confirm_password) {
        return res.render('./views/registration', {
            login: get.login,
            full_name: get.full_name,
            email: get.email,
            errorMsg: 'Password and Confirm password do not match! Try again...'
        })
    }
    let user = new User(get.login, get.password, get.full_name, get.email)
    user.request(res)
})
