# BoosterThon Demo Dockerized REST Server / mongo

## Access React Web Client
Open browser and go to http://localhost:6868

## TESTING SUITE
* next to file that is being tested make test file with same name as file being tested with suffix {filenameToTest}_test.js
* run 'npm test'

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down 
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```
