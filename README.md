# Dideban

## Server
In order to run the server, follow these steps:
- Setup prereqs:
  - Node js
    - `apt-get install curl python-software-properties`
    - `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
- Rename `config.js.sample` to `config.js` and fill it with your own configs.
- Modify `targets.js` and define your services to be monitored. (Read the below section to see how)
- `npm install`
- `node index.js`

### Define Targets
