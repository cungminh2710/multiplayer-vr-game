# LoVR 
A Cross platform Browser-based VR Game

## Installation

- Install `Docker Community Edition` at https://www.docker.com/community-edition
- Open your favourite `Terminal` and change directory to our repo folder
	* Windows: *Powershell*
	* Linux/MacOS: *Any terminal*
- Let's build and develop our sweet game: `make build && make dev`
- Open your favourite browser and go to `http://localhost:2657` to see our game

- **NOTES**:
	* If you change update your code, the server will automatically detect and reload your amazing code. What you need to do is just to refresh your browser.

	* In case you think docker is confusing to work with, you can try installing Nodejs (https://nodejs.org) and MongoDB (https://www.mongodb.com/) manually
	```bash
	# Install app dependencies
	npm install -g --silent pm2 && npm install --production --silent
	# Install typescript tranpiller
	pm2 install typescript
	# Start our game and watch code changes
	pm2 start index.ts --watch
	```
	* Windows Instruction will be updated if anybody needs windows ...


## Deployment

To be continued

## Folder Structure
- `/rooms/`: Don't know
- `/static`: Static files including html templates, css and js files
- `Dockerfile`: Docker instruction to install a virtual ubuntu with nodejs + our game
- `docker-compose.prod.yml`: Docker-compose YAML instructions to run our game in production env
- `docker-compose.yml`: Docker-compose YAML instructions to run our game in env
- `index.ts`: Our Server Entry
- `Makefile`: Makefile commands (remember **COMP1927** ?)
- `package.json`: Our App dependencies info
- `README.md`: umm Readme
- `tsconfig.json`: Typescript config