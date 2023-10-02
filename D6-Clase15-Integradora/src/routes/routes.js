import apiRoutes from './api/api.routes.js';
const router = express.Router();

// Rutas para /api y /views
router.use('/api', apiRoutes);

export default router;