const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { OAuth2Client } = require('google-auth-library')

dotenv.config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

const app = express()
app.use(express.json())

const users = []

const upsert = (array, item) => {
    const o = array.findIndex(_item => _item.email === item.email)
    if (o > -1) array[o] = item
    else array.push(item)
}

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })
    const { name, email } = ticket.getPayload()
    upsert(users, { name, email })

    res.status(201)
    res.json({ name, email })
})

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/build/index.html'))
);

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server is ready at http://localhost:${process.env.PORT || 5000}`
    );
});