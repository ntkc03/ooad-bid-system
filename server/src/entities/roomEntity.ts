import { roomModel } from "../frameworks/database/mongoDb/models/roomModel";
import { roomInterface } from "../types/roomInterface";

export class roomEntity {
  private model: roomModel;

  constructor(model: roomModel) {
    this.model = model;
  }

  public async getRoomByCode(code: string): Promise<roomInterface | null> {
    const room = this.model.findOne({ code: code });
    return room;
  }

  public async getRoomByPhone(phone: string): Promise<roomInterface | null> {
    const room = this.model.findOne({ phone: phone });
    return room;
  }

  public async getRoomByAccount(email: string): Promise<roomInterface[] | null> {
    const rooms = await this.model.find({ 'participants.email': email });
    console.log(rooms);
    return rooms;
  }

  public async getRoomByProvider(email: string): Promise<roomInterface[] | null>{
    const rooms = await this.model.find({provider:email});
    return rooms
  }

  public async createRoom(room: roomInterface): Promise<roomInterface | null> {
    const newRoom = this.model.create(room);
    return newRoom;
  }

  public async getAllRoom(): Promise<roomInterface[] | null> {
    const allRooms = this.model.find();
    return allRooms;
  }

  public async deleteRoom(id: string): Promise<void> {
    const room = await this.model.findById(id);
    if (!room) throw new Error("room not found");
    await this.model.findByIdAndDelete(id);
  }

  public async updateRoom(
    id: string,
    updates: Partial<roomInterface>
  ): Promise<roomInterface | null> {
    const currentDetails = await this.model.findById(id);

    if (currentDetails) {
      Object.assign(currentDetails, updates);
      const updatedRoom = await currentDetails.save();
      return updatedRoom;
    }

    return null;
  }

  public async getRoomOngoing(time : Date):Promise<roomInterface[] | null>{
    const rooms: any = await this.model.findOne({time: time});
    return rooms;
  }

}