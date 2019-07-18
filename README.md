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
In the `targets.js` file there is a list of targets to get monitored.  
Each target has a schema like below:
```js
{
  "name": "dnsCheckImp", // Custom unique name to identify this target
  "period": 5000, // check inerval
  "source": { // The service to get monitored.
      "type": "script", // can be "script", "url", "dnsCheck"
      "location": "./samples/dnsCheck.sh 172.16.6.79"
  },
  "failureHook": { // The hook to get triggered when the service goes down.
      "type": "script",
      "location": "./samples/dnsCheckFailed.sh"
  } 
}
```
### Source types
- "script": Runs the provided script.
- "dnsCheck": Checks the provided dns. (location field is considered as dns address)
- "url": curls a the provided url.
