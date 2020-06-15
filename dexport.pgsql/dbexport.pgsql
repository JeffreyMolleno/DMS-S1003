--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

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

SET default_table_access_method = heap;

--
-- Name: album; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.album (
    data_album_id text,
    data_master_subject text NOT NULL,
    data_album_type text NOT NULL,
    date_created text NOT NULL
);


ALTER TABLE public.album OWNER TO postgres;

--
-- Name: data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data (
    data_id text,
    data_album_id text NOT NULL,
    field_subject_id text NOT NULL,
    holding_value text NOT NULL
);


ALTER TABLE public.data OWNER TO postgres;

--
-- Name: dynamic_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dynamic_data (
    dynad_id text,
    album_id text NOT NULL,
    holding_value text NOT NULL,
    delta_date text NOT NULL,
    field_subject_id text
);


ALTER TABLE public.dynamic_data OWNER TO postgres;

--
-- Name: fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fields (
    field_id text,
    field_type text NOT NULL,
    main_subject text NOT NULL,
    sub_definition text NOT NULL,
    is_dynamic boolean,
    calculations text,
    considerations text,
    show boolean NOT NULL,
    master_subject text NOT NULL,
    album_id text NOT NULL
);


ALTER TABLE public.fields OWNER TO postgres;

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
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    type_id text,
    type_subject text NOT NULL,
    type_description text
);


ALTER TABLE public.types OWNER TO postgres;

--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Data for Name: album; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.album (data_album_id, data_master_subject, data_album_type, date_created) FROM stdin;
A-962-497	LOGIN_FIELDS-257-348	LOGIN_FIELDS	Sun May 24 2020 12:45:25 GMT+0800 (Philippine Standard Time)
A-030-042	System_User-483-033	System_User	Sun May 24 2020 17:14:09 GMT+0800 (Philippine Standard Time)
A-868-044	System_User-650-213	System_User	Thu May 28 2020 14:54:46 GMT+0800 (Philippine Standard Time)
A-875-788	System_User-188-053	System_User	Thu May 28 2020 16:41:01 GMT+0800 (Philippine Standard Time)
A-893-900	System_User-489-694	System_User	Thu May 28 2020 16:41:02 GMT+0800 (Philippine Standard Time)
A-102-690	System_User-095-128	System_User	Thu May 28 2020 16:41:03 GMT+0800 (Philippine Standard Time)
A-976-389	System_User-409-160	System_User	Thu May 28 2020 16:41:06 GMT+0800 (Philippine Standard Time)
A-520-957	System_User-334-514	System_User	Thu May 28 2020 16:41:07 GMT+0800 (Philippine Standard Time)
A-601-973	System_User-351-608	System_User	Thu May 28 2020 16:41:07 GMT+0800 (Philippine Standard Time)
A-192-572	System_User-650-025	System_User	Thu May 28 2020 16:41:07 GMT+0800 (Philippine Standard Time)
A-513-484	System_User-490-193	System_User	Thu May 28 2020 16:41:08 GMT+0800 (Philippine Standard Time)
A-490-071	System_User-578-252	System_User	Thu May 28 2020 16:41:09 GMT+0800 (Philippine Standard Time)
A-395-354	System_User-861-957	System_User	Thu May 28 2020 16:41:09 GMT+0800 (Philippine Standard Time)
A-238-766	System_User-018-721	System_User	Thu May 28 2020 20:53:57 GMT+0800 (Philippine Standard Time)
A-074-563	System_User-653-965	System_User	Thu May 28 2020 20:55:30 GMT+0800 (Philippine Standard Time)
A-227-333	System_User-264-998	System_User	Thu May 28 2020 20:56:58 GMT+0800 (Philippine Standard Time)
A-569-977	System_User-070-591	System_User	Fri May 29 2020 01:18:50 GMT+0800 (Philippine Standard Time)
A-496-860	System_User-358-934	System_User	Mon Jun 01 2020 14:43:20 GMT+0800 (Philippine Standard Time)
A-094-720	SIDEBAR_LINKS-084-849	SIDEBAR_LINKS	Mon Jun 01 2020 23:35:18 GMT+0800 (Philippine Standard Time)
A-098-474	System_User-584-732	System_User	Tue Jun 02 2020 14:42:36 GMT+0800 (Philippine Standard Time)
A-203-396	System_User-396-758	System_User	Tue Jun 02 2020 14:42:39 GMT+0800 (Philippine Standard Time)
A-834-707	TAB_PAGE_COMPONENTS}-962-822	TAB_PAGE_COMPONENTS	Tue Jun 02 2020 22:09:05 GMT+0800 (Philippine Standard Time)
A-233-563	FORM_DIALOG_FIELDS}-842-533	FORM_DIALOG_FIELDS	Sat Jun 06 2020 20:25:00 GMT+0800 (Philippine Standard Time)
A-679-391	System_User-422-784	System_User	Wed Jun 10 2020 14:21:50 GMT+0800 (Philippine Standard Time)
A-938-513	Accounts-537-046	Accounts	Sat Jun 13 2020 15:18:31 GMT+0800 (Philippine Standard Time)
A-606-912	Accounts-275-226	Accounts	Sat Jun 13 2020 17:23:40 GMT+0800 (Philippine Standard Time)
A-372-183	Accounts-126-666	Accounts	Sat Jun 13 2020 20:59:52 GMT+0800 (Philippine Standard Time)
A-544-730	Accounts-768-556	Accounts	Sat Jun 13 2020 21:03:48 GMT+0800 (Philippine Standard Time)
\.


--
-- Data for Name: data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data (data_id, data_album_id, field_subject_id, holding_value) FROM stdin;
D-754-968	A-238-766	F-905-732	Yow
D-364-933	A-238-766	F-994-600	pass123
D-974-397	A-074-563	F-905-732	Lou
D-807-638	A-074-563	F-994-600	123
D-522-584	A-227-333	F-905-732	Lou2
D-089-463	A-227-333	F-994-600	123
D-908-321	A-569-977	F-905-732	Verra
D-965-456	A-569-977	F-994-600	vg
D-992-533	A-496-860	F-905-732	yow
D-942-958	A-496-860	F-994-600	dasd
D-169-437	A-098-474	F-905-732	Vera
D-656-483	A-098-474	F-994-600	m
D-785-814	A-203-396	F-905-732	Vera
D-334-679	A-203-396	F-994-600	m
D-971-019	A-679-391	F-994-600	test
D-734-542	A-679-391	F-905-732	test
D-929-250	A-938-513	F-952-252	Jeffrey
D-917-757	A-938-513	F-459-788	R
D-573-948	A-938-513	F-868-962	Molleno
\.


--
-- Data for Name: dynamic_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dynamic_data (dynad_id, album_id, holding_value, delta_date, field_subject_id) FROM stdin;
\.


--
-- Data for Name: fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fields (field_id, field_type, main_subject, sub_definition, is_dynamic, calculations, considerations, show, master_subject, album_id) FROM stdin;
F-572-509	T-292-327	Name	Top label for name fields	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"Profile"}}}}	t	Profile	A-233-563
F-952-252	T-194-108	First Name	Input fields for first name	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left","family":"name_fields","order_of_appearance":{"after":"Name"}}}}	t	Name	A-233-563
F-920-940	T-096-076	Profile	Header tag for Profile form collectives	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"order_of_appearance":{"before":"Name"},"position":"full_width"}}}	t	Personal Information	A-233-563
F-459-788	T-194-108	Middle Name	Input fields for last name	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"middle","family":"name_fields","order_of_appearance":{"after":"First Name"}}}}	t	Name	A-233-563
F-868-962	T-194-108	Last Name	Input fields for last name	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"right","family":"name_fields","order_of_appearance":{"after":"Middle Name"}}}}	t	Name	A-233-563
F-742-108	T-456-154	Payments	Sidebar access link to Payments module	f	\N	{"Styling":{"grid":{"order_of_appearance":{"after":"Accounts"}}}}	t	null	A-094-720
F-060-870	T-456-154	Reports	Sidebar access link to Payments module	f	\N	{"Styling":{"grid":{"order_of_appearance":{"after":"Payments"}}}}	t	null	A-094-720
F-819-601	T-456-154	Release	Sidebar access link to Payments module	f	\N	{"Styling":{"grid":{"order_of_appearance":{"after":"Reports"}}}}	t	null	A-094-720
F-960-570	T-456-154	Accounts	Sidebar access link to accounts module	f	\N		t	null	A-094-720
F-340-753	T-871-589	Add Account	Access to form dialog of album account	f	\N		t	Accounts	A-834-707
F-506-511	T-802-094	Personal Information	Form Dialog steps for personl information gathering	f	\N	null	t	Add Account	A-233-563
F-872-883	T-802-094	Employee/Business Profile	Form Dialog steps for Employee/Business Profile	f	\N	null	t	Add Account	A-233-563
F-352-153	T-194-108	Phone Number	Input field for phone number	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"Email"}}}}	t	Contact	A-233-563
F-500-791	T-456-154	Overview	Sidebar access link to Payments module	f	\N	{"Styling":{"grid":{"order_of_appearance":{"after":"Release"}}}}	t	null	A-094-720
F-147-129	T-194-108	Employment Title	Input field for employment title	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"right_half","family":"company_details_1","order_of_appearance":{"after":"Company"}}}}	t	Current Employment	A-233-563
F-376-056	T-194-108	Email	Input field for email	f	\N	{"Styling":{"base":{"margin":"10px 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"Contact"}}}}	t	Contact	A-233-563
F-525-812	T-096-076	Contact	Header Tag for Contacts	f	\N	{"Styling":{"base":{"margin":"10px 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"address_fields"}}}}	t	Personal Information	A-233-563
F-398-887	T-492-828	Login	Submit button for system user Login	f	\N	{"Process":{"on_submit":{"function":"verify","data_album_type":"System_User", "success":{"redirect_to":"main_page"}, "fail":{"prompt":"failed verifications"} }},"Styling":{"margin":"0 10px"},"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"Password"}}}}	t	null	A-962-497
F-905-732	T-194-108	Username	input field for username	f	\N	{"Styling":{"base":{"margin":"0 10px","width":"69.6%"},"grid":{"position":"full_width","order_of_appearance":{"before":"Password"}}}}	t	null	A-962-497
F-030-190	T-094-441	Register	Submit button for system user registration	f	\N	{"Process":{"on_submit":{"function":"register","data_album_type":"System_User", "success":{"redirect_to":"#"}, "fail":{"prompt":"failed registrations"} }},"Styling":{"margin":"0 10px"},"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"Login"}}}}	t	null	A-962-497
F-455-047	T-194-108	Address	Input fields for address	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left_to_mid","family":"address_fields","order_of_appearance":{"after":"name_fields"}}}}	t	Profile	A-233-563
F-159-842	T-194-108	Area Code	Input fields for address	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"right","family":"address_fields","order_of_appearance":{"after":"Address"}}}}	t	Profile	A-233-563
F-351-332	T-194-108	Company	Input field for company	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left_half","family":"company_details_1","order_of_appearance":{"after":"Current Employment"}}}}	t	Current Employment	A-233-563
F-994-600	T-192-531	Password	input field for password	f	\N	{"Styling":{"base":{"margin":"0 10px","width":"69.5%"},"grid":{"position":"full_width","order_of_appearance":{"after":"Username"}}}}	t	null	A-962-497
F-555-568	T-613-916	Salary (Monthly)	Input field for current employment monthly salary	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"right_half","family":"company_details_2","order_of_appearance":{"after":"Starting Date"}}}}	t	Current Employment	A-233-563
F-386-275	T-096-076	Current Employment	Header Tag for Employment form collectives	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"before":"company_details_1"}}}}	t	Employee/Business Profile	A-233-563
F-123-892	T-648-491	Starting Date	Input field for current employment starting date	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left_half","family":"company_details_2","order_of_appearance":{"after":"company_details_1"}}}}	t	Current Employment	A-233-563
F-756-334	T-096-076	References	Header tag for employment references	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"full_width","order_of_appearance":{"after":"company_details_2"}}}}	t	Current Employment	A-233-563
F-777-161	T-194-108	Name %References%	Input field for name of employment reference	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left_half", "family":"reference_details_1","order_of_appearance":{"after":"References"}}}}	t	Current Employment	A-233-563
F-980-070	T-194-108	Contact Number	Input field for contact number of employment reference	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"right_half", "family":"reference_details_1","order_of_appearance":{"after":"Name %References%"}}}}	t	Current Employment	A-233-563
F-711-931	T-194-108	Association	Input field for association definition of employment reference	f	\N	{"Styling":{"base":{"margin":"0 10px"},"grid":{"position":"left_half","order_of_appearance":{"after":"reference_details_1"}}}}	t	Current Employment	A-233-563
\.


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pgmigrations (id, name, run_on) FROM stdin;
3	1580076713628_type-table	2020-05-24 03:34:45.208448
4	1590000374631_album-table	2020-05-24 03:34:45.208448
5	1590000374794_fields-table	2020-05-24 03:34:45.208448
6	1590000384853_data-table	2020-05-24 03:34:45.208448
7	1590000398668_dynamic-data-table	2020-05-24 03:34:45.208448
\.


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (type_id, type_subject, type_description) FROM stdin;
T-194-108	INPUT_FIELD_STRING	\N
T-192-531	INPUT_FIELD_PASSWORD	\N
T-094-441	BUTTON_SUBMIT_REGISTER	\N
T-492-828	BUTTON_SUBMIT_LOGIN	\N
T-456-154	BUTTON_ACCESS_LINK_SIDEBAR	\N
T-871-589	COMPONENT_FORM_DIALOG	\N
T-802-094	FORM_STEPS	\N
T-096-076	FORM_HEADER	\N
T-292-327	FIELD_FAMILY_HEADER	\N
T-874-430	INPU_FIELD_STRING	\N
T-017-072	DATE_STRING	\N
T-648-491	DATE_PICKER	\N
T-613-916	INPUT_FIELD_INTEGER	\N
\.


--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 7, true);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

