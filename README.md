# heartbeat.js

A webpage that periodically updates the time I've used my computer, a digital heartbeat. This project is a javascript spin-off of [l1ving/heartbeat](https://github.com/l1ving/heartbeat).

To install:

```bash
git clone https://github.com/chebro/heartbeat.js
cd heartbeat.js
npm i
```

To run:

```bash
# Setup env vars
echo -e 'PORT=8080\nADDR=localhost' > .env

AUTH='some secure token'
# Create auth token
echo -n $AUTH > token

# Start the server
npm start
```

The website should be running on [localhost:8080](http://localhost:8080).

To test:

```
curl -X POST -H "Auth: $AUTH" localhost:8080
```

## TODO

- [x] Authorization for POST requests
- [ ] Add tls certs
- [ ] Add Husky pre-commit hooks for auto formatting
- [ ] Update README
