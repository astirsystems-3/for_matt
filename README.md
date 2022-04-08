
## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up

or

./restart.sh

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


## Dev ReactClient with live reload on save--=> without server/db
``` 
navigate to boosterthon-ui/
npm install;npm run start 
```