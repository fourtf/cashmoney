import conn from './connection'

// PRODUCTS
conn.exec('DROP TABLE IF EXISTS products')
conn.exec(`CREATE TABLE products (
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
    removeProduct: conn.prepare('DELETE FROM products WHERE id = :id'),
}

try {
    queries.insertProduct.run({ name: `Mate`, price_cents: 100 })
    queries.insertProduct.run({ name: `Pizza`, price_cents: 260 })
} catch (e) {
    console.error(e)
}

// Exported wrapper
export function getAllProducts() {
    return queries.allProducts.all()
}
