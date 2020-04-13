import conn from './connection'

// USERS
conn.exec(`CREATE TABLE IF NOT EXISTS users (
    name VARCHAR PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_viewed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    credit_cents INTEGER NOT NULL DEFAULT 0
)`)

const queries = {
    insertUser: conn.prepare('INSERT INTO users (name) VALUES (:name)'),
    allUsers: conn.prepare('SELECT * FROM users ORDER BY last_viewed_date ASC'),
    removeUser: conn.prepare('DELETE FROM users WHERE name = :name'),
    getUser: conn.prepare('SELECT * FROM users WHERE name = :name'),
    modifyUserCredit: conn.prepare(`
        UPDATE users
        SET credit_cents = credit_cents + :change_cents
        WHERE name = :name
    `),
    updateLastViewedDate: conn.prepare(`
        UPDATE users
        SET last_viewed_date = CURRENT_TIMESTAMP
        WHERE name = :name
        `),
}

export function getUser(name) {
    const user = queries.getUser.get({ name })

    return user
}

export function getAllUsers() {
    return queries.allUsers.all()
}

const allowedUsers = /^[a-z0-9_]{1,15}$/

export function addUser(name) {
    if (!allowedUsers.test(name)) {
        throw new Error('name not allowed')
    }

    queries.insertUser.run({ name })
}

export function modifyUserCredit(name, change_cents) {
    return conn.transaction(() => {
        queries.modifyUserCredit.run({ name, change_cents })
        return queries.getUser.get({ name })
    })()
}

export function userAvailable(name) {
    if (!allowedUsers.test(name)) {
        return false
    } else {
        return queries.getUser.all({ name }).length == 0
    }
}

export function updateUsersLastViewedDate(name) {
    queries.updateLastViewedDate.run({ name })
}
