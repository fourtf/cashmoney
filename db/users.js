import conn from './connection'
import {
    usersTable as table,
    migrateUsersToUsers2,
    createUsersTable,
} from './user_migrations'

createUsersTable()
migrateUsersToUsers2()

const queries = {
    insertUser: conn.prepare(`INSERT INTO ${table} (name) VALUES (:name)`),
    allUsers: conn.prepare(
        `SELECT * FROM ${table} ORDER BY last_viewed_date ASC`
    ),
    removeUser: conn.prepare(`DELETE FROM ${table} WHERE id = :id`),
    getUser: conn.prepare(`SELECT * FROM ${table} WHERE id = :id`),
    getUserByName: conn.prepare(`SELECT * FROM ${table} WHERE name = :name`),
    modifyUserCredit: conn.prepare(`
        UPDATE ${table}
        SET credit_cents = credit_cents + :change_cents
        WHERE id = :id
    `),
    updateLastViewedDate: conn.prepare(`
        UPDATE ${table}
        SET last_viewed_date = CURRENT_TIMESTAMP
        WHERE id = :id
        `),
}

export function getUser(id) {
    const user = queries.getUser.get({ id })

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

    conn.transaction(() => {
        if (queries.getUserByName.get({ name }) == undefined) {
            queries.insertUser.run({ name })
        } else {
            throw new Error('Name already exists')
        }
    })()
}

export function modifyUserCredit(id, change_cents) {
    return conn.transaction(() => {
        queries.modifyUserCredit.run({ id, change_cents })
        return queries.getUser.get({ id })
    })()
}

export function userAvailable(name) {
    if (!allowedUsers.test(name)) {
        return false
    } else {
        return queries.getUserByName.all({ name }).length == 0
    }
}

export function updateUsersLastViewedDate(id) {
    queries.updateLastViewedDate.run({ id })
}
