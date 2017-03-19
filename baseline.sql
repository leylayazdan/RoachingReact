CREATE DATABASE IF NOT EXISTS healthi;

CREATE TABLE IF NOT EXISTS healthi.restaurant(
    rid         STRING PRIMARY KEY,
    name        STRING,
    location    STRING
);

CREATE TABLE IF NOT EXISTS healthi.user (
    id              STRING PRIMARY KEY,
    username        STRING UNIQUE,
    password        STRING,
    name            STRING,
    dietRestriction STRING,
    dietGoals       STRING
);

CREATE TABLE IF NOT EXISTS healthi.foodItem (
    id                  STRING PRIMARY KEY,
    name                STRING,
    description         STRING,
    rid                 STRING REFERENCES healthi.restaurant( rid ),
    fatGram             FLOAT,
    proteinGram         FLOAT,
    carbGram            FLOAT,
    calories            FLOAT,
    sodium              FLOAT,
    dietRestriction     STRING
);

