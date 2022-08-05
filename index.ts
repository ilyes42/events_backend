import "reflect-metadata";
import { Event } from "./entities/Event";
import { DataSource } from "typeorm";
import express, { Express, Request, Response, json } from "express";
const app: Express = express();
const port: number = 3000;

app.use(json());

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "p@ssw0rd",
  database: "events-app-db",
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
// app.get("/api/v1/events/:id", (req: Request, res: Response) => {
//   const eventId: number = parseInt(req.params.id);
//   const event = events.filter((e) => e.id === eventId);
//   res.status(200).json(event);
// });

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
