# EffortLoggerV2-server

Server mirror repository for sverma89asu/EffortLoggerV2.
Unencrypted, unhashed password storage because that was deemed easier than managing password hash+salt, and there was no _real_ security need. Same thing with the Bearer token based authentication. It was set up so that security _could_ be implemented, but due to time concerns and the lack of need (this is for a class), it was not properly implemented.

## Installation

`git clone` the repository.

## Usage

1. Change directory to repository root.
2. `pnpm i`, then `node index.js`
3. Edit `prisma/stores.sqlite` to include rows in the User table
4. Restart Node.js runtime on `index.js`.
5. Expose port 8180, or use a reverse proxy to expose it to the wider world.
6. [Optional] Daemonize node process, or use PM2 or other process manager to keep server alive. (Or you could Dockerize it if you're crazy).

## Requirements

- PNpM ^8.7.0
- Node.js ^20.5.0

## License

See LICENSE file.
