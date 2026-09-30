BEGIN TRANSACTION;
CREATE TABLE categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50),
    slug VARCHAR(100) UNIQUE
);
INSERT INTO "categorias" VALUES(1,'Ciencia Ficcion','Historias de futuros tecnologicos, exploracion espacial y mundos alternos.','rocket','ciencia-ficcion');
INSERT INTO "categorias" VALUES(2,'Terror/Thriller','Novelas de suspenso psicologico, misterio, horror y tension narrativa.','ghost','terror-thriller');
INSERT INTO "categorias" VALUES(3,'Romance','Narrativas de amor contemporaneo, pasion, drama y clasicos romanticos.','heart','romance');
INSERT INTO "categorias" VALUES(4,'Negocios','Estrategias de finanzas, liderazgo, emprendimiento y crecimiento profesional.','briefcase','negocios');
INSERT INTO "categorias" VALUES(5,'Psicologia','Analisis del comportamiento humano, toma de decisiones y bienestar mental.','brain','psicologia');
CREATE TABLE detalles_pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedidoId INTEGER NOT NULL,
    productoId INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precioUnitario REAL NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (pedidoId) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES productos(id) ON DELETE RESTRICT
);
INSERT INTO "detalles_pedido" VALUES(1,1,1,1,499.0,499.0);
INSERT INTO "detalles_pedido" VALUES(2,1,7,1,380.0,380.0);
INSERT INTO "detalles_pedido" VALUES(3,2,10,1,399.0,399.0);
INSERT INTO "detalles_pedido" VALUES(4,2,13,1,520.0,520.0);
CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folio VARCHAR(50) UNIQUE NOT NULL,
    fecha TEXT NOT NULL,
    subtotal REAL NOT NULL,
    envio REAL NOT NULL DEFAULT 0.0,
    total REAL NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    metodoPago VARCHAR(50) NOT NULL,
    direccionEnvio TEXT NOT NULL,
    nombreCliente VARCHAR(150) NOT NULL,
    emailCliente VARCHAR(150) NOT NULL,
    usuarioId INTEGER,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE SET NULL
);
INSERT INTO "pedidos" VALUES(1,'PED-2026-001','2026-09-10T14:30:00Z',879.0,99.0,978.0,'PAGADO','TARJETA_CREDITO','Av. del Parque 1234, Guadalajara, Jalisco','Hector Emiliano Reyes Gonzalez','hector.reyes@ceti.mx',1);
INSERT INTO "pedidos" VALUES(2,'PED-2026-002','2026-09-11T10:15:00Z',1019.0,0.0,1019.0,'PREPARANDO','MERCADO_PAGO','Calle Reforma 450, Zapopan, Jalisco','Juan Perez Garcia','juan.perez@example.com',2);
CREATE TABLE productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    isbn VARCHAR(30),
    editorial VARCHAR(100),
    precio REAL NOT NULL,
    precioAnterior REAL,
    imagen TEXT,
    categoriaId INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    descripcion TEXT,
    paginas INTEGER DEFAULT 300,
    rating REAL DEFAULT 4.8,
    resenasCount INTEGER DEFAULT 12,
    destacado BOOLEAN DEFAULT 0,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id) ON DELETE RESTRICT
);
INSERT INTO "productos" VALUES(1,'Dune','Frank Herbert','978-0441172719','Ace Books',499.0,599.0,'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',1,20,'La gran epopeya de Arrakis, el planeta desierto, la especia melange y el destino de Paul Atreides.',688,4.9,310,1);
INSERT INTO "productos" VALUES(2,'Fundacion','Isaac Asimov','978-0553293357','Bantam Spectra',450.0,520.0,'https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg',1,14,'La psicohistoria de Hari Seldon para preservar el conocimiento durante la caida del Imperio Galactico.',296,4.8,180,0);
INSERT INTO "productos" VALUES(3,'Neuromante','William Gibson','978-0441569595','Ace Books',420.0,480.0,'https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg',1,10,'La novela ciberpunk que definio el concepto de ciberespacio, matrix y hackeo neuronal.',320,4.7,145,0);
INSERT INTO "productos" VALUES(4,'El Resplandor','Stephen King','978-0307743657','Anchor',480.0,550.0,'https://covers.openlibrary.org/b/isbn/9780307743657-L.jpg',2,12,'Jack Torrance acepta cuidar el solitario Hotel Overlook durante el invierno con aterradoras consecuencias.',464,4.9,290,1);
INSERT INTO "productos" VALUES(5,'Dracula','Bram Stoker','978-0486411095','Dover Publications',350.0,399.0,'https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg',2,18,'La obra cumbre de la literatura gotica sobre el Conde Dracula y su viaje desde Transilvania a Londres.',416,4.8,220,0);
INSERT INTO "productos" VALUES(6,'El Silencio de los Inocentes','Thomas Harris','978-0312924584','St. Martins Press',430.0,490.0,'https://covers.openlibrary.org/b/isbn/9780312924584-L.jpg',2,8,'Clarice Starling y su perturbadora colaboracion con el Dr. Hannibal Lecter para atrapar a un asesino.',368,4.8,175,0);
INSERT INTO "productos" VALUES(7,'Orgullo y Prejuicio','Jane Austen','978-0141439518','Penguin Classics',380.0,440.0,'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',3,25,'La historia inolvidable de Elizabeth Bennet y el seor Darcy en la sociedad rural inglesa del siglo XIX.',432,5.0,410,1);
INSERT INTO "productos" VALUES(8,'Bajo la Misma Estrella','John Green','978-0525478812','Dutton Books',320.0,380.0,'https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg',3,16,'Una novela emotiva y profunda sobre dos jovenes que encuentran el amor enfrentando adversidades.',336,4.7,195,0);
INSERT INTO "productos" VALUES(9,'Yo Antes de Ti','Jojo Moyes','978-0143124541','Pamela Dorman Books',360.0,420.0,'https://covers.openlibrary.org/b/isbn/9780670026609-L.jpg',3,15,'Louisa Clark entra en la vida del tetraplejico Will Traynor en una historia que transformara a ambos.',384,4.8,230,0);
INSERT INTO "productos" VALUES(10,'Habitos Atomicos','James Clear','978-0735211292','Paidos',399.0,460.0,'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',4,30,'Un metodo comprobado para desarrollar buenos habitos diarios y eliminar patrones negativos.',336,4.9,520,1);
INSERT INTO "productos" VALUES(11,'El Metodo Lean Startup','Eric Ries','978-0307887894','Deusto',450.0,520.0,'https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg',4,18,'Como construir empresas y productos exitosos con innovacion continua y validacion de mercado.',320,4.7,140,0);
INSERT INTO "productos" VALUES(12,'De Cero a Uno','Peter Thiel','978-0804139298','Crown Business',410.0,470.0,'https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg',4,12,'Notas sobre como crear empresas que aportan novedades radicales y construyen el futuro.',224,4.8,160,0);
INSERT INTO "productos" VALUES(13,'Pensar Rapido, Pensar Despacio','Daniel Kahneman','978-0374533557','Farrar Straus Giroux',520.0,600.0,'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',5,14,'El premio Nobel Daniel Kahneman explica los dos sistemas que dirigen nuestra manera de pensar.',512,4.9,280,1);
INSERT INTO "productos" VALUES(14,'El Hombre en Busca de Sentido','Viktor Frankl','978-0807014271','Beacon Press',299.0,350.0,'https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg',5,22,'El testimonio trascendental del psiquiatra Viktor Frankl sobre la logoterapia y la resiliencia humana.',184,5.0,490,0);
INSERT INTO "productos" VALUES(15,'Inteligencia Emocional','Daniel Goleman','978-0553383713','Bantam Books',460.0,530.0,'https://covers.openlibrary.org/b/isbn/9780553383713-L.jpg',5,16,'Por que la inteligencia emocional puede importar mas que el coeficiente intelectual en la vida.',384,4.8,210,0);
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'CLIENTE',
    telefono VARCHAR(30),
    direccion TEXT
);
INSERT INTO "usuarios" VALUES(1,'Hector Emiliano Reyes Gonzalez','hector.reyes@ceti.mx','hash_pass_23100134','ADMIN','3312345678','Av. del Parque 1234, Guadalajara, Jalisco');
INSERT INTO "usuarios" VALUES(2,'Juan Perez Garcia','juan.perez@example.com','hash_pass_cliente1','CLIENTE','3398765432','Calle Reforma 450, Zapopan, Jalisco');
INSERT INTO "usuarios" VALUES(3,'Mariana Gomez Lopez','mariana.gomez@example.com','hash_pass_cliente2','CLIENTE','3344556677','Av. Hidalgo 890, Tlaquepaque, Jalisco');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('categorias',5);
INSERT INTO "sqlite_sequence" VALUES('productos',15);
INSERT INTO "sqlite_sequence" VALUES('usuarios',3);
INSERT INTO "sqlite_sequence" VALUES('pedidos',2);
INSERT INTO "sqlite_sequence" VALUES('detalles_pedido',4);
COMMIT;