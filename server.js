const express = require('express')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const OAuth = require('OAuth')
const Twitter = require('Twitter')
const path = require('path')
const secrets = require('./secrets.js')

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

const app = express()

app.use(require('morgan')('dev'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({extended: true}))
app.use(require('express-session')({secret: 'blossombellascskye', resave: true, saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/twitter', require('./twitter'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(3000, () => console.log('doing all good things on 3000'))