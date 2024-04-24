-- dogs
CREATE TABLE public.dogs (
	id serial NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	image_url varchar(255) NOT NULL
);