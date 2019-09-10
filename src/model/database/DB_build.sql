BEGIN;

DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS junction_plans_recipes CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS junction_recipes_ingredients CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  plan_name VARCHAR(200) NOT NULL,
  plan_days INTEGER NOT NULL
);

CREATE TABLE junction_plans_recipes (
  id SERIAL PRIMARY KEY,
  plan_id FOREIGN KEY NOT NULL,
  recipe_id FOREIGN KEY NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  recipe_name VARCHAR(50) NOT NULL UNIQUE,
  instructions TEXT NOT NULL,
  cooking_time INTEGER,
  health_score INTEGER
);

CREATE TABLE junction_recipes_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id FOREIGN KEY NOT NULL,
  ingredient_id FOREIGN KEY NOT NULL
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  ingredient_name VARCHAR(200) NOT NULL UNIQUE
);

INSERT INTO plans (plan_name, plan_days) VALUES
(
  'some plan name',
  'days integer'
),
  (
  'some plan name',
  'days integer'
);

INSERT INTO junction_plans_recipes (plan_id, recipe_id) VALUES
(
  'plan foreign key',
  'recipe foreign key'
),
(
  'plan foreign key',
  'recipe foreign key'
);

INSERT INTO recipes (recipe_name, instructions, cooking_time, health_score) VALUES
(
  'plan name',
  'cooking instruction',
  'cooking time integer',
  'health score integer'
),
(
  'plan name',
  'cooking instruction',
  'cooking time integer',
  'health score integer'
);

INSERT INTO junction_recipes_ingredients (recipe_id, ingredient_id) VALUES
(
  'recipe foreign key',
  'ingredient foreign key'
),
(
  'recipe foreign key',
  'ingredient foreign key'
);

INSERT INTO ingredients (ingredient_name) VALUES
(
  'ingredient name'
),
(
  'ingredient name'
);


COMMIT;
