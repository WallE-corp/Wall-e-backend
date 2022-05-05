
### Docker

# Installation

Install docker:
    https://www.docker.com/products/docker-desktop/

# Starting and Stopping Docker

build the docker container:
    
    $ docker-compose up --build

Run all containers:
    
    $ docker-compose up

Stop all containers with:
    
    $ docker-compose down

### AWS Lightsail dev server

For development testing without running locally, connect to development server running on AWS Lightsail at:
    `13.49.160.252:3000`

## Testing
Because of issues with Docker and firebase emulator, testing should be done outside the Docker container.
Testing also requires that the firebase emulators are up and running.

### To run tests:
    $ cd backend
    $ npm test
    

## Firebase development targets
### Live
When targeting the live firebase make sure to include the necessary credentials files in the `data_access_layer`.
### Emulator
For now, targeting the emulator does not work when running with docker. 

#### Requirements
*   Java
*   Node

Firebase emulators are really useful for testing and prototyping. Once they are running you can access their UI at `localhost:4000`. The firebase emulators are developed by google themselves and are not thirdparty.
#### How to setup
1.  Install the npm package `firebase-tools`
    ```bash
    $ npm install -g firebase-tools
    ```
2.  (From root) Enter the `firebase_emulator_suite` folder and start the emulators
    ```bash
    $ cd firebase_emulator_suite
    $ firebase --project=<insert projectId> emulators:start
    ```
    -   This step may require you to login. If the terminal does not prompt you automatically then run:
        ```bash
        $ firebase login
        ```
        You'll only need to do this once
3.  Ensure you've read about the environment variables below and start the backend app.
## Environmental variables
* **FIREBASE_TARGET**
    
    Which firebase target the app should connect to

    Accepted values: `emulator`, `live`

    * `live`: Target the live firestore database
    * `emulator`: Target the local running firebase emulator 

* **FIREBASE_PROJECT_ID**

    ID of the firebase project (Both for emulator and live)

    Should be left unchanged from `walle-<...>`. Ask Du Won for project Id

* **GCLOUD_PROJECT**

    Should be same as __FIREBASE_PROJECT_ID__ variable.

* **FIRESTORE_EMULATOR_HOST**
    -*INCLUDE ONLY IF RUNNING EMULATOR*

    The address of the local firestore emulator

* **FIREBASE_STORAGE_EMULATOR_HOST**
    -*INCLUDE ONLY IF RUNNING EMULATOR*

    The address of the local cloud storage emulator

