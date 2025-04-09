const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

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
    email, password
  }) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, email, hashedPassword, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add user');
    }

    return result.rows[0].id;
  }

  async updateUser(id, {
    password
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE users SET password=$1, updated_at=$2 WHERE id=$3 RETURNING id',
      values: [hashedPassword, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to update user');
    }

    return result.rows[0].id;
  }

  async deleteUser(id) {
    const query = {
      text: 'DELETE from users WHERE id=$1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to delete user');
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query('SELECT id, email FROM users');

    return result.rows;
  }
}

module.exports = UsersService;
