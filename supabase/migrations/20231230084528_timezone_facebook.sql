CREATE TABLE public.timezone_facebook (
  id bigint NOT NULL,
  iana_tz text NOT NULL,
  fb_tz text NOT NULL,
  CONSTRAINT timezone_facebook_pkey PRIMARY KEY (id)
) tablespace pg_default;

ALTER TABLE "public"."timezone_facebook" enable ROW level security;

CREATE POLICY "Anyone can select" ON "public"."timezone_facebook" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (TRUE);

INSERT INTO
  public.timezone_facebook (id, iana_tz, fb_tz)
VALUES
  (0, 'Unknown', 'TZ_UNKNOWN'),
  (
    1,
    'America/Los_Angeles',
    'TZ_AMERICA_LOS_ANGELES'
  ),
  (2, 'America/Denver', 'TZ_AMERICA_DENVER'),
  (3, 'Pacific/Honolulu', 'TZ_PACIFIC_HONOLULU'),
  (4, 'America/Anchorage', 'TZ_AMERICA_ANCHORAGE'),
  (5, 'America/Phoenix', 'TZ_AMERICA_PHOENIX'),
  (6, 'America/Chicago', 'TZ_AMERICA_CHICAGO'),
  (7, 'America/New_York', 'TZ_AMERICA_NEW_YORK'),
  (8, 'Asia/Dubai', 'TZ_ASIA_DUBAI'),
  (
    9,
    'America/Argentina_San_Luis',
    'TZ_AMERICA_ARGENTINA_SAN_LUIS'
  ),
  (
    10,
    'America/Argentina_Buenos_Aires',
    'TZ_AMERICA_ARGENTINA_BUENOS_AIRES'
  ),
  (
    11,
    'America/Argentina_Salta',
    'TZ_AMERICA_ARGENTINA_SALTA'
  ),
  (12, 'Europe/Vienna', 'TZ_EUROPE_VIENNA'),
  (13, 'Australia/Perth', 'TZ_AUSTRALIA_PERTH'),
  (
    14,
    'Australia/Broken_Hill',
    'TZ_AUSTRALIA_BROKEN_HILL'
  ),
  (15, 'Australia/Sydney', 'TZ_AUSTRALIA_SYDNEY'),
  (16, 'Europe/Sarajevo', 'TZ_EUROPE_SARAJEVO'),
  (17, 'Asia/Dhaka', 'TZ_ASIA_DHAKA'),
  (18, 'Europe/Brussels', 'TZ_EUROPE_BRUSSELS'),
  (19, 'Europe/Sofia', 'TZ_EUROPE_SOFIA'),
  (20, 'Asia/Bahrain', 'TZ_ASIA_BAHRAIN'),
  (21, 'America/La_Paz', 'TZ_AMERICA_LA_PAZ'),
  (22, 'America/Noronha', 'TZ_AMERICA_NORONHA'),
  (
    23,
    'America/Campo_Grande',
    'TZ_AMERICA_CAMPO_GRANDE'
  ),
  (24, 'America/Belem', 'TZ_AMERICA_BELEM'),
  (25, 'America/Sao_Paulo', 'TZ_AMERICA_SAO_PAULO'),
  (26, 'America/Nassau', 'TZ_AMERICA_NASSAU'),
  (27, 'America/Dawson', 'TZ_AMERICA_DAWSON'),
  (28, 'America/Vancouver', 'TZ_AMERICA_VANCOUVER'),
  (
    29,
    'America/Dawson_Creek',
    'TZ_AMERICA_DAWSON_CREEK'
  ),
  (30, 'America/Edmonton', 'TZ_AMERICA_EDMONTON'),
  (
    31,
    'America/Rainy_River',
    'TZ_AMERICA_RAINY_RIVER'
  ),
  (32, 'America/Regina', 'TZ_AMERICA_REGINA'),
  (33, 'America/Atikokan', 'TZ_AMERICA_ATIKOKAN'),
  (34, 'America/Iqaluit', 'TZ_AMERICA_IQALUIT'),
  (35, 'America/Toronto', 'TZ_AMERICA_TORONTO'),
  (
    36,
    'America/Blanc_Sablon',
    'TZ_AMERICA_BLANC_SABLON'
  ),
  (37, 'America/Halifax', 'TZ_AMERICA_HALIFAX'),
  (38, 'America/St_Johns', 'TZ_AMERICA_ST_JOHNS'),
  (39, 'Europe/Zurich', 'TZ_EUROPE_ZURICH'),
  (40, 'Pacific/Easter', 'TZ_PACIFIC_EASTER'),
  (41, 'America/Santiago', 'TZ_AMERICA_SANTIAGO'),
  (42, 'Asia/Shanghai', 'TZ_ASIA_SHANGHAI'),
  (43, 'America/Bogota', 'TZ_AMERICA_BOGOTA'),
  (44, 'America/Costa_Rica', 'TZ_AMERICA_COSTA_RICA'),
  (45, 'Asia/Nicosia', 'TZ_ASIA_NICOSIA'),
  (46, 'Europe/Prague', 'TZ_EUROPE_PRAGUE'),
  (47, 'Europe/Berlin', 'TZ_EUROPE_BERLIN'),
  (48, 'Europe/Copenhagen', 'TZ_EUROPE_COPENHAGEN'),
  (
    49,
    'America/Santo_Domingo',
    'TZ_AMERICA_SANTO_DOMINGO'
  ),
  (50, 'Pacific/Galapagos', 'TZ_PACIFIC_GALAPAGOS'),
  (51, 'America/Guayaquil', 'TZ_AMERICA_GUAYAQUIL'),
  (52, 'Europe/Tallinn', 'TZ_EUROPE_TALLINN'),
  (53, 'Africa/Cairo', 'TZ_AFRICA_CAIRO'),
  (54, 'Atlantic/Canary', 'TZ_ATLANTIC_CANARY'),
  (55, 'Europe/Madrid', 'TZ_EUROPE_MADRID'),
  (56, 'Europe/Helsinki', 'TZ_EUROPE_HELSINKI'),
  (57, 'Europe/Paris', 'TZ_EUROPE_PARIS'),
  (58, 'Europe/London', 'TZ_EUROPE_LONDON'),
  (59, 'Africa/Accra', 'TZ_AFRICA_ACCRA'),
  (60, 'Europe/Athens', 'TZ_EUROPE_ATHENS'),
  (61, 'America/Guatemala', 'TZ_AMERICA_GUATEMALA'),
  (62, 'Asia/Hong_Kong', 'TZ_ASIA_HONG_KONG'),
  (
    63,
    'America/Tegucigalpa',
    'TZ_AMERICA_TEGUCIGALPA'
  ),
  (64, 'Europe/Zagreb', 'TZ_EUROPE_ZAGREB'),
  (65, 'Europe/Budapest', 'TZ_EUROPE_BUDAPEST'),
  (66, 'Asia/Jakarta', 'TZ_ASIA_JAKARTA'),
  (67, 'Asia/Makassar', 'TZ_ASIA_MAKASSAR'),
  (68, 'Asia/Jayapura', 'TZ_ASIA_JAYAPURA'),
  (69, 'Europe/Dublin', 'TZ_EUROPE_DUBLIN'),
  (70, 'Asia/Jerusalem', 'TZ_ASIA_JERUSALEM'),
  (71, 'Asia/Kolkata', 'TZ_ASIA_KOLKATA'),
  (72, 'Asia/Baghdad', 'TZ_ASIA_BAGHDAD'),
  (73, 'Atlantic/Reykjavik', 'TZ_ATLANTIC_REYKJAVIK'),
  (74, 'Europe/Rome', 'TZ_EUROPE_ROME'),
  (75, 'America/Jamaica', 'TZ_AMERICA_JAMAICA'),
  (76, 'Asia/Amman', 'TZ_ASIA_AMMAN'),
  (77, 'Asia/Tokyo', 'TZ_ASIA_TOKYO'),
  (78, 'Africa/Nairobi', 'TZ_AFRICA_NAIROBI'),
  (79, 'Asia/Seoul', 'TZ_ASIA_SEOUL'),
  (80, 'Asia/Kuwait', 'TZ_ASIA_KUWAIT'),
  (81, 'Asia/Beirut', 'TZ_ASIA_BEIRUT'),
  (82, 'Asia/Colombo', 'TZ_ASIA_COLOMBO'),
  (83, 'Europe/Vilnius', 'TZ_EUROPE_VILNIUS'),
  (84, 'Europe/Luxembourg', 'TZ_EUROPE_LUXEMBOURG'),
  (85, 'Europe/Riga', 'TZ_EUROPE_RIGA'),
  (86, 'Africa/Casablanca', 'TZ_AFRICA_CASABLANCA'),
  (87, 'Europe/Skopje', 'TZ_EUROPE_SKOPJE'),
  (88, 'Europe/Malta', 'TZ_EUROPE_MALTA'),
  (89, 'Indian/Mauritius', 'TZ_INDIAN_MAURITIUS'),
  (90, 'Indian/Maldives', 'TZ_INDIAN_MALDIVES'),
  (91, 'America/Tijuana', 'TZ_AMERICA_TIJUANA'),
  (92, 'America/Hermosillo', 'TZ_AMERICA_HERMOSILLO'),
  (93, 'America/Mazatlan', 'TZ_AMERICA_MAZATLAN'),
  (
    94,
    'America/Mexico_City',
    'TZ_AMERICA_MEXICO_CITY'
  ),
  (95, 'Asia/Kuala_Lumpur', 'TZ_ASIA_KUALA_LUMPUR'),
  (96, 'Africa/Lagos', 'TZ_AFRICA_LAGOS'),
  (97, 'America/Managua', 'TZ_AMERICA_MANAGUA'),
  (98, 'Europe/Amsterdam', 'TZ_EUROPE_AMSTERDAM'),
  (99, 'Europe/Oslo', 'TZ_EUROPE_OSLO'),
  (100, 'Pacific/Auckland', 'TZ_PACIFIC_AUCKLAND'),
  (101, 'Asia/Muscat', 'TZ_ASIA_MUSCAT'),
  (102, 'America/Panama', 'TZ_AMERICA_PANAMA'),
  (103, 'America/Lima', 'TZ_AMERICA_LIMA'),
  (104, 'Asia/Manila', 'TZ_ASIA_MANILA'),
  (105, 'Asia/Karachi', 'TZ_ASIA_KARACHI'),
  (106, 'Europe/Warsaw', 'TZ_EUROPE_WARSAW'),
  (
    107,
    'America/Puerto_Rico',
    'TZ_AMERICA_PUERTO_RICO'
  ),
  (108, 'Asia/Gaza', 'TZ_ASIA_GAZA'),
  (109, 'Atlantic/Azores', 'TZ_ATLANTIC_AZORES'),
  (110, 'Europe/Lisbon', 'TZ_EUROPE_LISBON'),
  (111, 'America/Asuncion', 'TZ_AMERICA_ASUNCION'),
  (112, 'Asia/Qatar', 'TZ_ASIA_QATAR'),
  (113, 'Europe/Bucharest', 'TZ_EUROPE_BUCHAREST'),
  (114, 'Europe/Belgrade', 'TZ_EUROPE_BELGRADE'),
  (
    115,
    'Europe/Kaliningrad',
    'TZ_EUROPE_KALININGRAD'
  ),
  (116, 'Europe/Moscow', 'TZ_EUROPE_MOSCOW'),
  (117, 'Europe/Samara', 'TZ_EUROPE_SAMARA'),
  (
    118,
    'Asia/Yekaterinburg',
    'TZ_ASIA_YEKATERINBURG'
  ),
  (119, 'Asia/Omsk', 'TZ_ASIA_OMSK'),
  (120, 'Asia/Krasnoyarsk', 'TZ_ASIA_KRASNOYARSK'),
  (121, 'Asia/Irkutsk', 'TZ_ASIA_IRKUTSK'),
  (122, 'Asia/Yakutsk', 'TZ_ASIA_YAKUTSK'),
  (123, 'Asia/Vladivostok', 'TZ_ASIA_VLADIVOSTOK'),
  (124, 'Asia/Magadan', 'TZ_ASIA_MAGADAN'),
  (125, 'Asia/Kamchatka', 'TZ_ASIA_KAMCHATKA'),
  (126, 'Asia/Riyadh', 'TZ_ASIA_RIYADH'),
  (127, 'Europe/Stockholm', 'TZ_EUROPE_STOCKHOLM'),
  (128, 'Asia/Singapore', 'TZ_ASIA_SINGAPORE'),
  (129, 'Europe/Ljubljana', 'TZ_EUROPE_LJUBLJANA'),
  (130, 'Europe/Bratislava', 'TZ_EUROPE_BRATISLAVA'),
  (
    131,
    'America/El_Salvador',
    'TZ_AMERICA_EL_SALVADOR'
  ),
  (132, 'Asia/Bangkok', 'TZ_ASIA_BANGKOK'),
  (133, 'Africa/Tunis', 'TZ_AFRICA_TUNIS'),
  (134, 'Europe/Istanbul', 'TZ_EUROPE_ISTANBUL'),
  (
    135,
    'America/Port_Of_Spain',
    'TZ_AMERICA_PORT_OF_SPAIN'
  ),
  (136, 'Asia/Taipei', 'TZ_ASIA_TAIPEI'),
  (137, 'Europe/Kiev', 'TZ_EUROPE_KIEV'),
  (
    138,
    'America/Montevideo',
    'TZ_AMERICA_MONTEVIDEO'
  ),
  (139, 'America/Caracas', 'TZ_AMERICA_CARACAS'),
  (140, 'Asia/Ho_Chi_Minh', 'TZ_ASIA_HO_CHI_MINH'),
  (
    141,
    'Africa/Johannesburg',
    'TZ_AFRICA_JOHANNESBURG'
  ),
  (142, 'America/Winnipeg', 'TZ_AMERICA_WINNIPEG'),
  (143, 'America/Detroit', 'TZ_AMERICA_DETROIT'),
  (
    144,
    'Australia/Melbourne',
    'TZ_AUSTRALIA_MELBOURNE'
  ),
  (145, 'Asia/Kathmandu', 'TZ_ASIA_KATHMANDU'),
  (146, 'Asia/Baku', 'TZ_ASIA_BAKU'),
  (147, 'Africa/Abidjan', 'TZ_AFRICA_ABIDJAN'),
  (
    148,
    'Africa/Addis_Ababa',
    'TZ_AFRICA_ADDIS_ABABA'
  ),
  (149, 'Africa/Algiers', 'TZ_AFRICA_ALGIERS'),
  (150, 'Africa/Asmara', 'TZ_AFRICA_ASMARA'),
  (151, 'Africa/Bamako', 'TZ_AFRICA_BAMAKO'),
  (152, 'Africa/Bangui', 'TZ_AFRICA_BANGUI'),
  (153, 'Africa/Banjul', 'TZ_AFRICA_BANJUL'),
  (154, 'Africa/Bissau', 'TZ_AFRICA_BISSAU'),
  (155, 'Africa/Blantyre', 'TZ_AFRICA_BLANTYRE'),
  (
    156,
    'Africa/Brazzaville',
    'TZ_AFRICA_BRAZZAVILLE'
  ),
  (157, 'Africa/Bujumbura', 'TZ_AFRICA_BUJUMBURA'),
  (158, 'Africa/Ceuta', 'TZ_AFRICA_CEUTA'),
  (159, 'Africa/Conakry', 'TZ_AFRICA_CONAKRY'),
  (160, 'Africa/Dakar', 'TZ_AFRICA_DAKAR'),
  (
    161,
    'Africa/Dar_Es_Salaam',
    'TZ_AFRICA_DAR_ES_SALAAM'
  ),
  (162, 'Africa/Djibouti', 'TZ_AFRICA_DJIBOUTI'),
  (163, 'Africa/Douala', 'TZ_AFRICA_DOUALA'),
  (164, 'Africa/El_Aaiun', 'TZ_AFRICA_EL_AAIUN'),
  (165, 'Africa/Freetown', 'TZ_AFRICA_FREETOWN'),
  (166, 'Africa/Gaborone', 'TZ_AFRICA_GABORONE'),
  (167, 'Africa/Harare', 'TZ_AFRICA_HARARE'),
  (168, 'Africa/Juba', 'TZ_AFRICA_JUBA'),
  (169, 'Africa/Kampala', 'TZ_AFRICA_KAMPALA'),
  (170, 'Africa/Khartoum', 'TZ_AFRICA_KHARTOUM'),
  (171, 'Africa/Kigali', 'TZ_AFRICA_KIGALI'),
  (172, 'Africa/Kinshasa', 'TZ_AFRICA_KINSHASA'),
  (173, 'Africa/Libreville', 'TZ_AFRICA_LIBREVILLE'),
  (174, 'Africa/Lome', 'TZ_AFRICA_LOME'),
  (175, 'Africa/Luanda', 'TZ_AFRICA_LUANDA'),
  (176, 'Africa/Lubumbashi', 'TZ_AFRICA_LUBUMBASHI'),
  (177, 'Africa/Lusaka', 'TZ_AFRICA_LUSAKA'),
  (178, 'Africa/Malabo', 'TZ_AFRICA_MALABO'),
  (179, 'Africa/Maputo', 'TZ_AFRICA_MAPUTO'),
  (180, 'Africa/Maseru', 'TZ_AFRICA_MASERU'),
  (181, 'Africa/Mbabane', 'TZ_AFRICA_MBABANE'),
  (182, 'Africa/Mogadishu', 'TZ_AFRICA_MOGADISHU'),
  (183, 'Africa/Monrovia', 'TZ_AFRICA_MONROVIA'),
  (184, 'Africa/Ndjamena', 'TZ_AFRICA_NDJAMENA'),
  (185, 'Africa/Niamey', 'TZ_AFRICA_NIAMEY'),
  (186, 'Africa/Nouakchott', 'TZ_AFRICA_NOUAKCHOTT'),
  (
    187,
    'Africa/Ouagadougou',
    'TZ_AFRICA_OUAGADOUGOU'
  ),
  (188, 'Africa/Porto_Novo', 'TZ_AFRICA_PORTO_NOVO'),
  (189, 'Africa/Sao_Tome', 'TZ_AFRICA_SAO_TOME'),
  (190, 'Africa/Tripoli', 'TZ_AFRICA_TRIPOLI'),
  (191, 'Africa/Windhoek', 'TZ_AFRICA_WINDHOEK'),
  (192, 'America/Adak', 'TZ_AMERICA_ADAK'),
  (193, 'America/Anguilla', 'TZ_AMERICA_ANGUILLA'),
  (194, 'America/Antigua', 'TZ_AMERICA_ANTIGUA'),
  (195, 'America/Araguaina', 'TZ_AMERICA_ARAGUAINA'),
  (
    196,
    'America/Argentina/Catamarca',
    'TZ_AMERICA_ARGENTINA_CATAMARCA'
  ),
  (
    197,
    'America/Argentina/Cordoba',
    'TZ_AMERICA_ARGENTINA_CORDOBA'
  ),
  (
    198,
    'America/Argentina/Jujuy',
    'TZ_AMERICA_ARGENTINA_JUJUY'
  ),
  (
    199,
    'America/Argentina/La_Rioja',
    'TZ_AMERICA_ARGENTINA_LA_RIOJA'
  ),
  (
    200,
    'America/Argentina/Mendoza',
    'TZ_AMERICA_ARGENTINA_MENDOZA'
  ),
  (
    201,
    'America/Argentina/Rio_Gallegos',
    'TZ_AMERICA_ARGENTINA_RIO_GALLEGOS'
  ),
  (
    202,
    'America/Argentina/San_Juan',
    'TZ_AMERICA_ARGENTINA_SAN_JUAN'
  ),
  (
    203,
    'America/Argentina/Tucuman',
    'TZ_AMERICA_ARGENTINA_TUCUMAN'
  ),
  (
    204,
    'America/Argentina/Ushuaia',
    'TZ_AMERICA_ARGENTINA_USHUAIA'
  ),
  (205, 'America/Aruba', 'TZ_AMERICA_ARUBA'),
  (206, 'America/Bahia', 'TZ_AMERICA_BAHIA'),
  (
    207,
    'America/Bahia/Banderas',
    'TZ_AMERICA_BAHIA_BANDERAS'
  ),
  (208, 'America/Barbados', 'TZ_AMERICA_BARBADOS'),
  (209, 'America/Belize', 'TZ_AMERICA_BELIZE'),
  (210, 'America/Boa_Vista', 'TZ_AMERICA_BOA_VISTA'),
  (211, 'America/Boise', 'TZ_AMERICA_BOISE'),
  (
    212,
    'America/Cambridge_Bay',
    'TZ_AMERICA_CAMBRIDGE_BAY'
  ),
  (213, 'America/Cancun', 'TZ_AMERICA_CANCUN'),
  (214, 'America/Cayenne', 'TZ_AMERICA_CAYENNE'),
  (215, 'America/Cayman', 'TZ_AMERICA_CAYMAN'),
  (216, 'America/Chihuahua', 'TZ_AMERICA_CHIHUAHUA'),
  (217, 'America/Creston', 'TZ_AMERICA_CRESTON'),
  (218, 'America/Cuiaba', 'TZ_AMERICA_CUIABA'),
  (219, 'America/Curacao', 'TZ_AMERICA_CURACAO'),
  (
    220,
    'America/Danmarkshavn',
    'TZ_AMERICA_DANMARKSHAVN'
  ),
  (221, 'America/Dominica', 'TZ_AMERICA_DOMINICA'),
  (222, 'America/Eirunepe', 'TZ_AMERICA_EIRUNEPE'),
  (
    223,
    'America/Fort_Nelson',
    'TZ_AMERICA_FORT_NELSON'
  ),
  (224, 'America/Fortaleza', 'TZ_AMERICA_FORTALEZA'),
  (225, 'America/Glace_Bay', 'TZ_AMERICA_GLACE_BAY'),
  (226, 'America/Godthab', 'TZ_AMERICA_GODTHAB'),
  (227, 'America/Goose_Bay', 'TZ_AMERICA_GOOSE_BAY'),
  (
    228,
    'America/Grand_Turk',
    'TZ_AMERICA_GRAND_TURK'
  ),
  (229, 'America/Grenada', 'TZ_AMERICA_GRENADA'),
  (
    230,
    'America/Guadeloupe',
    'TZ_AMERICA_GUADELOUPE'
  ),
  (231, 'America/Guyana', 'TZ_AMERICA_GUYANA'),
  (232, 'America/Havana', 'TZ_AMERICA_HAVANA'),
  (
    233,
    'America/Indiana/Indianapolis',
    'TZ_AMERICA_INDIANA_INDIANAPOLIS'
  ),
  (
    234,
    'America/Indiana/Knox',
    'TZ_AMERICA_INDIANA_KNOX'
  ),
  (
    235,
    'America/Indiana/Marengo',
    'TZ_AMERICA_INDIANA_MARENGO'
  ),
  (
    236,
    'America/Indiana/Petersburg',
    'TZ_AMERICA_INDIANA_PETERSBURG'
  ),
  (
    237,
    'America/Indiana/Tell_City',
    'TZ_AMERICA_INDIANA_TELL_CITY'
  ),
  (
    238,
    'America/Indiana/Vevay',
    'TZ_AMERICA_INDIANA_VEVAY'
  ),
  (
    239,
    'America/Indiana/Vincennes',
    'TZ_AMERICA_INDIANA_VINCENNES'
  ),
  (
    240,
    'America/Indiana/Winamac',
    'TZ_AMERICA_INDIANA_WINAMAC'
  ),
  (
    241,
    'America/Indianapolis',
    'TZ_AMERICA_INDIANAPOLIS'
  ),
  (242, 'America/Inuvik', 'TZ_AMERICA_INUVIK'),
  (243, 'America/Juneau', 'TZ_AMERICA_JUNEAU'),
  (
    244,
    'America/Kentucky/Louisville',
    'TZ_AMERICA_KENTUCKY_LOUISVILLE'
  ),
  (
    245,
    'America/Kentucky/Monticello',
    'TZ_AMERICA_KENTUCKY_MONTICELLO'
  ),
  (
    246,
    'America/Kralendijk',
    'TZ_AMERICA_KRALENDIJK'
  ),
  (
    247,
    'America/Lower_Princes',
    'TZ_AMERICA_LOWER_PRINCES'
  ),
  (248, 'America/Maceio', 'TZ_AMERICA_MACEIO'),
  (249, 'America/Manaus', 'TZ_AMERICA_MANAUS'),
  (250, 'America/Marigot', 'TZ_AMERICA_MARIGOT'),
  (
    251,
    'America/Martinique',
    'TZ_AMERICA_MARTINIQUE'
  ),
  (252, 'America/Matamoros', 'TZ_AMERICA_MATAMOROS'),
  (253, 'America/Menominee', 'TZ_AMERICA_MENOMINEE'),
  (254, 'America/Merida', 'TZ_AMERICA_MERIDA'),
  (
    255,
    'America/Metlakatla',
    'TZ_AMERICA_METLAKATLA'
  ),
  (256, 'America/Miquelon', 'TZ_AMERICA_MIQUELON'),
  (257, 'America/Moncton', 'TZ_AMERICA_MONCTON'),
  (258, 'America/Monterrey', 'TZ_AMERICA_MONTERREY'),
  (259, 'America/Montreal', 'TZ_AMERICA_MONTREAL'),
  (
    260,
    'America/Montserrat',
    'TZ_AMERICA_MONTSERRAT'
  ),
  (261, 'America/Nipigon', 'TZ_AMERICA_NIPIGON'),
  (262, 'America/Nome', 'TZ_AMERICA_NOME'),
  (
    263,
    'America/North_Dakota/Beulah',
    'TZ_AMERICA_NORTH_DAKOTA_BEULAH'
  ),
  (
    264,
    'America/North_Dakota/Center',
    'TZ_AMERICA_NORTH_DAKOTA_CENTER'
  ),
  (
    265,
    'America/North_Dakota/New_Salem',
    'TZ_AMERICA_NORTH_DAKOTA_NEW_SALEM'
  ),
  (266, 'America/Ojinaga', 'TZ_AMERICA_OJINAGA'),
  (
    267,
    'America/Pangnirtung',
    'TZ_AMERICA_PANGNIRTUNG'
  ),
  (
    268,
    'America/Paramaribo',
    'TZ_AMERICA_PARAMARIBO'
  ),
  (
    269,
    'America/Port_Au_Prince',
    'TZ_AMERICA_PORT_AU_PRINCE'
  ),
  (
    270,
    'America/Porto_Velho',
    'TZ_AMERICA_PORTO_VELHO'
  ),
  (
    271,
    'America/Punta_Arenas',
    'TZ_AMERICA_PUNTA_ARENAS'
  ),
  (
    272,
    'America/Rankin_Inlet',
    'TZ_AMERICA_RANKIN_INLET'
  ),
  (273, 'America/Recife', 'TZ_AMERICA_RECIFE'),
  (274, 'America/Resolute', 'TZ_AMERICA_RESOLUTE'),
  (
    275,
    'America/Rio_Branco',
    'TZ_AMERICA_RIO_BRANCO'
  ),
  (276, 'America/Santarem', 'TZ_AMERICA_SANTAREM'),
  (
    277,
    'America/Scoresbysund',
    'TZ_AMERICA_SCORESBYSUND'
  ),
  (278, 'America/Sitka', 'TZ_AMERICA_SITKA'),
  (
    279,
    'America/St_Barthelemy',
    'TZ_AMERICA_ST_BARTHELEMY'
  ),
  (280, 'America/St_Kitts', 'TZ_AMERICA_ST_KITTS'),
  (281, 'America/St_Lucia', 'TZ_AMERICA_ST_LUCIA'),
  (282, 'America/St_Thomas', 'TZ_AMERICA_ST_THOMAS'),
  (
    283,
    'America/St_Vincent',
    'TZ_AMERICA_ST_VINCENT'
  ),
  (
    284,
    'America/Swift_Current',
    'TZ_AMERICA_SWIFT_CURRENT'
  ),
  (285, 'America/Thule', 'TZ_AMERICA_THULE'),
  (
    286,
    'America/Thunder_Bay',
    'TZ_AMERICA_THUNDER_BAY'
  ),
  (287, 'America/Tortola', 'TZ_AMERICA_TORTOLA'),
  (
    288,
    'America/Whitehorse',
    'TZ_AMERICA_WHITEHORSE'
  ),
  (289, 'America/Yakutat', 'TZ_AMERICA_YAKUTAT'),
  (
    290,
    'America/Yellowknife',
    'TZ_AMERICA_YELLOWKNIFE'
  ),
  (291, 'Antarctica/Casey', 'TZ_ANTARCTICA_CASEY'),
  (292, 'Antarctica/Davis', 'TZ_ANTARCTICA_DAVIS'),
  (
    293,
    'Antarctica/Dumontdurville',
    'TZ_ANTARCTICA_DUMONTDURVILLE'
  ),
  (
    294,
    'Antarctica/Macquarie',
    'TZ_ANTARCTICA_MACQUARIE'
  ),
  (295, 'Antarctica/Mawson', 'TZ_ANTARCTICA_MAWSON'),
  (
    296,
    'Antarctica/Mcmurdo',
    'TZ_ANTARCTICA_MCMURDO'
  ),
  (297, 'Antarctica/Palmer', 'TZ_ANTARCTICA_PALMER'),
  (
    298,
    'Antarctica/Rothera',
    'TZ_ANTARCTICA_ROTHERA'
  ),
  (299, 'Antarctica/Syowa', 'TZ_ANTARCTICA_SYOWA'),
  (300, 'Antarctica/Troll', 'TZ_ANTARCTICA_TROLL'),
  (301, 'Antarctica/Vostok', 'TZ_ANTARCTICA_VOSTOK'),
  (
    302,
    'Arctic/Longyearbyen',
    'TZ_ARCTIC_LONGYEARBYEN'
  ),
  (303, 'Asia/Aden', 'TZ_ASIA_ADEN'),
  (304, 'Asia/Almaty', 'TZ_ASIA_ALMATY'),
  (305, 'Asia/Anadyr', 'TZ_ASIA_ANADYR'),
  (306, 'Asia/Aqtau', 'TZ_ASIA_AQTAU'),
  (307, 'Asia/Aqtobe', 'TZ_ASIA_AQTOBE'),
  (308, 'Asia/Ashgabat', 'TZ_ASIA_ASHGABAT'),
  (309, 'Asia/Atyrau', 'TZ_ASIA_ATYRAU'),
  (310, 'Asia/Barnaul', 'TZ_ASIA_BARNAUL'),
  (311, 'Asia/Bishkek', 'TZ_ASIA_BISHKEK'),
  (312, 'Asia/Brunei', 'TZ_ASIA_BRUNEI'),
  (313, 'Asia/Chita', 'TZ_ASIA_CHITA'),
  (314, 'Asia/Choibalsan', 'TZ_ASIA_CHOIBALSAN'),
  (315, 'Asia/Damascus', 'TZ_ASIA_DAMASCUS'),
  (316, 'Asia/Dili', 'TZ_ASIA_DILI'),
  (317, 'Asia/Dushanbe', 'TZ_ASIA_DUSHANBE'),
  (318, 'Asia/Famagusta', 'TZ_ASIA_FAMAGUSTA'),
  (319, 'Asia/Hebron', 'TZ_ASIA_HEBRON'),
  (320, 'Asia/Hovd', 'TZ_ASIA_HOVD'),
  (321, 'Asia/Istanbul', 'TZ_ASIA_ISTANBUL'),
  (322, 'Asia/Kabul', 'TZ_ASIA_KABUL'),
  (323, 'Asia/Khandyga', 'TZ_ASIA_KHANDYGA'),
  (324, 'Asia/Kuching', 'TZ_ASIA_KUCHING'),
  (325, 'Asia/Macau', 'TZ_ASIA_MACAU'),
  (326, 'Asia/Novokuznetsk', 'TZ_ASIA_NOVOKUZNETSK'),
  (327, 'Asia/Novosibirsk', 'TZ_ASIA_NOVOSIBIRSK'),
  (328, 'Asia/Oral', 'TZ_ASIA_ORAL'),
  (329, 'Asia/Phnom_Penh', 'TZ_ASIA_PHNOM_PENH'),
  (330, 'Asia/Pontianak', 'TZ_ASIA_PONTIANAK'),
  (331, 'Asia/Pyongyang', 'TZ_ASIA_PYONGYANG'),
  (332, 'Asia/Qostanay', 'TZ_ASIA_QOSTANAY'),
  (333, 'Asia/Qyzylorda', 'TZ_ASIA_QYZYLORDA'),
  (334, 'Asia/Sakhalin', 'TZ_ASIA_SAKHALIN'),
  (335, 'Asia/Samarkand', 'TZ_ASIA_SAMARKAND'),
  (
    336,
    'Asia/Srednekolymsk',
    'TZ_ASIA_SREDNEKOLYMSK'
  ),
  (337, 'Asia/Tashkent', 'TZ_ASIA_TASHKENT'),
  (338, 'Asia/Tbilisi', 'TZ_ASIA_TBILISI'),
  (339, 'Asia/Tehran', 'TZ_ASIA_TEHRAN'),
  (340, 'Asia/Thimphu', 'TZ_ASIA_THIMPHU'),
  (341, 'Asia/Tomsk', 'TZ_ASIA_TOMSK'),
  (342, 'Asia/Ulaanbaatar', 'TZ_ASIA_ULAANBAATAR'),
  (343, 'Asia/Urumqi', 'TZ_ASIA_URUMQI'),
  (344, 'Asia/Ust_Nera', 'TZ_ASIA_UST_NERA'),
  (345, 'Asia/Vientiane', 'TZ_ASIA_VIENTIANE'),
  (346, 'Asia/Yangon', 'TZ_ASIA_YANGON'),
  (347, 'Asia/Yerevan', 'TZ_ASIA_YEREVAN'),
  (348, 'Atlantic/Bermuda', 'TZ_ATLANTIC_BERMUDA'),
  (
    349,
    'Atlantic/Cape_Verde',
    'TZ_ATLANTIC_CAPE_VERDE'
  ),
  (350, 'Atlantic/Faroe', 'TZ_ATLANTIC_FAROE'),
  (351, 'Atlantic/Madeira', 'TZ_ATLANTIC_MADEIRA'),
  (
    352,
    'Atlantic/South_Georgia',
    'TZ_ATLANTIC_SOUTH_GEORGIA'
  ),
  (
    353,
    'Atlantic/St_Helena',
    'TZ_ATLANTIC_ST_HELENA'
  ),
  (354, 'Atlantic/Stanley', 'TZ_ATLANTIC_STANLEY'),
  (
    355,
    'Australia/Adelaide',
    'TZ_AUSTRALIA_ADELAIDE'
  ),
  (
    356,
    'Australia/Brisbane',
    'TZ_AUSTRALIA_BRISBANE'
  ),
  (357, 'Australia/Currie', 'TZ_AUSTRALIA_CURRIE'),
  (358, 'Australia/Darwin', 'TZ_AUSTRALIA_DARWIN'),
  (359, 'Australia/Eucla', 'TZ_AUSTRALIA_EUCLA'),
  (360, 'Australia/Hobart', 'TZ_AUSTRALIA_HOBART'),
  (
    361,
    'Australia/Lindeman',
    'TZ_AUSTRALIA_LINDEMAN'
  ),
  (
    362,
    'Australia/Lord_Howe',
    'TZ_AUSTRALIA_LORD_HOWE'
  ),
  (363, 'CET', 'TZ_CET'),
  (364, 'CST6CDT', 'TZ_CST6CDT'),
  (365, 'EET', 'TZ_EET'),
  (366, 'EST', 'TZ_EST'),
  (367, 'EST5EDT', 'TZ_EST5EDT'),
  (368, 'Etc/GMT', 'TZ_ETC_GMT'),
  (369, 'Etc/GMT+0', 'TZ_ETC_GMT_PLUS_0'),
  (370, 'Etc/GMT+1', 'TZ_ETC_GMT_PLUS_1'),
  (371, 'Etc/GMT+10', 'TZ_ETC_GMT_PLUS_10'),
  (372, 'Etc/GMT+11', 'TZ_ETC_GMT_PLUS_11'),
  (373, 'Etc/GMT+12', 'TZ_ETC_GMT_PLUS_12'),
  (374, 'Etc/GMT+2', 'TZ_ETC_GMT_PLUS_2'),
  (375, 'Etc/GMT+3', 'TZ_ETC_GMT_PLUS_3'),
  (376, 'Etc/GMT+4', 'TZ_ETC_GMT_PLUS_4'),
  (377, 'Etc/GMT+5', 'TZ_ETC_GMT_PLUS_5'),
  (378, 'Etc/GMT+6', 'TZ_ETC_GMT_PLUS_6'),
  (379, 'Etc/GMT+7', 'TZ_ETC_GMT_PLUS_7'),
  (380, 'Etc/GMT+8', 'TZ_ETC_GMT_PLUS_8'),
  (381, 'Etc/GMT+9', 'TZ_ETC_GMT_PLUS_9'),
  (382, 'Etc/GMT-0', 'TZ_ETC_GMT_MINUS_0'),
  (383, 'Etc/GMT-1', 'TZ_ETC_GMT_MINUS_1'),
  (384, 'Etc/GMT-10', 'TZ_ETC_GMT_MINUS_10'),
  (385, 'Etc/GMT-11', 'TZ_ETC_GMT_MINUS_11'),
  (386, 'Etc/GMT-12', 'TZ_ETC_GMT_MINUS_12'),
  (387, 'Etc/GMT-13', 'TZ_ETC_GMT_MINUS_13'),
  (388, 'Etc/GMT-14', 'TZ_ETC_GMT_MINUS_14'),
  (389, 'Etc/GMT-2', 'TZ_ETC_GMT_MINUS_2'),
  (390, 'Etc/GMT-3', 'TZ_ETC_GMT_MINUS_3'),
  (391, 'Etc/GMT-4', 'TZ_ETC_GMT_MINUS_4'),
  (392, 'Etc/GMT-5', 'TZ_ETC_GMT_MINUS_5'),
  (393, 'Etc/GMT-6', 'TZ_ETC_GMT_MINUS_6'),
  (394, 'Etc/GMT-7', 'TZ_ETC_GMT_MINUS_7'),
  (395, 'Etc/GMT-8', 'TZ_ETC_GMT_MINUS_8'),
  (396, 'Etc/GMT-9', 'TZ_ETC_GMT_MINUS_9'),
  (397, 'Etc/GMT0', 'TZ_ETC_GMT0'),
  (398, 'Etc/Greenwich', 'TZ_ETC_GREENWICH'),
  (399, 'Etc/Universal', 'TZ_ETC_UNIVERSAL'),
  (400, 'Etc/Zulu', 'TZ_ETC_ZULU'),
  (401, 'Europe/Andorra', 'TZ_EUROPE_ANDORRA'),
  (402, 'Europe/Astrakhan', 'TZ_EUROPE_ASTRAKHAN'),
  (403, 'Europe/Busingen', 'TZ_EUROPE_BUSINGEN'),
  (404, 'Europe/Chisinau', 'TZ_EUROPE_CHISINAU'),
  (405, 'Europe/Gibraltar', 'TZ_EUROPE_GIBRALTAR'),
  (406, 'Europe/Guernsey', 'TZ_EUROPE_GUERNSEY'),
  (
    407,
    'Europe/Isle_Of_Man',
    'TZ_EUROPE_ISLE_OF_MAN'
  ),
  (408, 'Europe/Jersey', 'TZ_EUROPE_JERSEY'),
  (409, 'Europe/Kirov', 'TZ_EUROPE_KIROV'),
  (410, 'Europe/Mariehamn', 'TZ_EUROPE_MARIEHAMN'),
  (411, 'Europe/Minsk', 'TZ_EUROPE_MINSK'),
  (412, 'Europe/Monaco', 'TZ_EUROPE_MONACO'),
  (413, 'Europe/Nicosia', 'TZ_EUROPE_NICOSIA'),
  (414, 'Europe/Podgorica', 'TZ_EUROPE_PODGORICA'),
  (415, 'Europe/San_Marino', 'TZ_EUROPE_SAN_MARINO'),
  (416, 'Europe/Saratov', 'TZ_EUROPE_SARATOV'),
  (417, 'Europe/Simferopol', 'TZ_EUROPE_SIMFEROPOL'),
  (418, 'Europe/Tirane', 'TZ_EUROPE_TIRANE'),
  (419, 'Europe/Ulyanovsk', 'TZ_EUROPE_ULYANOVSK'),
  (420, 'Europe/Uzhgorod', 'TZ_EUROPE_UZHGOROD'),
  (421, 'Europe/Vaduz', 'TZ_EUROPE_VADUZ'),
  (422, 'Europe/Vatican', 'TZ_EUROPE_VATICAN'),
  (423, 'Europe/Volgograd', 'TZ_EUROPE_VOLGOGRAD'),
  (424, 'Europe/Zaporozhye', 'TZ_EUROPE_ZAPOROZHYE'),
  (425, 'GMT', 'TZ_GMT'),
  (426, 'HST', 'TZ_HST'),
  (
    427,
    'Indian/Antananarivo',
    'TZ_INDIAN_ANTANANARIVO'
  ),
  (428, 'Indian/Chagos', 'TZ_INDIAN_CHAGOS'),
  (429, 'Indian/Christmas', 'TZ_INDIAN_CHRISTMAS'),
  (430, 'Indian/Cocos', 'TZ_INDIAN_COCOS'),
  (431, 'Indian/Comoro', 'TZ_INDIAN_COMORO'),
  (432, 'Indian/Kerguelen', 'TZ_INDIAN_KERGUELEN'),
  (433, 'Indian/Mahe', 'TZ_INDIAN_MAHE'),
  (434, 'Indian/Mayotte', 'TZ_INDIAN_MAYOTTE'),
  (435, 'Indian/Reunion', 'TZ_INDIAN_REUNION'),
  (436, 'MET', 'TZ_MET'),
  (437, 'MST', 'TZ_MST'),
  (438, 'MST7MDT', 'TZ_MST7MDT'),
  (439, 'PST8PDT', 'TZ_PST8PDT'),
  (440, 'Pacific/Apia', 'TZ_PACIFIC_APIA'),
  (
    441,
    'Pacific/Bougainville',
    'TZ_PACIFIC_BOUGAINVILLE'
  ),
  (442, 'Pacific/Chatham', 'TZ_PACIFIC_CHATHAM'),
  (443, 'Pacific/Chuuk', 'TZ_PACIFIC_CHUUK'),
  (444, 'Pacific/Efate', 'TZ_PACIFIC_EFATE'),
  (445, 'Pacific/Enderbury', 'TZ_PACIFIC_ENDERBURY'),
  (446, 'Pacific/Fakaofo', 'TZ_PACIFIC_FAKAOFO'),
  (447, 'Pacific/Fiji', 'TZ_PACIFIC_FIJI'),
  (448, 'Pacific/Funafuti', 'TZ_PACIFIC_FUNAFUTI'),
  (449, 'Pacific/Gambier', 'TZ_PACIFIC_GAMBIER'),
  (
    450,
    'Pacific/Guadalcanal',
    'TZ_PACIFIC_GUADALCANAL'
  ),
  (451, 'Pacific/Guam', 'TZ_PACIFIC_GUAM'),
  (
    452,
    'Pacific/Kiritimati',
    'TZ_PACIFIC_KIRITIMATI'
  ),
  (453, 'Pacific/Kosrae', 'TZ_PACIFIC_KOSRAE'),
  (454, 'Pacific/Kwajalein', 'TZ_PACIFIC_KWAJALEIN'),
  (455, 'Pacific/Majuro', 'TZ_PACIFIC_MAJURO'),
  (456, 'Pacific/Marquesas', 'TZ_PACIFIC_MARQUESAS'),
  (457, 'Pacific/Midway', 'TZ_PACIFIC_MIDWAY'),
  (458, 'Pacific/Nauru', 'TZ_PACIFIC_NAURU'),
  (459, 'Pacific/Niue', 'TZ_PACIFIC_NIUE'),
  (460, 'Pacific/Norfolk', 'TZ_PACIFIC_NORFOLK'),
  (461, 'Pacific/Noumea', 'TZ_PACIFIC_NOUMEA'),
  (462, 'Pacific/Pago_Pago', 'TZ_PACIFIC_PAGO_PAGO'),
  (463, 'Pacific/Palau', 'TZ_PACIFIC_PALAU'),
  (464, 'Pacific/Pitcairn', 'TZ_PACIFIC_PITCAIRN'),
  (465, 'Pacific/Pohnpei', 'TZ_PACIFIC_POHNPEI'),
  (
    466,
    'Pacific/Port_Moresby',
    'TZ_PACIFIC_PORT_MORESBY'
  ),
  (467, 'Pacific/Rarotonga', 'TZ_PACIFIC_RAROTONGA'),
  (468, 'Pacific/Saipan', 'TZ_PACIFIC_SAIPAN'),
  (469, 'Pacific/Tahiti', 'TZ_PACIFIC_TAHITI'),
  (470, 'Pacific/Tarawa', 'TZ_PACIFIC_TARAWA'),
  (471, 'Pacific/Tongatapu', 'TZ_PACIFIC_TONGATAPU'),
  (472, 'Pacific/Wake', 'TZ_PACIFIC_WAKE'),
  (473, 'Pacific/Wallis', 'TZ_PACIFIC_WALLIS'),
  (474, 'UTC', 'TZ_UTC'),
  (475, 'WET', 'TZ_WET')

