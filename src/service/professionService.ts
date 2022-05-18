import { connect } from "../repository/connectionDB";

export async function insertProfession(professionName: string){
  const conn = await connect();
  await conn.beginTransaction();

  const sql = 'INSERT INTO tbl_profissoes(nome_profissao) VALUES (?)';
  const values = [professionName]

  const dbStatus = await conn.query(sql, values);
  const { affectedRows }: any = dbStatus[0];
  
  if(affectedRows === 1){
    conn.commit();
    conn.end();

    return {
      code: 1,
      msg: 'profissão cadastradada com sucesso'
    }
  } else {
    conn.rollback();
    conn.end();

    return {
      code: 2,
      msg: 'houve um erro na inserção da profissão'
    }
  }
}