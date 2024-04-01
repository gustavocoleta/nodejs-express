import express, { Request, Response } from 'express';
import { createUsuario, deleteUsuario, findAllUsuario, findByIdUsuario, updateAdminUsuario, updateUsuario } from './usuario/usuario.service';

export const router = express.Router();

router.route('/usuario').get(async (req: Request, res: Response) => {
    res.send(await findAllUsuario());
})

router.route('/usuario/:id').get(async (req: Request, res: Response) => {
    res.send(await findByIdUsuario(+req.params.id))
})

router.route('/usuario').post(async (req: Request, res: Response) => {
    res.send(await createUsuario(req.body))
})

router.route('/usuario/:id').delete(async (req: Request, res: Response) => {
    res.send(await deleteUsuario(+req.params.id));
});

router.route('/usuario').patch(async (req: Request, res: Response) => {
    res.send(await updateUsuario(req.body));
});

router.route('/usuario/:id').put(async (req: Request, res: Response) => {
    res.send(await updateAdminUsuario(+req.params.id, req.body.admin));
});