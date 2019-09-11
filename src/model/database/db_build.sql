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

INSERT INTO plans (id, plan_name, plan_days) VALUES
( 0,
  'Franny cuisine',
  2
),
  (1,
  'Vic le chef',
  3
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  recipe_name VARCHAR(50) NOT NULL UNIQUE,
  instructions TEXT NOT NULL,
  cooking_time INTEGER,
  health_score INTEGER
);

INSERT INTO recipes (id, recipe_name, instructions, cooking_time, health_score) VALUES
( 0,
  'Easy Shrimp Risotto',
  'Preheat the oven to 350 degrees.Place rice and 4 cups of the simmering stock in a Dutch oven, such as Le Creuset. Cover and bake for 40 minutes, until most of the liquid is absorbed and the rice is al dente. Remove from the oven and stir in the shrimp and spinach. Return to the oven and cook for 5 minutes, until the shrimp are pink and the spinach is wilted.Remove from the oven and add the remaining cup of chicken stock, the Parmesan, goat cheese, wine, olive oil, salt and pepper. Stir vigorously until the rice is thick and creamy, 2 to 3 minutes. Add the peas and stir until they are heated through. Serve immediately',
  70,
  24
),
( 1,
  'Risotto with Snow Peas and Shrimp',
  'Bring clam juice and water to a simmer in a medium saucepan (do not boil). Keep warm over low heat. Heat oil in a large saucepan over medium heat; add shallots, and cook 1 minute. Add rice; cook 1 minute, stirring constantly. Stir in wine; cook 1 minute. Stir in 1/2 cup juice mixture; cook 2 minutes or until liquid is nearly absorbed, stirring constantly. Add remaining juice mixture, 1/2 cup at a time, stirring constantly until each portion of juice mixture is absorbed before adding the next (about 20 minutes total). Stir in shrimp, snow peas, and green peas; cook 4 minutes or until shrimp are done, stirring constantly. Remove from heat; stir in cheese and remaining ingredients. Note: Substitute frozen green peas for fresh, if desired',
  65,
  27
),
( 2,
  'Shrimp Risotto with Baby Spinach and Basil',
 'Bring 6 cups broth to simmer in medium saucepan. Add shrimp. Turn off heat, cover, and let stand until shrimp are just opaque in center, about 3 minutes. Using slotted spoon, transfer shrimp to small bowl; cover with foil to keep warm. Cover broth to keep warm. Heat oil in heavy large saucepan over medium heat. Add chopped onion and sauté until tender, about 5 minutes. Add minced garlic and stir 1 minute. Add rice and stir until edge of rice is translucent but center is still opaque, about 2 minutes. Add wine and cook until wine is absorbed, stirring occasionally, about 2 minutes. Add 3/4 cup chicken broth. Simmer until almost all broth is absorbed, stirring often, about 2 minutes. Continue to add broth, 3/4 cup at a time, until rice is just tender and mixture is creamy, stirring often and allowing almost all broth to be absorbed after each addition, about 25 minutes total. During last 5 minutes, add spinach in 4 batches, stirring and allowing spinach to wilt after each addition. Mix in shrimp, 1/2 cup Parmesan cheese, and basil. Season risotto to taste with salt and pepper. Spoon risotto into shallow bowls and serve, passing additional cheese separately',
 45,
 40);


CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  ingredient_name VARCHAR(200) NOT NULL UNIQUE
);

INSERT INTO ingredients (ingredient_name) VALUES
(
  'arborio rice'
),
(
  'chicken stock'
),
(
  'dry white wine'
),
(
  'goat cheese'
),
(
  'olive oil'
),
(
  'parmesan cheese'
),
(
  'peas'
),
(
  'pepper'
),
(
  'salt'
),
(
  'shrimp'
),
(
  'spinach'
),
(
  'black pepper'
),
(
  'clam juice'
),
(
  'green peas'
),
(
  'lemon rind'
),
(
  'shallots'
),
(
  'snow peas'
),
(
  'water'
),
(
  'or'
),
(
  'baby spinach leaves'
),
(
  'fresh basil'
),
(
  'garlic cloves'
),
(
  'low-salt chicken broth'
),
(
  'onion'
)

;

CREATE TABLE junction_plans_recipes (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER references plans(id) NOT NULL,
  recipe_id INTEGER references recipes(id) NOT NULL
);

CREATE TABLE junction_recipes_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER references recipes(id) NOT NULL,
  ingredient_id INTEGER references ingredients(id) NOT NULL
);

INSERT INTO junction_plans_recipes (plan_id, recipe_id) VALUES

(0, 0), (0, 1), 
(1, 1), (1, 0), (1, 2)
;

INSERT INTO junction_recipes_ingredients (recipe_id, ingredient_id) VALUES

(0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11), 
(1, 1), (1, 3), (1, 5), (1, 6), (1, 10), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), 
(2, 1), (2, 3), (2, 5), (2, 6), (2, 10), (2, 17), (2, 20), (2, 21), (2, 22), (2, 2)
;




COMMIT;
