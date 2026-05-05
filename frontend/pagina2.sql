CREATE TABLE turno (
  id INT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE materia (
  id INT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE escolaridade (
  id INT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL
);

CREATE TABLE candidato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100),

  turno_id INT,
  materia_id INT,
  escolaridade_id INT,

  FOREIGN KEY (turno_id) REFERENCES turno(id),
  FOREIGN KEY (materia_id) REFERENCES materia(id),
  FOREIGN KEY (escolaridade_id) REFERENCES escolaridade(id)
);