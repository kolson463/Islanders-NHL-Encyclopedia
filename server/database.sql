CREATE DATABASE NHL-Encyclopedia;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
);

CREATE TABLE players(
    player_id PRIMARY KEY,
    player_fullName VARCHAR(255) NOT NULL,
    player_position VARCHAR(255) NOT NULL,
    player_team VARCHAR(255) NOT NULL,
    player_link VARCHAR(255) NOT NULL,
    player_shoots VARCHAR(255),
    player_age VARCHAR(255),
);