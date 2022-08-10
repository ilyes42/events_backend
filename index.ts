import "dotenv/config";
import "reflect-metadata";
import { Event } from "./entities/Event";
import { DataSource } from "typeorm";
import express, { Express, Request, Response, json } from "express";
const app: Express = express();
const port: number = 3000;

app.use(json());

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.db_host,
  port: process.env.db_port as unknown as number,
  username: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  entities: [Event],
  synchronize: true,
  logging: false,
});

// GET All Events.
app.get("/api/v1/events", async (req: Request, res: Response) => {
  const allEvents = await AppDataSource.manager.find(Event);
  return res.status(200).json(allEvents);
});

// GET One Event By ID.
app.get("/api/v1/events/:id", async (req: Request, res: Response) => {
  const eventId: number = parseInt(req.params.id);
  const foundEvent = await AppDataSource.manager.findOneBy(Event, {
    id: eventId,
  });
  return res.status(201).json(foundEvent);
});

// POST new event.
app.post("/api/v1/events", async (req: Request, res: Response) => {
  const eventName: string = req.body.name;
  const newEvent: Event = new Event(eventName);
  await AppDataSource.manager.save<Event>(newEvent);
  const allEevents = await AppDataSource.manager.find(Event);
  return res.status(201).json(allEevents);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful ! Yeah baby !");
    app.listen(port, () => {
      console.log(`Server successfully listening on port ${port} ! Oh yeah !`);
    });
  })
  .catch((error) => console.log(error));
