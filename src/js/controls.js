import '../css/controls.css'
import { getAllPresets, updatePreset } from "./db"

export class Controls {
	activeIdx = 0
	
	constructor(synth) {
		this.init()		
		this.synth = synth
	}

	async init() {
		this.presets = await getAllPresets()
		console.log(this.presets)
		
		this.typeEl = document.querySelector('[name="type"]')
		this.harmonicityEl = document.querySelector('[name="harmonicity"]')

		console.log(this.typeEl, this.harmonicityEl)

		this.typeEl.value = this.presets[this.activeIdx]?.type
		this.harmonicityEl.value = this.presets[this.activeIdx]?.harmonicity

		this.typeEl.addEventListener('change', async (e) => {
			await updatePreset({
				...this.presets[this.activeIdx],
				type: e.target.value
			})
			this.synth.type= e.target.value
		})
	}
}
