import { connect } from "../repository/connectionDB";

interface insertPatientProps {
  cpf: number,
  nome_cliente: string,
  telefone_cliente: string,
  celular_cliente: string,
  email_cliente: string,
  tipo_sanguineo: string,
  FK_id_endereco: number
}

async function insertPatient({
  cpf,
  nome_cliente,
  telefone_cliente,
  celular_cliente,
  email_cliente,
  tipo_sanguineo,
  FK_id_endereco
}: insertPatientProps){
  const conn = await connect();
  await conn.beginTransaction();

  const sql = "INSERT INTO tbl_clientes(cpf, nome_cliente, telefone_cliente, celular_cliente, email_cliente,tipo_sanguineo, FK_id_endereco) VALUES(?, ?, ?, ?, ? ,? ,?);"

  const insertData = [cpf, nome_cliente, telefone_cliente, celular_cliente,
  email_cliente,tipo_sanguineo, FK_id_endereco] 

  const [rows] = await conn.query(sql, insertData)

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

export default {insertPatient}