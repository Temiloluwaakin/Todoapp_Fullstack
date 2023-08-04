CREATE DATABASE todoapp;

CREATE TABLE todos (
  todos_id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  notes VARCHAR(255),
  date VARCHAR(300)
);

CREATE TABLE todousers (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

CREATE TABLE todocomments (
  comments_id VARCHAR(255) PRIMARY KEY,
  todo_id VARCHAR(255) REFERENCES todos(todos_id),
  comment TEXT
);
