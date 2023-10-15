import '../css/styles.css'

import './db'
import { PocketSynth } from './synth'
import { Pad } from './pad'
import { Controls } from './controls'

const pocketSynth = new PocketSynth()

new Pad(
  data => pocketSynth.triggerAttack(data),
  () => pocketSynth.triggerRelease(),
  data => pocketSynth.moveNote(data),
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service worker registered!'))
    .catch(err => console.log('Err registering Service worker', err))
}
