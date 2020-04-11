import sqlite from 'better-sqlite3'

const db = sqlite('database.db')

// db.exec('CREATE')

//
// USERS
//
db.exec('DROP TABLE users')
db.exec(`CREATE TABLE users (
    name VARCHAR PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    credit_cents INTEGER NOT NULL DEFAULT 0
)`)

const insertUser = db.prepare('INSERT INTO users (name) VALUES (:name)')
const allUsers = db.prepare('SELECT * FROM users')
const removeUser = db.prepare('DELETE FROM users WHERE name = :name')
const user = db.prepare('SELECT * FROM users WHERE name = :name')

try {
    for (let i = 0; i < 100; i++) {
        insertUser.run({ name: `testuser${i}` })
    }
} catch (e) {
    console.error(e)
}

//
// PRODUCTS
//
db.exec(`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL DEFAULT '',
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// const insertUser = db.prepare('INSERT INTO products (name) VALUES (:name)')
const allProducts = db.prepare('SELECT * from products')
// const removeUser = db.prepare('DELETE FROM products WHERE name = :name')

// Exported wrapper
export function getUser(name) {
    return user.get({ name })
}

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

export function getAllProducts() {
    return allProducts.all()
}
