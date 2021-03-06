import { fs } from '..'

const testDir = `./__test_dir__`
const testFile = testDir + '/test.txt'
const testContent = 'Test content'

describe('fs', () => {
	it('Can correctly detect the (non)-existence of a file', () => {
		expect(fs.exists('./')).toBe(true)
		expect(fs.exists('./absolutelyNoWayThisEvenExists')).toBe(false)
	})
	it('Can create, write, read, and remove files', () => {
		if (fs.exists(testDir)) {
			fs.remove(testDir)
		}
		expect(fs.exists(testDir)).toBe(false)
		fs.writeFile(testFile, testContent)
		expect(fs.exists(testFile)).toBe(true)
		const content = fs.readFile(testFile)
		// Note, fs.write adds a new-line to the file
		expect(content).toBe(testContent + '\n')
		// Clean-up
		fs.remove(testDir)
		expect(fs.exists(testDir)).toBe(false)
	})
	it('can copy an entire directory recursively', () => {
		if (fs.exists(testDir)) {
			fs.remove(testDir)
		}
		expect(fs.exists(testDir)).toBe(false)
		fs.writeFile(testFile, testContent)
		expect(fs.exists(testFile)).toBe(true)
		const destDir = testDir + '1'
		const destFile = destDir + '/test.txt'
		expect(fs.exists(destFile)).toBe(false)
		fs.copyDir(testDir, destDir)
		expect(fs.exists(destFile)).toBe(true)
		fs.remove(destDir)
		expect(fs.exists(destFile)).toBe(false)
	})
})
