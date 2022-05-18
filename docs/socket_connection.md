# WallE SocketIO Protocol Documentation

## Contents
* [Overall Architecture](#overall-architecture)
* [Protocol / Data Format](#data-format)
* [Mobile](#for-remote-mobile)
    - [Movement](#movement-commands)
    - [Obstacle Event](#obstacle-event)
    - [Position Data](#position-data)

## Overall Architecture
_<TODO>_

---

## Data Format
All data sent through the sockets are refered to as **Commands** and are emitted on the socketio **_message_** event. All commands are formatted as JSON strings and must have a base structure containing two properties `type` and `data` :
```json
{
    "type": number,
    "data": object
}
``` 
-   *type* : An integer denoting what type of command this is.
-   *data* : Any object containing data relevant to that command.
### Example
```json
{
    "type": 4,
    "data": {
        "movement": "left",
        "action": "start"
    }
}
```
---
## For Remote (Mobile)
For the remote client, for now any command can be sent but only the few listed below should be handle by the remote. 

### Sendable Commands
#### **Register Socket Client**
Once connected, the remote socket client needs to send a command to register itself as the remote controller of WallE. To do this, send the following command:
```json
{
    "type": 6,
    "data": {
        "role": "remote"
    }
}
```
---
#### **Movement Commands**
There are **4** movement commands to manually control WallE, these are `right`, `left`, `forward`, and `backward` commands. Along with each command, an `action` is stated, the action is either `start` or `stop`. 

Eg. `right` `start` Tells WallE to start turing right, and `right` `stop` Tells WallE to stop turning right.

##### Accepted Values
-   `movement` : [right, left, forward, backward]
-   `action` : [start, stop]
##### Example
```json 
{
    "type": 4,
    "data": {
       "movement": "right",
       "action": "start" 
    }
}
```
---
### Receivable Commands
#### **Obstacle Event**
Whenever WallE emits and Obstacle Event, once processed by the backend, this command will be pushed out to the remote
```json
{
    "type": 9,
    "data": {
        "documentId": string, // Id of the obstacle event document in database
        "label": string, // Label classification of the image
        "x": number, // X position of WallE when the event occurred
        "y": number, // Y position of WallE when the event occurred
        "imageUrl": string // URL of the obstacle image
    }
}
```

#### **Position Data**
Whenver WallE sends up position data, once processed by the backend, this command will be pushed out to the remote. 
```json
{
    "type": 11,
    "data": {
        "x": number, // X position on map
        "y": number, // Y position on map
        "mapId": string, // [Not yet available] Id of the active map/area
    }
}
```