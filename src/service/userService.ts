import { connect } from "../repository/connectionDB";

interface insertUserProps{
  email: string;
  password: string;
  user: string
}
export async function insertUser({ email, password, user }:insertUserProps){
  const conn = await connect();
  await conn.beginTransaction()

  const sql = 'INSERT INTO tbl_usuarios (email, senha, usuario) VALUES (?, ?, ?);';
  const values = [email, password, user]

  const dbStatus = await conn.query(sql, values);
  const { affectedRows }: any = dbStatus[0];
  
  if(affectedRows === 1){
    conn.commit();
    conn.end();

    return {
      code: 1,
      msg: 'user cadastrado com sucesso'
    }
  } else {
    conn.rollback();
    conn.end();

    return {
      code: 2,
      msg: 'houve um erro na inserção do user'
    }
  }
}