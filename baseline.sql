CREATE DATABASE IF NOT EXISTS healthi;

CREATE TABLE IF NOT EXISTS healthi.restaurant(
    rid         INT PRIMARY KEY,
    name        STRING,
    location    STRING
);

CREATE TABLE IF NOT EXISTS healthi.user (
    id              INT PRIMARY KEY,
    username        STRING UNIQUE,
    password        STRING,
    name            STRING,
    faveCuisine     STRING,
    dietRestriction STRING,
    dietGoals       STRING
);

CREATE TABLE IF NOT EXISTS healthi.foodItem (
    id                  INT PRIMARY KEY,
    name                STRING,
    description         STRING,
    rid                 INT REFERENCES healthi.restaurant( rid ),
    fatPercentage       FLOAT,
    proteinPercentage   FLOAT,
    carbPercentage      FLOAT,
    calories            FLOAT,
    sodium              FLOAT
);

