-- SEQUENCE: public.hm_todo_uid_seq

-- DROP SEQUENCE public.hm_todo_uid_seq;

CREATE SEQUENCE public.hm_todo_uid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.hm_todo_uid_seq
    OWNER TO postgres;

GRANT SELECT ON SEQUENCE public.hm_todo_uid_seq TO mtareadonly;

GRANT SELECT ON SEQUENCE public.hm_todo_uid_seq TO mtreadonly;

GRANT ALL ON SEQUENCE public.hm_todo_uid_seq TO mtreadwrite;

GRANT ALL ON SEQUENCE public.hm_todo_uid_seq TO postgres;
-- SEQUENCE: public.hm_task_status_uid_seq

-- DROP SEQUENCE public.hm_task_status_uid_seq;

CREATE SEQUENCE public.hm_task_status_uid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.hm_task_status_uid_seq
    OWNER TO postgres;



    -- Table: public.hm_todo

-- DROP TABLE public.hm_todo;

CREATE TABLE IF NOT EXISTS public.hm_todo
(
    uid integer NOT NULL DEFAULT nextval('hm_todo_uid_seq'::regclass),
    pract_id integer,
    client_id integer,
    day_id date,
    todo_time timestamp without time zone,
    task_name character varying(50) COLLATE pg_catalog."default",
    todo_status integer,
    task_description character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT hm_todo_pk PRIMARY KEY (uid)
)

TABLESPACE pg_default;

ALTER TABLE public.hm_todo
    OWNER to postgres;

-- Table: public.hm_task_status

-- DROP TABLE public.hm_task_status;

CREATE TABLE IF NOT EXISTS public.hm_task_status
(
    uid integer NOT NULL DEFAULT nextval('hm_task_status_uid_seq'::regclass),
    todo_status character varying(50) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.hm_task_status
    OWNER to postgres;
