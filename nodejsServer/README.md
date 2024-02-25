
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
input: [ "<item text>", .... ] // array of items texts
output: 
    // array of new items 
    [ 
        {
            id: <item-id>,
            item: "item-text"
        }, 
        ....
    ]
if input is empty array:
    [  ]
then output is also empty array:
    [  ]
```
