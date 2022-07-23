## Get all Albums

Returns all the Albums.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /albums
  * Body: none




## Get all Albums created by the Current User

Returns all the Albums created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /users/:userId/albums => /me/albums ???
  * Body: none

 

## Get details of an Album from an id

Returns the details of an album specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /albums/:albumId
  * Body: none


## Create an Album

Creates and returns a new album.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /albums
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Time",
      "description": "An album about time.",
      "imageUrl": "image url"
    }
    ```



## Edit an Album

Updates and returns an existing album.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: PUT
  * URL: /albums/:albumId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Time",
      "description": "An album about time.",
      "imageUrl": "image url"
    }
    ```


## Delete an Album

Deletes an existing album.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: DELETE
  * URL:  /albums/:albumId
  * Body: none
