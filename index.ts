import "reflect-metadata";
import { Event } from "./models/Event";
import express, { Express, Request, Response, json } from "express";
const app: Express = express();
const port: number = 3000;

app.use(json());

const events: Event[] = [];

// GET All Events.
app.get("/api/v1/events", (req: Request, res: Response) => {
  return res.status(200).json(events);
});

// GET One Event By ID.
app.get("/api/v1/events/:id", (req: Request, res: Response) => {
  const eventId: number = parseInt(req.params.id);
  const event = events.filter((e) => e.id === eventId);
  res.status(200).json(event);
});

app.post("/api/v1/events", (req: Request, res: Response) => {
  const eventName: string = req.body.name;
  const newEvent: Event = new Event(eventName);
  events.push(newEvent);
  return res.status(201).json(events);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
