--
-- PostgreSQL database dump
--

-- Dumped from database version 11.17
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: authentications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authentications (
    token text NOT NULL
);


ALTER TABLE public.authentications OWNER TO postgres;

--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pgmigrations_id_seq OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at text NOT NULL,
    updated_at text NOT NULL,
    name text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Data for Name: authentications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authentications (token) FROM stdin;
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjYyZmQzYi0yOGYyLTRiZjYtOWI0Zi0zZTljMTA3MGJkZGQiLCJpYXQiOjE3NDQxOTMxNjR9.CSTUKytXZV_4EVMt6_uizmxRDFChNC4NKKfzn5weJBU
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjYyZmQzYi0yOGYyLTRiZjYtOWI0Zi0zZTljMTA3MGJkZGQiLCJpYXQiOjE3NDQxOTMxNzZ9.iGFvSP_t_LKVWsKqx87OW4YANJcMfsVu2AF8Y1yPmWQ
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjYyZmQzYi0yOGYyLTRiZjYtOWI0Zi0zZTljMTA3MGJkZGQiLCJpYXQiOjE3NDQxOTMxODF9.XGQx9JrD2RBD3j7GfeIHJQyIcaVUFNY5PEMU4HpPXe8
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjYyZmQzYi0yOGYyLTRiZjYtOWI0Zi0zZTljMTA3MGJkZGQiLCJpYXQiOjE3NDQxOTMxODF9.XGQx9JrD2RBD3j7GfeIHJQyIcaVUFNY5PEMU4HpPXe8
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjYyZmQzYi0yOGYyLTRiZjYtOWI0Zi0zZTljMTA3MGJkZGQiLCJpYXQiOjE3NDQxOTMzODR9.-p8PXO4cMM81DmKTsh3NaMWH7Q_nvgzbsslvWMhkelA
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjc4YzFhOS1jMTg4LTRlYmMtODdmNy1lOGM4OWNhZGJhMjEiLCJpYXQiOjE3NDQxOTczNzN9.H8MkMQS_ZAwlBYacw0QLHV61lqYwWZbUZwAg2utFrck
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjc4YzFhOS1jMTg4LTRlYmMtODdmNy1lOGM4OWNhZGJhMjEiLCJpYXQiOjE3NDQxOTc1NTd9.dVCoQjLFIDEsqRWpmbf-aVPqAEPhJCT1JECtAPU9t3M
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjc4YzFhOS1jMTg4LTRlYmMtODdmNy1lOGM4OWNhZGJhMjEiLCJpYXQiOjE3NDQyMjExMDd9.II3d1FUMbkJkJTcmyPrH5mJX4vhT51UU2-ni_lybBHQ
\.


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pgmigrations (id, name, run_on) FROM stdin;
1	1623324013755_create-table-notes	2025-04-09 05:12:14.555516
2	1744190124048_add-authenticatoins-table	2025-04-09 05:15:44.674026
3	1744221763516_add-name-column-to-users	2025-04-09 14:04:33.953655
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, created_at, updated_at, name) FROM stdin;
1278c1a9-c188-4ebc-87f7-e8c89cadba21	abcde@bcd.com	$2b$10$0m77.yGZukt9dxBJNXdT4OZj8IL0KCt/LcPtW1K.BdBusamb0HhVW	2025-04-09T11:15:01.931Z	2025-04-09T18:06:53.450Z	aku testing
\.


--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 3, true);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

