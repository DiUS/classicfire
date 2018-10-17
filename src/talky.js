import AWS from 'aws-sdk'

AWS.config.region = 'ap-southeast-2'
AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY

const polly = new AWS.Polly({apiVersion: '2016-06-10'})

const getVoices = () => new Promise((resolve, reject) => {
  const params = {
    LanguageCode: 'es-ES'
  }
  return polly.describeVoices(params, (err, data) => {
    const voiceIds = data.Voices.map(v => v.Id)
    resolve(voiceIds)
  })
})

export const talky = async (words) => {

  const voiceIds = await getVoices()

  const params = {
    OutputFormat: 'mp3',
    Text: words,
    VoiceId: voiceIds[0],
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
