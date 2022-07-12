kanboard board rough draft:

### Get the Current User
Return the information about the current logged in user.

- An authenticated user is needed for a success response
- Success response includes the user's id, firstName, lastName,
username, and email

### Log In a User
Log in a current user who has valid credentials and return the current user's
information.

- Success response includes the user's id, firstName, lastName,
username, email, and token?
- Error response has status 401 if invalid credentials are given
- Error response has status 400 if body validations for the email or password are violated

### Sign Up a New User
Create a new user, log them in as the current user, and return the current
user's information.

- New user exists in the database after request
- Success response includes newly created id, firstName, lastName,
username, email, and token?
- Error response has status 403 if the specified email already
exists
- Error response has status 403 if the specified username already
exists
- Error response has status 400 if body validations for the
username, email, firstName, or lastName are violated





### Get all Songs
Return all the songs.

- Seed data that exists for songs can be returned if in the database.
- Success response includes each song in the database.
- Return song data and include the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage


### Get all Songs created by the Current User
Return all the songs created by the current user.

- An authenticated user is needed for a success response
- Success response includes only songs created by the current user
- Return song data and include the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage



### Get details of a Song from an id
Return the details of a song specified by its id.

- Success response includes data only for the specified song
- Return song data and includes the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage
- Return associated data for Artist and include the id,
username, and previewImage
- Return associated data for Album and include the id,
title, and previewImage
- Error response has status 404 if a song does not exist with
the provided id


### Create a Song for an Album based on the Album's id
Create and return a new song.

- An authenticated user is needed for a success response
- Only the owner of the album is authorized to add a song
- New song exists in the database after request
- Return song data and include the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage
- Error response has status 400 if body validations for the
title or url are violated
- Error response has status 404 if an album does not exist with
the provided id


### Edit a Song
Update and return an existing song.

- An authenticated user is needed for a success response
- Only the owner of the song is authorized to edit it
- Song record is updated in the database after request
- Return song data and include the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage
- Error response has status 400 if body validations for the
title or url are violated
- Error response has status 404 if a song does not exist with
the provided id


### Delete a Song
Delete an existing song.

- An authenticated user is needed for a success response
- Only the owner of the song is authorized to delete it
- Song record is removed from the database after request
- Success response includes a message indicating a successful deletion
- Error response has status 404 if a song does not exist with
the provided id


### Get all Albums
Return all the albums.

- Return seed data for albums that exist in the database
- Success response includes each album in the database
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage


### Get all Albums created by the Current User
Return all the albums created by the current user.

- An authenticated user is needed for a success response
- Success response include only albums created by the current user
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage


### Get details of an Album from an id
Return the details of an album specified by its id.

- Success responses include data from only the specified album
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage
- Return associated data for Artist and include the id,
username, and previewImage
- Return associated data for Songs and include the id,
userId, albumId, title, description, url, createdAt, updatedAt,
and previewImage for each song
- Error response has status 404 if an album does not exist with
the provided id


### Create an Album
Create and return a new album.

- An authenticated user is needed for a success response
- New album exists in the database after request
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage
- Error response has status 400 if body validations for the
title are violated


### Edit an Album
Update and return an existing album.

- An authenticated user is needed for a success response
- Only the owner of the album is authorized to edit it
- Album record is updated in the database after request
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage
- Error response has status 400 if body validations for the
title are violated
- Error response has status 404 if an album does not exist with
the provided id


### Delete an Album
Delete an existing album.

- An authenticated user is needed for a success response
- Only the owner of the album is authorized to delete it
- Album record is removed from the database after request
- Success response includes a message indicating a successful deletion
- Error response has status 404 if an album does not exist with
the provided id


### Get all Comments by a Song's id
Return all the comments that belong to a song specified by id.

- Seed data exists in the database for comments to be returned.
- Success response includes only comments from the specified song
- Return comment data and include the id, userId, songId, body,
createdAt, and updatedAt
- Return associated data for User and include the id and
username
- Error response has status 404 if a song does not exist with
the provided id


### Create a Comment for a Song based on the Song's id
Create and return a new comment for a song specified by id.

- An authenticated user is needed for a success response
- New comment exists in the database after request
- Return comment data and include the id, userId, songId, body,
createdAt, and updatedAt
- Error response has status 400 if body validations for the
body are violated
- Error response has status 404 if a song does not exist with
the provided id


### Edit a Comment
Update and return an existing comment.

- An authenticated user is needed for a success response
- Only the owner of the comment is authorized to edit it
- Comment record is updated in the database after request
- Return comment data and include the id, userId, songId, body,
createdAt, and updatedAt
- Error response has status 400 if body validations for the
body are violated
- Error response has status 404 if a comment does not exist with
the provided id


### Delete a Comment
Delete an existing comment.

- An authenticated user is needed for a success response
- Only the owner of the comment is authorized to delete it
- Comment record is removed from the database after request
- Success response includes a message indicating a successful deletion
- Error response has status 404 if a comment does not exist with
the provided id


### Get details of an Artist from an id
Return the details of an artist specified by their id.

- Success response includes data only for the specified artist
- Return artist data and include the id, username, and previewImage
- Return aggregate data for totalSongs and totalAlbums
- Error response has status 404 if an artist does not exist with
the provided id


### Get all Songs of an Artist based on the Artist's id
Return all the songs created by the artist specified by id.

- Seed data exists in the database for songs to be returned.
- Success response includes only songs for the specified artist
- Return song data and include the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage for each
song
- Error response has status 404 if an artist does not exist with
the provided id


### Get all Albums of an Artist based on the Artist's id
Return all the albums created by the artist specified by id.

- Seed data exists in the database for albums to be returned.
- Success response include only albums from the specified artist
- Return album data and include the id, userId, title, description,
createdAt, updatedAt, and previewImage for each album
- Error response has status 404 if an artist does not exist with
the provided id


### Get all Playlists of an Artist based on the Artist's id
Return all the playlists created by the artist specified by id.

- Seed data exists in the database for playlists to be returned.
- Success response include only playlists from the specified artist
- Return playlist data and include the id, userId, name, createdAt,
updatedAt, and previewImage
- Error response has status 404 if an artist does not exist with
the provided id


### Create a Playlist
Create and returns a new playlist.

- An authenticated user is needed for a success response
- New playlist exists in the database after request
- Return playlist data and include the id, userId, name, createdAt,
updatedAt, and previewImage
- Error response has status 400 if body validations for the
name are violated


### Add a Song to a Playlist based on the Playlist's id
Add a song to a playlist specified by the playlist's id.

- An authenticated user is needed for a success response
- Only the owner of the playlist is authorized to add a song
- New PlaylistSong exists in the database after request
- Return PlaylistSong data and include the id, playlistId, and songId
- Error response has status 404 if a playlist does not exist
has the provided id
- Error response has status 404 if a song does not exist with
the provided id


### Get details of a Playlist from an id
Return the details of a playlist specified by its id.

- Success response includes data only for the specified playlist
- Playlist data returned includes the id, userId, name, createdAt,
updatedAt, and previewImage
- Return associated data for Songs and include the id,
userId, albumId, title, description, url, createdAt, updatedAt,
and previewImage
- Error response has status 404  if a playlist does not exist
has the provided id


### Edit a Playlist
Update and return an existing playlist.

- An authenticated user is needed for a success response
- Only the owner of the playlist is authorized to edit it
- Playlist record is updated in the database after request
- Return playlist data and include the id, userId, name, createdAt,
updatedAt, and previewImage
- Error response has status 400 if body validations for the
name are violated
- Error response has status 404 if a playlist does not exist with the provided id


### Delete a Playlist
Delete an existing playlist.

- An authenticated user is needed for a success response
- Only the owner of the playlist is authorized to delete it
- Playlist record is removed from the database after request
- Success response includes a message indicating a successful deletion
- Error response has status 404 if a playlist does not exist with the provided id


### Get all Playlists created by the Current User
Return all the playlists created by the current user.

- An authenticated user is needed for a success response
- Success response includes only playlists created by the current user
- Return playlist data and include the id, userId, name, createdAt,
updatedAt, and previewImage


### Add Query Filters to Get All Songs
Return songs filtered by query parameters.

- Query parameters are accepted for page, size, title, and createdAt
- Provide default values for the page and size query parameters
- Success response includes only songs in the database that meet the
specified query parameters criteria
- Return song data and includes the id, userId, albumId, title,
description, url, createdAt, updatedAt, and previewImage
- Success response includes the page and size of the returned payload
- Error response has status 400  if query parameter validations
for the page, size, or createdAt are violated
