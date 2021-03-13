# Halcyon Server

- Get your twitch bot OAuth token password [over here](https://twitchapps.com/tmi/)
- Get your spotify auth refresh token by following the steps below.


-----

## Spotify Configuration
### Create a Spotify Application

* Create a [Spotify Application](https://developer.spotify.com/dashboard/applications)
* Put aside:
    * `Client ID`
    * `Client Secret`
* Click on **Edit Settings**
* In **Redirect URIs**:
    * Add `http://localhost/callback/`

## Get the Refresh Token

* Navigate to the following URL - be sure to replace SPOTIFY_CLIENT_ID with your actual client ID:

```
https://accounts.spotify.com/authorize?client_id=SPOTIFY_CLIENT_ID&response_type=code&scope=user-read-currently-playing,user-read-recently-played&redirect_uri=http://localhost/callback/
```

* After logging in, save the CODE portion of: `http://localhost/callback/?code=CODE`

* Create a string combining `SPOTIFY_CLIENT_ID:SPOTIFY_CLIENT_SECRET` (e.g. `5n7o4v35a3t7o5r2e3m1:5a8n7d3r43e2w5n8o2v3a7c5`) and encode into Base64. You can use [this tool](https://www.base64encode.org/).

* Then run a [curl command](https://httpie.org/run) in the below format. As always, make sure you replace the upper-case values with your actual values:
```sh
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic BASE64_HERE" -d "grant_type=authorization_code&redirect_uri=http://localhost/callback/&code=CODE_HERE" https://accounts.spotify.com/api/token
```

* Save the Refresh token to your env file. And probably elsewhere because its a pain in the ass to get.
