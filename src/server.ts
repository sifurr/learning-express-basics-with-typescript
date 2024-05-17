import { Server } from 'https';
import app from './app'
const PORT = 5000;


let server: Server;

async function bootstrap() {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    })
}

bootstrap();