import { getAllPresets, updatePreset } from './db.js'
console.log(getPresets,updatePreset)


class Controls {
	constructor() {
		this.init()		
	}

	async init() {
		const presets = await getPresets()
		console.log(presets)
	}
}
