
create table usuarios ( id serial primary key,
	email varchar(100),
	senha varchar(30),
	nome_usuario varchar(20), 
	nome varchar(60),
	telefone varchar(11),
	bio varchar(200));
	
create table usuario_amigos (id serial primary key,
	usuario_id integer,
	amigo_usuario_id integer);	
	
--depois vamos criar as chaves estrangeiras para ligar uma tabela a outra	
alter table usuario_amigos add constraint fk_usuario 
FOREIGN KEY (usuario_id) references usuarios (id);

alter table  usuario_amigos add constraint fk_usuario_amigo 
FOREIGN KEY(amigo_usuario_id) references usuarios (id);

create table usuario_posts ( id serial primary key,
usuario_id integer,
legenda varchar(200),
media_url varchar(100) );

alter table usuario_posts add constraint fk_usuario_post 
foreign key (usuario_id) references usuarios (id);

create table post_curtidas (id serial primary key,
post_id integer,
usuario_id integer);

alter table post_curtidas add constraint fk_post_curtidas 
foreign key (post_id) references usuario_posts(id);

alter table post_curtidas add constraint fk_post_curtida_usuario
foreign key (usuario_id) references usuarios(id);
