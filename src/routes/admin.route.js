import { Router } from 'express';
import {
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
} from '../controllers/user.controller.js';
import { validationUserSignUp } from '../middleware/validation.middleware.js';

const router = Router();

router.post(
    '/user',
    checkAuthenticated,
    checkAdmin,
    validationUserSignUp,
    createUser
);
router.get('/user', checkAuthenticated, checkAdmin, getUsers);
router.get('/user/:id', checkAuthenticated, checkAdmin, getUser);
router.patch('/user/:id', checkAuthenticated, checkAdmin, updateUser);
router.delete('/user/:id', checkAuthenticated, checkAdmin, deleteUser);

/** Alternative */
// router
//     .route('/user/:id')
//     .get(checkAuthenticated, checkAdmin, fetchUser)
//     .patch(checkAuthenticated, checkAdmin, updateUser);

export default router;
