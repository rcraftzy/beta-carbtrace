instructions = [
    'SET FOREIGN_KEY_CHECKS=0;',
    'DROP TABLE IF EXISTS child;',
    'DROP TABLE IF EXISTS company;',
    'DROP TABLE IF EXISTS emissions;',
    'DROP TABLE IF EXISTS product;',
    'DROP TABLE IF EXISTS transaction;',
    'DROP TABLE IF EXISTS user;',
    'SET FOREIGN_KEY_CHECKS=1;',
    """
        CREATE TABLE company (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(45) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
    """,
    """
        CREATE TABLE user (
            id int NOT NULL AUTO_INCREMENT,
            username varchar(16) NOT NULL,
            email varchar(255) NOT NULL,
            password varchar(32) NOT NULL,
            company_id int NOT NULL,
            PRIMARY KEY (id),
            KEY company_id_idx (company_id),
            CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES company (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
    """,
    """
        CREATE TABLE product (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(45) NOT NULL,
            provider_email varchar(45) DEFAULT NULL,
            quantity decimal(10,0) DEFAULT NULL,
            scope1_emission decimal(10,0) DEFAULT NULL,
            scope2_emission decimal(10,0) DEFAULT NULL,
            transport_emission decimal(10,0) DEFAULT NULL,
            waste_emission decimal(10,0) DEFAULT NULL,
            product_emission decimal(10,0) DEFAULT NULL,
            factor int DEFAULT NULL,
            created_by int NOT NULL,
            status varchar(20) DEFAULT NULL,
            viewed varchar(20) DEFAULT NULL,
            PRIMARY KEY (id),
            KEY created_by_idx (created_by),
            CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES user (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;
    """,
    """
        CREATE TABLE child (
            parent_id int NOT NULL,
            child_id int NOT NULL,
            child_emission decimal(10,2) DEFAULT NULL,
            KEY parent_id_idx (parent_id),
            KEY child_id_idx (child_id),
            CONSTRAINT child_id FOREIGN KEY (child_id) REFERENCES product (id),
            CONSTRAINT parent_id FOREIGN KEY (parent_id) REFERENCES product (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
    """,
    """
        CREATE TABLE emissions (
            uploaded_by int NOT NULL,
            scope varchar(45) DEFAULT NULL,
            category varchar(45) DEFAULT NULL,
            subcategory varchar(45) DEFAULT NULL,
            type varchar(45) DEFAULT NULL,
            unit varchar(45) DEFAULT NULL,
            value int NOT NULL,
            KEY uploaded_by_idx (uploaded_by),
            CONSTRAINT uploaded_by FOREIGN KEY (uploaded_by) REFERENCES user (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
    """,
    """
        CREATE TABLE transaction (
            id int NOT NULL AUTO_INCREMENT,
            claimant_email varchar(145) NOT NULL,
            provider_email varchar(145) NOT NULL,
            product_id int NOT NULL,
            name varchar(255) DEFAULT NULL,
            quantity int DEFAULT NULL,
            viewed varchar(45) DEFAULT NULL,
            PRIMARY KEY (id),
            KEY product_id_idx (product_id),
            CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES product (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
    """
]
