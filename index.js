import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data =fs.readFileSync("./db.json");
    return JSON.parse(data);
    } catch(error){
        console.log(error)
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch(error){
        console.log(error)
    }
};



app.get("/players", (req, res) => {
    const data = readData();
    res.json(data.players);
});

app.get("/players/:id", (req, res) =>{
    const data = readData();
    const id =parseInt(req.params.id);
    const player = data.players.find((player) => player.id === id);
    res.json(player)
});

app.post("/players", (req,res) => {
    const data = readData();
    const body = req.body;
    const newPlayer = {
        id: data.players.length + 1,
        ...body,
    };
    data.players.push(newPlayer);
    writeData(data);
    res.json(newPlayer)
});

app.put("/players/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id =parseInt(req.params.id);
    const playerIndex = data.players.findIndex((player) => player.id === id);
    data.players[playerIndex] = {
        ...data.players[playerIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "player update successfully"});
});

app.delete("/players/:id", (req,res) => {
    const data = readData();
    const id =parseInt(req.params.id);
    const playerIndex = data.players.findIndex((player) => player.id === id);
    data.players.splice(playerIndex, 1);
    writeData(data);
    res.json({ message: "player deleted"});
});

app.listen(3000, ()=> {
    console.log('serverlistening on port 3000');
});