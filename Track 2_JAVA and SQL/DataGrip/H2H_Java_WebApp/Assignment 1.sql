/*
Practice SQL:

Create simple database :

Table Schema:

 1. Department Table

• dept_id – int (primary key)
• dept_name – char(20)
• count – int (for no. of doctors in dept)

2. Doctor Table

• doc_id - int (primary key)
• doc_name – char(20)
• dept_id – int (foreign key – referencing department table)
• specialization – char(20)
• age – int • dob – date

3. Patient Table

• p_id – int (patient id) (primary key)
• p_name – char(20) (patient name)
• age – int • dob – date • bloodgrp – char(5)
• d_id – int (foreign key – referencing Doctor table)

4. Receptionist Table

• sno – int
• dept_id – int (foreign key - referencing Department table)
• doc_id – int (foreign key – referencing Doctor table)
• Status – char(4) (value = ‘free’ if no patient assigned / ‘busy’ if patient assigned )
• p_id – int (foreign key – referencing Patient table) (value = ‘NULL’ if ‘Status = free’, else fill in the corresponding p_id according to patient table
*/



CREATE TABLE DEPARTMENT
(
    dept_id   INT PRIMARY KEY,
    dept_name CHAR(20),
    count     INT COMMENT 'for no. of doctors in dept'
);


CREATE TABLE DOCTOR
(
    doc_id         INT PRIMARY KEY,
    doc_name       CHAR(20),
    dept_id        INT COMMENT 'foreign key – referencing department table',
    FOREIGN KEY (dept_id) REFERENCES DEPARTMENT (dept_id),
    specialization CHAR(20),
    age            INT,
    dob            DATE
);

CREATE TABLE PATIENT
(
    p_id     INT PRIMARY KEY COMMENT 'patient id',
    p_name   CHAR(20) COMMENT 'patient name',
    age      INT,
    dob      DATE,
    bloodgrp CHAR(5),
    d_id     INT,
    FOREIGN KEY (d_id) REFERENCES DOCTOR (doc_id)
);

CREATE TABLE RECEPTIONIST
(
    sno     INT,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES DEPARTMENT (dept_id),
    doc_id  INT,
    FOREIGN KEY (doc_id) REFERENCES DOCTOR (doc_id),
    status  CHAR(4) DEFAULT 'free',
    p_id    INT     DEFAULT NULL
);
