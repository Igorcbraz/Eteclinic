CREATE DATABASE eteclinic;
USE eteclinic;


CREATE TABLE tbl_usuarios(
	id_login INT(11) primary key auto_increment,
    email varchar(45) not null,
    senha varchar(64) not null,
    usuario varchar(45) not null,
    usuario_deletado tinyint(1)
);

CREATE TABLE tbl_profissoes(
	id_profissao int(11) primary key auto_increment,
    nome_profissao varchar(45),
    profissao_deletada tinyint(1) default false
);


CREATE TABLE tbl_enderecos(
	id_endereco int(11) primary key,
    cep int(10),
    rua varchar(45),
	numero varchar(45),
    bairro varchar(45),
    cidade varchar(45),
    estado varchar(2)
);

CREATE TABLE tbl_especialistas(
	id_especialista int(11) primary key,
    registro varchar(45),
    nome_especialista varchar(45),
    telefone_especialista varchar(45),
    celular_especialista varchar(45),
    email_especialista varchar(45),
    FK_id_endereco int(11),
    FK_id_profissao int(11),
    especialista_deletado tinyint(1),
    
    CONSTRAINT FK_id_endereco FOREIGN KEY (FK_id_endereco) REFERENCES tbl_enderecos(id_endereco),
    CONSTRAINT FK_id_profissao FOREIGN KEY (FK_id_profissao) REFERENCES tbl_profissoes(id_profissao)
);

CREATE TABLE tbl_clientes(
	id_cliente int(11) primary key,
    cpf varchar(11),
    nome_cliente varchar(45),
    telefone_cliente varchar(45),
    celular_cliente varchar(45),
    email_cliente varchar(45),
    tipo_sanguineo ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
    FK_id_endereco int(11),
    cliente_deletado tinyint(1),
    
     CONSTRAINT FK_id_endereco_clientes FOREIGN KEY (FK_id_endereco) REFERENCES tbl_enderecos(id_endereco)
);

CREATE TABLE tbl_prontuarios(
	id_prontuario int(11) primary key,
    data_prontuario date,
    FK_id_cliente int(11),
    
    CONSTRAINT FK_id_cliente FOREIGN KEY (FK_id_cliente) REFERENCES tbl_clientes(id_cliente)
);


CREATE TABLE tbl_atendimentos(
	id_atendimento int(11) primary key,
    data_agendada datetime,
    data_atendimento datetime,
    valor_atendimento decimal(6,2),
    status_atendimento enum('agendado', 'realizado', 'cancelado'),
    FK_id_prontuario int(11),
    FK_id_especialista int(11),
    
	CONSTRAINT FK_id_prontuario FOREIGN KEY (FK_id_prontuario) REFERENCES tbl_prontuarios(id_prontuario),
	CONSTRAINT FK_id_especialista FOREIGN KEY (FK_id_especialista) REFERENCES tbl_especialistas(id_especialista)
);

CREATE TABLE tbl_historicos_prontuarios(
	id_historico int(11) primary key,
    data_atendimento datetime,
    descricao text,
    FK_id_atendimento int(11),
    
    CONSTRAINT FK_id_atendimento FOREIGN KEY (FK_id_atendimento) REFERENCES tbl_atendimentos(id_atendimento)
);

