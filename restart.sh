#!/bin/bash

docker-compose down -v --remove-orphans --rmi all;docker-compose build; docker-compose up
