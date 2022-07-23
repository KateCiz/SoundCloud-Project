## Get all Songs

Returns all the songs.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /songs
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs":[
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

## Get all Songs created by the Current User

Returns all the songs created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /users/:userId/songs => /me/songs ???
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

## Get details of a Song from an id

Returns the details of a song specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /songs/:songId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": 1,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "previewImage": "image url",
      "Artist": {
        "id": 1,
        "username": "JohnSmith",
        "previewImage": "image url"
      },
      "Album": {
        "id": 1,
        "title": "Time",
        "previewImage": "image url"
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

## Create a Song for an Album based on the Album's id

Creates and returns a new song.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: POST
  * URL: /albums/:albumId/songs
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "imageUrl": "image url"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": 1,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36", 
      "previewImage": "image url"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Song title is required",
        "url": "Audio is required"
      }
    }
    ```

* Error response: Couldn't find an Album with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Album couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Song

Updates and returns an existing song.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: PUT
  * URL: /songs/:songId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "imageUrl": "image url"
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
      "albumId": 1,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00", 
      "previewImage": "image url"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Song title is required",
        "url": "Audio is required"
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

## Delete a Song

Deletes an existing song.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: DELETE
  * URL: /songs/:songId
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