import conn from './connection'

// USERS
conn.exec(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR,
    amount_cents INTEGER NOT NULL DEFAULT 100,
    product_id INTEGER DEFAULT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const queries = {
    insertTransaction: conn.prepare(`INSERT INTO transactions
        (amount_cents, user_id, product_id)
        VALUES (:amount_cents, :user_id, :product_id)`),
    recentTransactionsOfUser: conn.prepare(
        'SELECT * FROM transactions WHERE user_id = :user_id ORDER BY date ASC LIMIT :limit'
    ),
    removeTransaction: conn.prepare('DELETE FROM transactions WHERE id = :id'),
}

export function insertTransaction(
    amount_cents,
    user_id,
    product_id /* optional */
) {
    queries.insertTransaction.run({ amount_cents, user_id, product_id })
}

export function removeTransaction(id) {
    queries.removeTransaction.run({ id })
}

export function getRecentTransactions(user_id) {
    return queries.getUser.all({ user_id }).length == 0
}
