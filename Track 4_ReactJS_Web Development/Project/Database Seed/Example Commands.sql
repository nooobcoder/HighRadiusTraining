USE grey_goose;

DESC winter_internship;

RENAME TABLE winter_internship TO winter_internship_old;

create table winter_internship
(
    sl_no                 int                  NOT NULL auto_increment
        primary key,
    buisness_code         varchar(10)          null,
    cust_number           int                  null,
    name_customer         varchar(60)          null,
    clear_date            date                 null,
    buisness_year         year                 null,
    doc_id                varchar(10)          null,
    posting_date          date                 null,
    document_create_date  date                 null,
    document_create_date1 date                 null,
    due_in_date           date                 null,
    invoice_currency      varchar(5)           null,
    document_type         varchar(5)           null,
    posting_id            int                  null,
    area_business         varchar(5)           null,
    total_open_amount     double               null,
    baseline_create_date  date                 null,
    cust_payment_terms    varchar(5)           null,
    invoice_id            int                  null,
    isOpen                tinyint(1) default 0 null,
    aging_bucket          varchar(20)          null,
    constraint business_codeFK_new
        foreign key (buisness_code) references business (business_code),
    constraint cust_numberFK_new
        foreign key (cust_number) references customer (cust_number)
);

ALTER TABLE winter_internship
    AUTO_INCREMENT = 1;

# Reindex the sl_no PRIMARY KEY
SET @newid = 0;
UPDATE winter_internship
SET sl_no=(@newid := @newid + 1)
ORDER BY sl_no;

# Rename the columns with spelling errors
ALTER TABLE winter_internship RENAME COLUMN buisness_code TO business_code, RENAME COLUMN buisness_year TO business_year;


SELECT *
FROM winter_internship
WHERE clear_date BETWEEN '2019-01-01' AND '2020-01-01'
   OR due_in_date BETWEEN '2019-01-01' AND '2020-01-01'
   OR baseline_create_date BETWEEN '2019-01-01' AND '2020-01-01'
   OR invoice_currency = 'USD';