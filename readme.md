example request : 
curl -X POST -H "Content-Type: application/json" -d "{\"query\": \"query { getArtists { ArtistId Name } }\"}" http://localhost:8000/graphql