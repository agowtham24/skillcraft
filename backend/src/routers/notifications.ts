import { Router, Request, Response } from "express";
import { notificationSchema } from "../schemas/notifications";
import { userSchema } from "../schemas/users";
import seq from "../db";

export const notificationRouter = Router();

notificationRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({
      where: { id: req.body.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await notificationSchema.create(req.body);
    res.status(200).json({
      message: "Notification created",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

notificationRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const notifications = await notificationSchema.findAll({
      where: { userId: req.params.userId, status: 0 },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

notificationRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const notification = await notificationSchema.findOne({
      where: { id: req.params.id },
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    await notificationSchema.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
