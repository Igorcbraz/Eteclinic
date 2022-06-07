import { connect } from "../repository/connectionDB";

interface insertAdressProps{
    cep: string,
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string 
}

export async function insertAdress({
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado 
}: insertAdressProps){
    const conn = await connect();
    await conn.beginTransaction();
  
    const sql = 'INSERT INTO tbl_enderecos(cep, rua, numero, bairro, cidade, estado) VALUES(?, ?, ?, ?, ? ,?);';
    const values = [cep, rua, numero, bairro, cidade, estado]
  
    const dbStatus = await conn.query(sql, values);
    const { affectedRows }: any = dbStatus[0];
    
    if(affectedRows === 1){
      conn.commit();
      conn.end();
  
      return {
        code: 1,
        msg: 'endereço cadastrado com sucesso'
      }
    } else {
      conn.rollback();
      conn.end();
  
      return {
        code: 2,
        msg: 'houve um erro na inserção do endereço'
      }
    }
}