import AWS from 'aws-sdk'

export const talky = words => {
  AWS.config.region = 'ap-southeast-2'
  AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
  AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY

  const polly = new AWS.Polly({apiVersion: '2016-06-10'})

  const params = {
      OutputFormat: 'mp3',
      Text: words,
      VoiceId: 'Joanna',
      SampleRate: '22050',
      TextType: 'text'
  }

  polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        const uInt8Array = new Uint8Array(data.AudioStream)
        const arrayBuffer = uInt8Array.buffer
        const blob = new Blob([arrayBuffer])
        const url = URL.createObjectURL(blob)

        const audioElement = document.createElement('audio')
        audioElement.src = url
        audioElement.play()
      }
  })
}
