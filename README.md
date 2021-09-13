# fcs_orient_2021
a realtime app for fcs orienteering with chat.

## How to deploy with docker:
1. build client in ./client:
```bash
npm run build
```
2. Download docker and docker-compose
3. Go to the root folder and run:
```bash
sudo docker-compose up
```
4. Run "mongo_import.sh" in ./dataset by:
```bash
./dataset/mongo_import.sh
```
5. That's all it!
