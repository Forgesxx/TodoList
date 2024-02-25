## deploy on server

```
sudo apt-get install git

git clone <repo>

sudo apt-get install npm

cd nodejsServer/

sudo npm install

# Ensure that http traffic is allowed on server

cd /etc/systemd/system/

sudo touch forgesxx.service

sudo nano forgesxx.service

-----
[Unit]
Description=forgesxx service.

[Service]
Type=simple
ExecStart=/bin/bash /home/danil_korotenko/TodoList/updateAndStartServer.sh

[Install]
WantedBy=multi-user.target
----

chmod 644 forgesxx.service

systemctl enable forgesxx.service

systemctl start forgesxx.service


```
