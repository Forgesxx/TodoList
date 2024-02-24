
## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Install dependencies:

    npm install

## Running locally

    npm start

## Running the tests

    npm test

## API description

```
POST /getAllItems 
Input: none
output: [ {...}, ...] 

POST /addItem
input: [ "<item text>", ] // must be only single item
output: 
    [ 
        {
            id: <new-item-id>,
        }, 
    ]
```
