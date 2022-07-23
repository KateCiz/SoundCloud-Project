## Get all Comments by a Song's id

Returns all the comments that belong to a song specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /songs/:songId/comments
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Comments": [
        {
          "id": 1,
          "userId": 1,
          "songId": 1,
          "body": "I love this song!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "username": "JohnSmith"
          },
        }
      ]
    }
    ```

* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Comment for a Song based on the Song's id

Create and return a new comment for a song specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /songs/:songId/comments
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "I love this song!"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "songId": 1,
      "body": "I love this song!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Comment body text is required"
      }
    }
    ```

* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Comment

Update and return an existing comment.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: PUT
  * URL: /comments/:commentId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "I love this song!"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "songId": 1,
      "body": "I love this song!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Comment body text is required",
      }
    }
    ```

* Error response: Couldn't find a Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Comment

Delete an existing comment.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: DELETE
  * URL: /comments/:commentId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200 
    }
    ```

* Error response: Couldn't find a Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```

