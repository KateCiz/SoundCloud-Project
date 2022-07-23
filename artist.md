## Get all Songs of an Artist from an id

Returns all the songs created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /artists/:artistId/songs
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

* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Albums of an Artist from an id

Returns all the albums created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /artists/:artistId/albums
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Albums": [
        {
          "id": 1,
          "userId": 1,
          "title": "Time",
          "description": "An album about time.",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "previewImage": "image url"
        }
      ]
    }
    ```

* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Playlists of an Artist from an id

Returns all the playlists created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /artists/:artistId/playlists
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Playlists": [
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

* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```
