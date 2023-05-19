import { Router } from 'express';
import {
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import {
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/user', checkAuthenticated, checkAdmin, fetchUsers);
router.get('/user/:id', checkAuthenticated, checkAdmin, fetchUser);
router.post('/user/:id', checkAuthenticated, checkAdmin);
router.patch('/user/:id', checkAuthenticated, checkAdmin, updateUser);
router.delete('/user/:id', checkAuthenticated, checkAdmin, deleteUser);

/** Alternative */
// router
//     .route('/user/:id')
//     .get(checkAuthenticated, checkAdmin, fetchUser)
//     .patch(checkAuthenticated, checkAdmin, updateUser);

export default router;
