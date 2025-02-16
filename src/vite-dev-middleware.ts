import * as http from "node:http";
import * as fs from "node:fs"
import * as path from "node:path"

export const viteDevMiddleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
): boolean => {
    if (!req.url) {
        return false;
    }

    const url = new URL(req.url, "http://localhost:3127");

    if (url.pathname.startsWith("/dicom/")) {
        handleDICOM(url, res);
        return true;
    }

    return false
}

function handleDICOM(url: URL, res: http.ServerResponse) {
    const pathParts = url.pathname.split("/")
    res.writeHead(200);
    res.write(fs.readFileSync(path.join(...pathParts)));

    res.end();
}
