import { holograms, server } from '..'
import { sizeOf } from '../utils/convert'

describe('holograms', () => {
	it('returns a new HologramAPI interface', () => {
		expect(holograms).toBeTruthy()
		expect(holograms.createHologram).toBeTruthy()
	})
	it('can create and remove a new Hologram', () => {
		const location = findEmptySpace()
		expect(typeof location.x).toBe('number')
		const atStart = sizeOf(holograms.getHolograms())
		const h = holograms.createHologram({
			lines: ['Jasmine Unit Test', 'of', 'Holographic Displays'],
			location,
		})
		const now = sizeOf(holograms.getHolograms())
		expect(now).toBe(atStart + 1)
		// Clean-up
		h.delete()
		const final = sizeOf(holograms.getHolograms())
		expect(final).toBe(atStart)
	})
})

function findEmptySpace() {
	const location = server.getWorlds()[0].getSpawnLocation()
	location.setY(location.getY() + 4)

	while (
		location.getBlock().getType() != Java.type('org.bukkit.Material').AIR
	) {
		location.setY(location.getY() + 2)
	}
	return location
}
