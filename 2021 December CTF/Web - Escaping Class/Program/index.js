
const express = require('express');
const Docker = require('dockerode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || "8000";
const docker = new Docker();

app.use(express.json());
app.post("/compiler", (req, res) => {
    const code = req.body.code;
    const fileName = crypto.randomBytes(12).toString("base64url")

    fs.writeFileSync(`./codes/${fileName}`, code);

    let container;
    docker.createContainer({
        Image: 'escaping-class-compiler',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        OpenStdin: false,
        StdinOnce: false,
        HostConfig: {
            CpuQuota: 10000,
            Ulimits: [{ Name: "nofile", Hard: 1024, Soft: 512 }, { Name: "nproc", Hard: 1024, Soft: 512 }],
            Binds: [`${__dirname}/codes/${fileName}:/app/code`]
        }
    }).then((c) => {
        container = c;
        let t = setTimeout(() => {
            try {
                container.remove({ force: true });
                res.end("        Execution timed out");
            } catch {}
        }, 6000);
        container.attach({ stream: true, stdout: true, stderr: true }, (err, str) => {
            let data = "";
            str.on('data', (d) => data += d);
            str.on('end', () => {
                res.end(data.toString());
                fs.rmSync(`codes/${fileName}`);
                clearTimeout(t);
                return container.remove();
            });
        });
        return container.start();
    });
});

app.use(express.static(path.join(__dirname, "/static/build")));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "/static/build/index.html"));
})
app.listen(PORT);