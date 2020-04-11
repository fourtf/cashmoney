import sqlite from 'better-sqlite3'

const db = sqlite('database.db')

// db.exec('CREATE')

//
// USERS
//
db.exec(`CREATE TABLE IF NOT EXISTS users (
    name VARCHAR PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const insertUser = db.prepare('INSERT INTO users (name) VALUES (:name)')
const allUsers = db.prepare('SELECT * from users')
const removeUser = db.prepare('DELETE FROM users WHERE name = :name')

try {
    insertUser.run({ name: 'testuser1' })
    insertUser.run({ name: 'testuser2' })
    insertUser.run({ name: 'testuser3' })
} catch {
    //
}

//
// PRODUCTS
//
db.exec(`CREATE TABLE IF NOT EXISTS pro (
    name VARCHAR PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// const insertUser = db.prepare('INSERT INTO users (name) VALUES (:name)')
// const allUsers = db.prepare('SELECT * from users')
// const removeUser = db.prepare('DELETE FROM users WHERE name = :name')

// Exported wrapper
export function getAllUsers() {
    return allUsers.all()
}

const allowedUsers = /^[a-z0-9_]$/

export function addUser(user) {
    if (!allowedUsers.user.name) {
        throw new Error('')
    }

    insertUser.run(user)
}
