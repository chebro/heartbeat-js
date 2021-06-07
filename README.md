# Heartbeat.js

A webpage that displays the most recent heartbeat (ping) received by the server (from a client).

```
├─ src    - express.js web app
└─ client - systemd timer modules for clients
```

Install heartbeat.js:

```bash
git clone https://github.com/chebro/heartbeat.js
cd heartbeat.js && npm ci
```

## Run (local)

```bash
# create and export auth token
AUTH='some secure token'; echo -e "AUTH=$AUTH" > .env

# start server
HOST=localhost PORT=8080 npm start

# send heartbeat
curl -X POST -H "Auth: $AUTH" localhost:8080
```

## Run (production)

```bash
TODO
```

## Environment variables

All env vars are stored in `.env`, the following is an example:

```bash
AUTH='some secure token'
HOST=localhost
PORT=8080
```
