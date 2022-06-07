import { connect } from "../repository/connectionDB";

export async function loginUser(email: string, password: string){
  const conn = await connect();
  await conn.beginTransaction();

  const sql = "SELECT * FROM tbl_usuarios WHERE email = ? AND senha = ?;"
  const findData = [email, password];

  const [rows] = await conn.query(sql, findData)
  
  if(rows){
    conn.commit();
    conn.end();

    return {
      code: 1,
      value: rows
    }
  } else {
    conn.rollback();
    conn.end();

    return {
      code: 2,
      msg: 'houve um erro no login'
    }
  }
}

export async function reset(email: string, password: string){
  const conn = await connect();
  await conn.beginTransaction();

  const sql = 'UPDATE tbl_usuarios SET senha = ? WHERE email = ?';
  const resetData = [password, email];
  
  const [rows] = await conn.query(sql, resetData); 

  if(rows){
    conn.commit();
    conn.end();

    return {
      code: 1,
      value: rows
    }
  } else {
    conn.rollback();
    conn.end();

    return {
      code: 2,
      msg: 'houve um erro no login'
    }
  }
}