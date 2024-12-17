import { Router } from 'express';
import { userRouter } from './userRoutes';
import { thoughtRouter } from './thoughtRoute';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
