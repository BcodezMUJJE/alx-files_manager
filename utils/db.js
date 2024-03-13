import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */

class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Tis retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * This retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * This retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * This retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
