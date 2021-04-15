/**
 * Tomando como datasource data/users.json
 * 1. Desarrollar una API REST con los endpoints que permita:
 *      1.1. Listar todos los usuarios 
 *      1.2. Devuelva un usuario por ID, por ejemplo /api/users/4 devuelve el usuario cuyo id es 4:
 *      1.3. Inserte el siguiente user y retorne el listado de todos
 * {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
          "lat": "-38.2386",
          "lng": "57.2232"
        }
      },
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
 *
 */

const express = require('express')

const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

const users = require('./data/users.json')

app.get('/api/users', (req, res) => {
  res.send(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = findUserById(req.params.id)
  res.send(user || `Couldn't find the user by id: ${req.params.id}`)
})

app.post('/api/users/add', (req, res) => {
  const user = findUserById(req.body.id)
  if (!user) {
    users.push(req.body)
  }
  res.send(users)
})

function findUserById(id) {
  return users.find(u => u.id == id)
}

app.set('PORT', 3000 || 4000)

app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`)
})