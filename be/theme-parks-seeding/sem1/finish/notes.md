# Task 1

Make a table for the Owners.
It should have these columns:

- `owner_id` a serial primary key
- `owner_name` varchar, not null
- `pokedollars_earned` integer, not null

# Task 2

Make a table for the Pokemon.
It should have these columns:

- `pokemon_id` - a serial primary key
- `owner_id` - this will reference the `owners` table `owner_id` column
- `pokemon_name`
- `battles_won`

# Task 3

Fill the pokemon table using the data in the pokemon file.
