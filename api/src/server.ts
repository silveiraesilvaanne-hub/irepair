import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import clientsRoutes from './routes/clients.routes';
import devicesRoutes from './routes/devices.routes';
import serviceOrdersRoutes from './routes/serviceOrders.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(clientsRoutes);
app.use(devicesRoutes);
app.use(serviceOrdersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});