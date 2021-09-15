# fcs_orient_2021

a realtime app for fcs orienteering with chat.

## How to deploy with docker:

build client in ./client if you need:

```bash
npm run build
```

1. Download docker and docker-compose
2. Go to the root folder and run:

```bash
sudo docker-compose up -d
```

3. Initialize and import data to db with "mongo_import.sh" in ./dataset:

```bash
./dataset/mongo_import.sh 27018
```

4. That's all it!
