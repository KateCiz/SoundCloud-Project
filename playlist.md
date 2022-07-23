## Create a Playlist

Creates and returns a new playlist.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /playlists
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Current Favorites",
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
      "name": "Current Favorites",
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
        "name": "Playlist name is required"
      }
    }
    ```

## Add a Song to a Playlist based on the Playlists's id

Add a song to a playlist specified by the playlist's id.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: POST
  * URL: /playlists/:playlistId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "songId": 1
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
      "playlistId": 1,
      "songId": 1
    }
    ```

* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
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

## Get details of a Playlist from an id

Returns the details of a playlist specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /playlists/:playlistId
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
      "name": "Current Favorites",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "previewImage": "image url",
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

* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Playlist

Updates and returns an existing playlist.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: PUT
  * URL: /playlists/:playlistId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Current Favorites",
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
      "name": "Current Favorites",
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
        "name": "Playlist name is required"
      }
    }
    ```

* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Playlist

Deletes an existing playlist.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: DELETE
  * URL: /playlists/:playlistId
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

* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Playlists created by the Current User

Returns all the playlists created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /me/playlists
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Playlists":[
        {
          "id": 1,
          "userId": 1,
          "name": "Current Favorites",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

