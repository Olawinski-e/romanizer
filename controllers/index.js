const { romanize } = require('./../services')

const controller = async (req, res, next) => {
	const writeError = (res, errorMessage) => {
		res.write(`id: 0\n`)
		res.write(`data: ${JSON.stringify({ message: errorMessage})}\n\n`)
		res.end()
	}

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	})
	
	try {
		if (req.params.data) {	
			req.params.data=="logout" ? process.exit() : console.log(`Client still connected and asking to convert : ${req.params.data}`)
			if (req.params.data >= 1 && req.params.data <= 100) {
				//We're sending back the converted romanian number
				res.write(`event: result\n`);
				res.write(`data: ${JSON.stringify(romanize(req.params.data))}\n\n`);
				res.end();
			} else {
				return writeError(res, "The number has to be in 1-100 range")
			}
		} else {
			return writeError(res, "Undefined or has to be an integer")
		}
	} catch (error) {
		return writeError(res, "Error")
	}

};

module.exports = {
    controller
}