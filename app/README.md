# Balance-Account
NG.CASH challenge

CREATE TABLE accounts (
  id serial PRIMARY KEY,
  balance  NUMERIC(12, 2) NOT NULL
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
  accountId INT NOT NULL,
  FOREIGN KEY (accountId)
    REFERENCES accounts (id)
);

CREATE TABLE transactions(
   id serial PRIMARY KEY,
   debitedAccountId INT,
   creditedAccountId INT,
   value NUMERIC(12, 2) NOT NULL,
   typeBalance VARCHAR ( 15 ) NOT NULL,
   createdAt TIMESTAMP NOT NULL,
   FOREIGN KEY (debitedAccountId)
    REFERENCES accounts (id),
   FOREIGN KEY (creditedAccountId)
    REFERENCES accounts (id)
);