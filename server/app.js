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

app.get('/artists', (req, res) => {
  const allArtists = getAllArtists()
  res.send(allArtists)
})

app.post('/artists', (req, res) => {
  const newData = addArtist(req.body)
  res.send(newData)
})

app.get('/artists/latest', (req, res) => {
  const latestArtist = getLatestArtist()
  res.send(latestArtist)
})

app.get('/artists/latest/albums', (req, res) => {
  const albums = getAlbumsForLatestArtist()
  res.send(albums)
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}