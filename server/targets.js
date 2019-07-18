module.exports = [
    {
        "name": "dnsCheck",
        "period": 60000,
        "source": {
            "type": "dnsCheck",
            "location": "172.16.6.79"
        },
        "failureHook": {
            "type": "url",
            "location": "google.com"
        } 
    },
    {
        "name": "dnsCheckImp",
        "period": 60000,
        "source": {
            "type": "script",
            "location": "./samples/dnsCheck.sh 172.16.6.79"
        },
        "failureHook": {
            "type": "script",
            "location": "./samples/dnsCheckFailed.sh"
        } 
    }
]