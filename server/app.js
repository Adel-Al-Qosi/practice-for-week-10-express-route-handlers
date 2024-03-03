// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json())
app.use((req, res, next) => {
  console.log('Body: ', req.body)
  next()
})

app.get("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId
  const artist = getArtistByArtistId(artistId)
  res.status(200)
  res.json(artist)
})

app.put('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId
  const newInfo = req.body
  const editedArtist = editArtistByArtistId(artistId, newInfo)
  res.status(200)
  res.json(editedArtist)
})

app.patch('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId
  const newInfo = req.body
  const editedArtist = editArtistByArtistId(artistId, newInfo)
  res.status(200)
  res.json(editedArtist)
})

app.get('/artists/latest', (req, res) => {
  const latestArtist = getLatestArtist()
  res.status(200)
  res.send(latestArtist)
})

app.get('/artists', (req, res) => {
  const artists = getAllArtists()
  res.status(200)
  res.send(artists)
})

app.post('/artists', (req, res) => {
  const newData = addArtist(req.body)
  res.status(201)
  res.send(newData)
})

app.get('/artists/latest/albums', (req, res) => {
  const albums = getAlbumsForLatestArtist()
  res.send(albums)
})

app.delete('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId
  const artist = deleteArtistByArtistId(artistId)
  if (artist === undefined) {
    const message = {"message": "Successfully deleted"}
    res.status(200)
    res.json(message)
  }
})

app.get('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId
  const albums = getAlbumsByArtistId(artistId)
  res.status(200)
  res.json(albums)
})

app.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  const albumInfo = getAlbumByAlbumId(albumId)
  res.status(200)
  res.json(albumInfo)
})

app.post('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId
  const data = req.body

  const album = addAlbumByArtistId(artistId, data)
  res.status(201)
  res.json(album)
})

app.put('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  const data = req.body

  const editedAlbum = editAlbumByAlbumId(albumId, data)
  res.status(200)
  res.json(editedAlbum)
})

app.patch('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  const data = req.body

  const editedAlbum = editAlbumByAlbumId(albumId, data)
  res.status(200)
  res.json(editedAlbum)
})

app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId
  const deleted = deleteAlbumByAlbumId(albumId)

  if (deleted === undefined) {
    res.status(200)
    res.json({"message": "Successfully deleted"})
  }
})

app.get('/albums', (req, res) => {
  const startsWith = req.query.startsWith
  const filteredAlbums = getFilteredAlbums(startsWith)
  
  res.status(200)
  res.json(filteredAlbums)
})

app.get('/songs/:songId', (req, res) => {
  const songId = req.params.songId
  const song = getSongBySongId(songId)

  res.status(200)
  res.json(song)
})

app.post('/albums/:albumId/songs', (req, res) => {
  const albumId = req.params.albumId
  const data = req.body
  const createdSong = addSongByAlbumId(albumId, data)

  res.status(201)
  res.json(createdSong)
})

app.get('/artists/:artistId/songs', (req, res) => {
  const artistId = req.params.artistId
  const songs = getSongsByArtistId(artistId)

  res.status(200)
  res.json(songs)
})

app.get('/albums/:albumId/songs', (req, res) => {
  const albumId = req.params.albumId
  const songs = getSongsByAlbumId(albumId)

  res.status(200)
  res.json(songs)
})

app.put('/songs/:songId', (req, res) => {
  const songId = req.params.songId
  const data = req.body
  const song = editSongBySongId(songId, data)

  res.status(200)
  res.json(song)
})

app.patch('/songs/:songId', (req, res) => {
  const songId = req.params.songId
  const data = req.body
  const song = editSongBySongId(songId, data)

  res.status(200)
  res.json(song)
})

app.delete('/songs/:songId', (req, res) => {
  const songId = req.params.songId
  const song = deleteSongBySongId(songId)

  if (!song) {
    res.status(200)
    res.json({"message": "Successfully deleted"})
  }
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}