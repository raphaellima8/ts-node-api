# TypeScript API

## Getting started
Clone this repo:
```
git clone https://github.com/raphaellima8/ts-node-api.git && cd ts-node-api
```

Install dependencies:
```
npm i
```

Populate MongoDB
```
mongoimport --db mmartan --collection products --file seed.json --jsonArray
```

Duplicate `.env.sample`, fill the copy (if you do not want use default values) and rename it to `.env`

Run server in dev mode
```
npm start:dev
```

License MIT
