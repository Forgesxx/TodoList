
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

POST /setItem
input: 
    // array of items with new texts
    [ 
        {
            id: <item-id>,
            item: <new item text>
        },
        ....
    ]
output: 
    200 OK                    // if success, and if input is empty
    500 { error: <error>, }   // if fail

POST /deleteItem
input: 
    // array of items ids
    [ 
        <item-id>, ...
    ]
output: 
    200 OK                    // if success, and if input is empty
    500 { error: <error>, }   // if fail

```
