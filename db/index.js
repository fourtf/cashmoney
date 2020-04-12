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
db.exec('DROP TABLE IF EXISTS products')
db.exec(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL DEFAULT '',
    price_cents INTEGER NOT NULL DEFAULT 100,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const insertProduct = db.prepare(
    'INSERT INTO products (name, price_cents) VALUES (:name, :price_cents)'
)
const allProducts = db.prepare('SELECT * from products')
// const removeProduct = db.prepare('DELETE FROM products WHERE name = :name')

try {
    insertProduct.run({ name: `Mate`, price_cents: 100 })
    insertProduct.run({ name: `Pizza`, price_cents: 260 })
} catch (e) {
    console.error(e)
}

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
