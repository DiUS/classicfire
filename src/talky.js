import AWS from 'aws-sdk'

AWS.config.region = 'us-east-1'
AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY

const polly = new AWS.Polly({apiVersion: '2016-06-10'})
const translate = new AWS.Translate({apiVersion: '2017-07-01'})

const getVoices = () => new Promise((resolve, reject) => {
  const params = {
    LanguageCode: 'es-ES'
  }
  return polly.describeVoices(params, (err, data) => {
    const voiceIds = data.Voices.map(v => v.Id)
    resolve(voiceIds)
  })
})

const doTranslate = (words) => new Promise((resolve, reject) => {
  const params = {
    SourceLanguageCode: 'en',
    TargetLanguageCode: 'es',
    Text: words
  }
  return translate.translateText(params, (err, data) => {
    if (err) {
      console.error('err', err)
    }
    return resolve(data.TranslatedText)
  })
})

export const talky = async (words) => {

  const translatedWords = await doTranslate(words)

  const voiceIds = await getVoices()

  const params = {
    OutputFormat: 'mp3',
    Text: translatedWords,
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
