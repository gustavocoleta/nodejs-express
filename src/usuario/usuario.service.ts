import { Client } from "pg";
import { Usuario } from "./usuario.interface";

export async function createUsuario(usuario: Usuario) {
    const client = new Client();
    await client.connect();

    const res = await client.query('INSERT INTO usuario (nome, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *', 
        [usuario.nome, usuario.email, usuario.password, usuario.admin]
    );

    await client.end();

    return res.rows[0];
}

export async function findAllUsuario() {
    const client = new Client();

    await client.connect();

    const res = await client.query('SELECT * FROM usuario');

    await client.end();

    return res.rows;
}

export async function findByIdUsuario(id: number) {
    const client = new Client();
    await client.connect();

    const res = await client.query('SELECT * FROM usuario WHERE id = $1', [id]);

    client.end();

    return res.rows[0];
}

export async function updateAdminUsuario(idUsuario: number, admin: boolean) {
    if(!idUsuario) {
        return 'Usuário não encontrado, informe o id do usuário que deseja alterar';
    }

    const client = new Client()
    
    await client.connect()

    const res = await client.query('UPDATE usuario SET admin = $1 WHERE id = $2 RETURNING admin', 
        [admin, idUsuario])

    const adminAlterado = res.rows[0]

    await client.end()

    return adminAlterado;
}
export async function updateUsuario(usuario: any) {
    if(!usuario.id) {
        return 'Usuário não encontrado, informe o id do usuário que deseja alterar';
    }

    const client = new Client()
    
    await client.connect()

    const res = await client.query('UPDATE usuario SET nome = $1, email = $2, password = $3, admin = $4 WHERE id = $5 RETURNING *', 
        [usuario.nome, usuario.email, usuario.password, usuario.admin, usuario.id])

    const usuarioAlterado = res.rows[0]

    await client.end()

    return usuarioAlterado;
}

export async function deleteUsuario(id: number) {
    const client = new Client()
    
    await client.connect()

    const res = await client.query('DELETE FROM usuario WHERE id = $1', 
        [id])

    await client.end()

    return res.rowCount > 0 ? 'Usuário excluído com sucesso' : 'Usuário não encontrado';
}