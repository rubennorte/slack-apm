# Slack APM?

Slack command to display APM? (TV3 show) videos

## Slack integration

1. Go to `https://<your-team>.slack.com/apps/new/A0F82E8CA-slash-commands`
2. Choose the command (we recommend `apm`)
3. Configure the command:
```
URL: http://slack-apm.herokuapp.com/apm
Method: POST
```
4. Go to slack and type `/apm sa matao paco` in any chat

## Server setup

```
npm install
YOUTUBE_API_KEY=<your-api-key> PORT=8080 npm start
```

```
curl -X POST --data "text=sa matao paco" http://localhost:8080/apm
> {"response_type":"in_channel","text":"https://youtube.com/watch?v=RS_4HosMJuE"}
```
