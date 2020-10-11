import conn from './connection'
import { getUser } from './users'
import { getProduct } from './products'

// USERS
conn.exec(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR,
    amount_cents INTEGER NOT NULL DEFAULT 100,
    name VARCHAR DEFAULT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const queries = {
    insertTransaction: conn.prepare(`INSERT INTO transactions
        (amount_cents, user_id, name)
        VALUES (:amount_cents, :user_id, :name)`),
    recentTransactionsOfUser: conn.prepare(
        'SELECT * FROM transactions WHERE user_id = :user_id ORDER BY date DESC LIMIT :limit'
    ),
    removeTransaction: conn.prepare('DELETE FROM transactions WHERE id = :id'),
}

export function insertTransaction(
    amount_cents,
    user_id,
    product_id /* optional */
) {
    let name = null
    if (product_id) name = getProduct(product_id).name
    queries.insertTransaction.run({
        amount_cents,
        user_id,
        name,
    })
    return getUser(user_id)
}

export function removeTransaction(id) {
    queries.removeTransaction.run({ id })
}

export function getRecentTransactionsOfUser(user_id, limit) {
    return queries.recentTransactionsOfUser.all({ user_id, limit })
}
