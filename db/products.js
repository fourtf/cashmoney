import conn from './connection'

// PRODUCTS
conn.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL DEFAULT '',
    price_cents INTEGER NOT NULL DEFAULT 100,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// QUERIES
const queries = {
    insertProduct: conn.prepare(
        'INSERT INTO products (name, price_cents) VALUES (:name, :price_cents)'
    ),
    allProducts: conn.prepare('SELECT * from products'),
    getProduct: conn.prepare('SELECT * FROM products WHERE id = :id'),
    removeProduct: conn.prepare('DELETE FROM products WHERE id = :id'),
}

// Exported wrapper
export function getAllProducts() {
    return queries.allProducts.all()
}

export function getProduct(id) {
    return queries.getProduct.get({ id })
}

export function createProduct(name, price_cents) {
    queries.insertProduct.run({ name, price_cents })
}

export function removeProduct(id) {
    queries.removeProduct.run({ id })
}
