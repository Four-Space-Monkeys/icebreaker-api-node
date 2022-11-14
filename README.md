# to seed your local database for testing

1. create your .env file [(if you're having trouble setting up the db connection look here)](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres)
2. npm run seed

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

passing stytch string id in url

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
