import { connect } from "../repository/connectionDB";

interface insertSpealistProps{
    registro: string,
    nome_especialista: string,
    telefone_especialista: string,
    celular_especialista: string,
    email_especialista: string,
    FK_id_endereco: number,
    FK_id_profissao: number
}

export async function insertSpecialist({  
    registro,
    nome_especialista,
    telefone_especialista,
    celular_especialista,
    email_especialista,
    FK_id_endereco,
    FK_id_profissao
}: insertSpealistProps){
    const conn = await connect();
    await conn.beginTransaction();
  
    const sql = 'INSERT INTO tbl_especialistas(registro, nome_especialista, telefone_especialista, celular_especialista, email_especialista, FK_id_endereco, FK_id_profissao) VALUES(?, ?, ?, ?, ? ,? ,?);';
    const values = [registro, nome_especialista, telefone_especialista,
        celular_especialista, email_especialista, 
        FK_id_endereco, FK_id_profissao]
  
    const dbStatus = await conn.query(sql, values);
    const { affectedRows }: any = dbStatus[0];
    
    if(affectedRows === 1){
      conn.commit();
      conn.end();
  
      return {
        code: 1,
        msg: 'especialista cadastrado com sucesso'
      }
    } else {
      conn.rollback();
      conn.end();
  
      return {
        code: 2,
        msg: 'houve um erro na inserção do especialista'
      }
    }
}