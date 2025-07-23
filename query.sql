use master;
go
DROP DATABASE IF EXISTS medigroup;
go
create database medigroup;
go
use medigroup;
go
DROP TABLE IF EXISTS Medicamentos;
create table Medicamentos(

	id int identity(1,1) primary key,
	nombre varchar(255) not null,
	categoria varchar(100) not null,
	cantidad int not null,
	fecha_expiracion date not null

);
go
insert into Medicamentos values  ('Paracetamol 500mg','Analgesicos',150,'2025-12-31');
go
insert into Medicamentos values  ('Ibuprofeno 400mg','Antiinflamatorios',200,'2025-10-15');
go
insert into Medicamentos values  ('Amoxicilina 500mg','Antibioticos',75,'2025-08-20');
go
select* from Medicamentos;

