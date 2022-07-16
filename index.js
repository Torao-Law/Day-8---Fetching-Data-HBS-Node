const express = require('express')

const app = express()
const PORT = 5000
const { timeConverter } = require('./handle/timeConverter')
const { timeDistanceConverter } = require('./handle/timeDistanceConverter')

const isLogin = true

// set call hbs
app.set('view engine', 'hbs');

// set static folder in express
app.use(express.static('public'))

// set body parser
app.use(express.urlencoded({ extended: false }))

// data array sementara
let blogs = [
    {
        titleProject: "Dandi",
        bodyProject: 'Ini adalah contoh data dummy',
        start_Project: '31 May 2022',
        end_Project: '18 Aug 2022',
        distanceTime: '2 weeks',
        checkBoxs: ['fa-brands fa-golang', 'fa-brands fa-python']
    }
]

// endpoint get routing
// app.get('/', (req, res) => {
//     res.render('index')

//     console.log(blogs);
// })

app.get('/', (req, res) => {
    let startProject = new Date(blogs.start_Project)
    let endProject = new Date(blogs.end_Project)
    let dataRender = blogs.map((data) => {
        return {
            ...data,
            startProject: timeConverter(startProject),
            endProject: timeConverter(endProject),
            distanceTime: timeDistanceConverter(startProject, endProject)
        }
    })

    console.log(dataRender)

    res.render('index', { blogs: dataRender })
})

app.get('/addProject', (req, res) => {
    if (!isLogin) {
        res.redirect('/')
    } else {
        res.render('addProject')
    }
})

app.get('/detail-project', (req, res) => {
    res.render('detail-project')
})

app.get('/contact-me', (req, res) => {
    res.render('contact-me')
})

app.post('/addProject', (req, res) => {
    let data = req.body
    let startProject = new Date(data.startProject)
    let endProject = new Date(data.endProject)

    let dataRender = {
        titleProject: data.titleProject,
        bodyProject: data.bodyProject,
        start_Project: data.startProject,
        end_Project: data.endProject,
        checkBoxs: [data.checkBoxs]
    }

    blogs.push(dataRender)

    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})