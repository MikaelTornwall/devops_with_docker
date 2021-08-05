# Simple Node.js API

Simple Node.js API skeleton with MongoDB database.

## How to use

You can build and run the Docker container with the following two commands:

`docker build . -t simple-node-app`

`docker run -p 3001:3001 simple-node-app`

Notice, however, that to you must assign your own database url in a .env file for the API to work.