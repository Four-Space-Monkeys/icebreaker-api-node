# to seed your local database for testing

1. create your .env file [(if you're having trouble setting up the db connection look here)](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres)
2. ```npm install```
3. ```npx prisma generate```
4. ```npx prisma migrate dev```
5. ```npm run dev``` to start the server :)

# endpoints

## get /interests

returns all stored interests (alphabetically sorted) as:

```
[
  {
    "id": 1,
    "name": "cooking",
  },
  ...
]
```

## post /users

adds a new user to the database

request body should include:

```
{
  "stytchId": "stytch_id_string",
  "firstName": "Cornelius",
  "lasttName": "Renken",
  "interestIds": [1, 3], // array of selected interest ids
}
```

## get /users/:stytchId

fetches the user data from the database given their stytch string id

returns user object as:

```
{
  "id": 1,
  "firstName": "Cornelius",
  "lastName": "Renken",
  "interests": [ // (alphabetically sorted)
    {
      "id": 3,
      "name": "Aerospace"
    },
    {
      "id": 1,
      "name": "Cooking"
    }
  ]
}
```
