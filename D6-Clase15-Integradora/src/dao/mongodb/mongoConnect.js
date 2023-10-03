import mongoose from 'mongoose';
import 'dotenv/config';
import colors from 'colors';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a la base de datos:', error);
});

db.once('open', () => {
  const dbName = mongoose.connections[0].name;
  console.log(`Conexion a ${colors.green('MongoDB')} exitosa -----> (${colors.green(dbName)})`)
});

export default mongoose;