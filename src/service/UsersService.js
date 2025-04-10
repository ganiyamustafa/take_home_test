const { Pool } = require('pg');
const { v4: uuidv4, validate } = require('uuid');
const bcrypt = require('bcrypt');

const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const { getUsersSerializer } = require('../serializer/user');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Invalid Credential');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Invalid Credential');
    }

    return id;
  }

  async checkEmailIfExist(username) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Email has used');
    }
  }

  async addUser({
    email, password, name
  }) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, email, hashedPassword, createdAt, updatedAt, name],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add user');
    }

    return result.rows[0].id;
  }

  async updateUser(id, {
    name
  }) {
    if (!validate(id)) {
      throw new InvariantError("ID must be uuid")
    }

    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE users SET name=$1, updated_at=$2 WHERE id=$3 RETURNING id',
      values: [name, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User Not Found');
    }

    return result.rows[0].id;
  }

  async deleteUser(id) {
    if (!validate(id)) {
      throw new InvariantError("ID must be uuid")
    }

    const query = {
      text: 'DELETE from users WHERE id=$1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User Not Found');
    }

    return result.rows[0].id;
  }

  async getUsers({ sort="asc", orderBy="created_at", page=1, limit=10 } = {}) {
    // for pagination
    const offset = (page - 1) * limit

    const query = {
      text: `SELECT id, email, name FROM users ORDER BY ${orderBy} ${sort} LIMIT $1 OFFSET $2`,
      values: [limit, offset],
    };

    const result = await this._pool.query(query);
    const total = (await this._pool.query("SELECT count(*) from users")).rows[0].count;

    return getUsersSerializer(result.rows, Number(page), Number(limit), Number(total))
  }

  async getUserByID(id) {
    if (!validate(id)) {
      throw new InvariantError("ID must be uuid")
    }

    const query = {
      text: 'SELECT id, email, name FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User Not Found');
    }

    return result.rows[0];
  }
}

module.exports = UsersService;
