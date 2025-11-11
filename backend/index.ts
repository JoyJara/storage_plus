import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import posRoutes from './routes/posRoutes';
import employeesRoutes from './routes/employeesRoutes';
import historyRoutes from './routes/historyRoutes';
import emailRoutes from './routes/emailRoutes'

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://66.179.92.207:5173',

  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'profePonganos10',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,         // no usamos https
    httpOnly: true,
    sameSite: 'lax',       // evita problemas de cookies bloqueadas
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));


// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/pos', posRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/history', historyRoutes)
app.use("/api/email", emailRoutes);

// Solo servir React si es producción y existe index.html
const distPath = path.resolve(__dirname, 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
console.log('📁 indexHtmlPath exists:', fs.existsSync(indexHtmlPath));
console.log('📁 indexHtmlPath path:', indexHtmlPath);

if (process.env.NODE_ENV === 'production' && fs.existsSync(indexHtmlPath)) {
  console.log('✅ React detectado en producción, sirviendo dist/');

  app.use(express.static(distPath));

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(indexHtmlPath, (err) => {
      if (err) res.status(500).send(err);
    });
  });
} else {
  console.log('🛠️ Modo desarrollo - React no se está sirviendo desde Express.');
}


const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
