import { PrismaClient } from "@/prisma/client"

export class Db extends PrismaClient {
    static instance;
    constructor() {
        if (!Db.instance) {
            Db.instance = new PrismaClient();
        }
        return Db.instance;
    }
}