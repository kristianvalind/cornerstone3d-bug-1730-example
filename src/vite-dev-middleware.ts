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

function handleAnatomy(url: URL,
    req: http.IncomingMessage,
    res: http.ServerResponse,
) {
    const pathParts = url.pathname.split("/")
    switch (req.method) {
        case "POST": {
            const writeStream = fs.createWriteStream(path.join(...pathParts))
            req.pipe(writeStream)

            res.writeHead(200);
            break;
        }
        case "GET": {
            if (fs.existsSync(path.join(...pathParts))) {
                res.writeHead(200);
                res.write(fs.readFileSync(path.join(...pathParts)));
            } else {
                res.writeHead(404),
                    res.write("404")
            }
            break
        }
        default: {
            console.log(req.method)
        }
    }

    res.end();
}

function handleConfig(url: URL, res: http.ServerResponse) {
    const pathParts = url.pathname.split("/")
    res.writeHead(200);
    res.write(fs.readFileSync(path.join(...pathParts)));

    res.end();
}

function handleSegmentation(url: URL,
    req: http.IncomingMessage,
    res: http.ServerResponse,
) {
    const pathParts = url.pathname.split("/")
    switch (req.method) {
        case "POST": {
            const writeStream = fs.createWriteStream(path.join(...pathParts))
            req.pipe(writeStream)

            res.writeHead(200);
            break;
        }
        case "GET": {
            if (fs.existsSync(path.join(...pathParts))) {
                res.writeHead(200);
                res.write(fs.readFileSync(path.join(...pathParts)));
            } else {
                res.writeHead(404),
                    res.write("404")
            }
            break
        }
        default: {
            console.log(req.method)
        }
    }

    res.end();
}
