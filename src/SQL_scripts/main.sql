--
-- CRIA AS TABELAS.
--

CREATE TABLE Users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  hash_pwd VARCHAR(250),
  imagem_perfil VARCHAR(500),
  telefone VARCHAR(50),
  email VARCHAR(100),
  tipo VARCHAR(15),
  tipo_login VARCHAR(15),
  created_at DATETIME DEFAULT NOW(),
  endereco_fk INT,
  portifolio_fk INT,
  nome_fantasia VARCHAR(500),
  cnpj VARCHAR(50)
);

CREATE TABLE Services(
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100),
  prestador_servico_fk INT,
  descricao VARCHAR(250),
  valor DECIMAL(10, 2),
  servico_externo BOOLEAN,
  duracao_servico TIME,
  categoria VARCHAR(100),
  avaliacao INT,
  regime_de_trabalho VARCHAR(100)
);



CREATE TABLE ScheduledServices(
  id INT PRIMARY KEY AUTO_INCREMENT,
  servico_fk INT,
  descricao VARCHAR(250),
  data_ex DATETIME,
  status_fld VARCHAR(100),
  cliente_fk INT,
  local_fk INT,
  preco DECIMAL(10, 2),
  numero_endereco INT,
  avaliacao BOOLEAN
);

CREATE TABLE Qualifications(
  id INT PRIMARY KEY AUTO_INCREMENT,
  profissional_fk INT,
  descricao VARCHAR(100),
  foto_certificado VARCHAR(100)
);

CREATE TABLE Portifolios(
  id INT PRIMARY KEY AUTO_INCREMENT,
  profissional_fk INT,
  descricao VARCHAR(100)
);

CREATE TABLE Photos(
  id INT PRIMARY KEY AUTO_INCREMENT,
  portifolio_fk INT,
  foto_certificado VARCHAR(100)
);

CREATE TABLE Notifications(
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100),
  usuario_fk INT,
  descricao VARCHAR(250),
  data_criacao DATETIME
);

CREATE TABLE Messages(
  id INT PRIMARY KEY AUTO_INCREMENT,
  prestador_servico_fk INT,
  cliente_fk INT,
  corpo_mensagem VARCHAR(200),
  data_criacao DATETIME
);

CREATE TABLE Locales(
  id INT PRIMARY KEY AUTO_INCREMENT,
  rua VARCHAR(200),
  uf VARCHAR(10),
  cep VARCHAR(20),
  lat DECIMAL,
  lon DECIMAL
);

CREATE TABLE Categories(
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100)
);

CREATE TABLE Addresses(
  id INT PRIMARY KEY AUTO_INCREMENT,
  cep VARCHAR(10),
  logradouro VARCHAR(200),
  numero INT,
  bairro VARCHAR(200),
  uf VARCHAR(10),
  complemento VARCHAR(100),
  observacoes VARCHAR(250)
);

--
-- CONFIGURA RELACIONAMENTOS.
--

ALTER TABLE Users ADD CONSTRAINT Users_enderecos_fk FOREIGN KEY(enderecos_fk) REFERENCES Addresses(id);
ALTER TABLE Users ADD CONSTRAINT Users_portifolio_fk FOREIGN KEY(portifolio_fk) REFERENCES Portifolios(id);

ALTER TABLE Services ADD CONSTRAINT Services_prestador_servico_fk FOREIGN KEY(prestador_servico_fk) REFERENCES Users(id);

ALTER TABLE ScheduledServices ADD CONSTRAINT ScheduledServices_servico_fk FOREIGN KEY(servico_fk) REFERENCES Services(id);
ALTER TABLE ScheduledServices ADD CONSTRAINT ScheduledServices_cliente_fk FOREIGN KEY(cliente_fk) REFERENCES Users(id);
ALTER TABLE ScheduledServices ADD CONSTRAINT ScheduledServices_local_fk FOREIGN KEY(local_fk) REFERENCES Addresses(id);

ALTER TABLE Qualifications ADD CONSTRAINT Qualifications_profissional_fk FOREIGN KEY(profissional_fk) REFERENCES Users(id);

ALTER TABLE Portifolios ADD CONSTRAINT Portifolios_profissional_fk FOREIGN KEY(profissional_fk) REFERENCES Users(id);

ALTER TABLE Photos ADD CONSTRAINT Photos_portifolio_fk FOREIGN KEY REFERENCES(portifolio_fk) Portifolios(id);

ALTER TABLE Notifications ADD CONSTRAINT Notifications_usuario_fk FOREIGN KEY REFERENCES(usuario_fk) Users(id);

ALTER TABLE Messages ADD CONSTRAINT Messages_prestador_servico_fk FOREIGN KEY(servico_fk) REFERENCES Users(id);
ALTER TABLE Messages ADD CONSTRAINT Messages_cliente_fk FOREIGN KEY(cliente_fk) REFERENCES Users(id);