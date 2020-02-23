import mongoose from 'mongoose';

class Database {
  constructor() {
    this.connnection = mongoose.connect(`${process.env.MONGO_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
}

export default new Database().connnection;
