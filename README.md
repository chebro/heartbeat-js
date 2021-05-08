# heartbeat.js

A webpage that shows the timestamp when I'd last used my computer. This project is a javascript spin-off of [l1ving/heartbeat](https://github.com/l1ving/heartbeat).

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

# Create auth token
AUTH='some secure token'
echo -n $AUTH > token

# Start the server
npm start
```

To test:

```
curl -X POST -H "Auth: $AUTH" localhost:8080
```

## TODO

- [x] Authorization for POST requests
- [x] Add tls certs
- [x] Add husky pre-commit hooks for auto formatting
- [ ] Update README
