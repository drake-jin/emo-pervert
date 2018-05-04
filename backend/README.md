# Reward Backend

# Usage dependency

1. docker & docker-compose
2. pm2
3. serverless & sls

# Usage development mode

>  NODE_ENV=dev

``` bash
# First step to build
$ docker-compose up --build -d
$ yarn dev:init

# Second Step to start
$ yarn dev:start

# Finally, Refresh all data.
$ yarn dev:reset && yarn dev:init

```

# Usage staging mode

>  NODE_ENV=stg

``` bash
$ yarn stg:deploy
```

# Usage production mode

>  NODE_ENV=prod

``` bash
$ yarn prod:deploy
```