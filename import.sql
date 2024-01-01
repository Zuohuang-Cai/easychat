DROP DATABASE IF EXISTS easychat;

CREATE DATABASE easychat;

USE easychat;

CREATE TABLE
    USERS (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(15) NOT NULL,
        img TEXT,
        accountage DATE,
        username VARCHAR(15) NOT NULL,
        password VARCHAR(15) NOT NULL,
        UNIQUE (username)
    );

CREATE TABLE friends (
    firstid INT NOT NULL,
    secondid INT NOT NULL,
    FOREIGN KEY (firstid) REFERENCES USERS (id),
    FOREIGN KEY (secondid) REFERENCES USERS (id),
    CONSTRAINT UFriendsShip UNIQUE (firstid, secondid)
);
