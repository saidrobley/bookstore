// const { Client } = require('pg');
// const { DB } = require('./config');
const db = require('./db/index');

(async () => {
  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(100),      
      password        TEXT,
      firstName       VARCHAR(100),
      lastName        VARCHAR(50),
      address1        VARCHAR(100),
      address2        VARCHAR(100),
      date_joined     TIMESTAMP DEFAULT(now())
     
    );
  `;

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              INT              PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      name            VARCHAR(100)     NOT NULL,
      price           DECIMAL(10,2)    NOT NULL,
      description     VARCHAR(100)     NOT NULL,
      image_url       VARCHAR(100)     NOT NULL
    
    );
  `;

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      total           DECIMAL(10,2)   NOT NULL,
      status          VARCHAR(50)     NOT NULL,
      userId          INT             NOT NULL,
      created         DATE            NOT NULL,
      modified        DATE            NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
      
    );
  `;

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS orderItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      created         DATE            NOT NULL,
      qty             INT             NOT NULL,
      price           DECIMAL(10,2)   NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      orderId         INT             NOT NULL,
      productId       INT             NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `;

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      userId          INT             NOT NULL,
      created         TIMESTAMP       DEFAULT (now()),
      FOREIGN KEY (userId) REFERENCES users(id)
    
    );
  `;

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cartItems (
      id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      cartId          INT             NOT NULL,
      productId       INT             NOT NULL,
      qty             INT             DEFAULT 1,
      FOREIGN KEY (cartId) REFERENCES carts(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `;

  try {
    // const db = new Client({
    //   user: DB.PGUSER,
    //   host: DB.PGHOST,
    //   database: DB.PGDATABASE,
    //   password: DB.PGPASSWORD,
    //   port: DB.PGPORT,
    // });

    // await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    // await db.end();
  } catch (err) {
    console.log('ERROR CREATING ONE OR MORE TABLES: ', err);
  }
})();
