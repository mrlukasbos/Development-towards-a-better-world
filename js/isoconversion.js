//this file is for the conversion from names ("the netherlands") to two and/or three letter codes. (NL or NED)
// useful for making shortened classnames, and for use with datamaps.

var isoCountries = { 'AF' : 'Afghanistan', 'AX' : 'Aland Islands', 'AL' :
'Albania', 'DZ' : 'Algeria', 'AS' : 'American Samoa', 'AD' : 'Andorra', 'AO' :
'Angola', 'AI' : 'Anguilla', 'AQ' : 'Antarctica', 'AG' : 'Antigua And Barbuda',
'AR' : 'Argentina', 'AM' : 'Armenia', 'AW' : 'Aruba', 'AU' : 'Australia', 'AT' :
'Austria', 'AZ' : 'Azerbaijan', 'BS' : 'Bahamas', 'BH' : 'Bahrain', 'BD' :
'Bangladesh', 'BB' : 'Barbados', 'BY' : 'Belarus', 'BE' : 'Belgium', 'BZ' :
'Belize', 'BJ' : 'Benin', 'BM' : 'Bermuda', 'BT' : 'Bhutan', 'BO' : 'Bolivia',
'BA' : 'Bosnia and Herzegovina', 'BW' : 'Botswana', 'BV' : 'Bouvet Island', 'BR' :
'Brazil', 'IO' : 'British Indian Ocean Territory', 'BN' : 'Brunei Darussalam',
'BG' : 'Bulgaria', 'BF' : 'Burkina Faso', 'BI' : 'Burundi', 'KH' : 'Cambodia',
'CM' : 'Cameroon', 'CA' : 'Canada', 'CV' : 'Cape Verde', 'KY' : 'CaymanIslands',
'CF' : 'Central African Republic', 'TD' : 'Chad', 'CL' : 'Chile', 'CN' :
'China', 'CX' : 'Christmas Island', 'CC' : 'Cocos (Keeling) Islands', 'CO' :
'Colombia', 'KM' : 'Comoros', 'CG' : 'Congo', 'CD' : 'Congo, Democratic Republic',
'CK' : 'Cook Islands', 'CR' : 'Costa Rica', 'CI' : 'Cote D\'Ivoire',
'HR' : 'Croatia', 'CU' : 'Cuba', 'CY' : 'Cyprus', 'CZ' : 'Czech Republic', 'DK' :
'Denmark', 'DJ' : 'Djibouti', 'DM' : 'Dominica', 'DO' : 'Dominican Republic',
'EC' : 'Ecuador', 'EG' : 'Egypt', 'SV' : 'El Salvador', 'GQ' : 'Equatorial Guinea',
'ER' : 'Eritrea', 'EE' : 'Estonia', 'ET' : 'Ethiopia', 'FK' : 'Falkland Islands (Malvinas)',
'FO' : 'Faroe Islands', 'FJ' : 'Fiji', 'FI' : 'Finland',
'FR' : 'France', 'GF' : 'French Guiana', 'PF' : 'French Polynesia', 'TF' :
'French Southern Territories', 'GA' : 'Gabon', 'GM' : 'Gambia', 'GE' :
'Georgia', 'DE' : 'Germany', 'GH' : 'Ghana', 'GI' : 'Gibraltar', 'GR' :
'Greece', 'GL' : 'Greenland', 'GD' : 'Grenada', 'GP' : 'Guadeloupe', 'GU' :
'Guam', 'GT' : 'Guatemala', 'GG' : 'Guernsey', 'GN' : 'Guinea', 'GW' :
'Guinea-Bissau', 'GY' : 'Guyana', 'HT' : 'Haiti', 'HM' : 'Heard Island & Mcdonald Islands',
'VA' : 'Holy See (Vatican City State)', 'HN' : 'Honduras',
'HK' : 'Hong Kong', 'HU' : 'Hungary', 'IS' : 'Iceland', 'IN' : 'India', 'ID' :
'Indonesia', 'IR' : 'Iran, Islamic Republic Of', 'IQ' : 'Iraq', 'IE' :
'Ireland', 'IM' : 'Isle Of Man', 'IL' : 'Israel', 'IT' : 'Italy', 'JM' :
'Jamaica', 'JP' : 'Japan', 'JE' : 'Jersey', 'JO' : 'Jordan', 'KZ' :
'Kazakhstan', 'KE' : 'Kenya', 'KI' : 'Kiribati', 'KR' : 'Korea', 'KW' :
'Kuwait', 'KG' : 'Kyrgyzstan', 'LA' : 'Lao People\'s Democratic Republic', 'LV' :
'Latvia', 'LB' : 'Lebanon', 'LS' : 'Lesotho', 'LR' : 'Liberia', 'LY' : 'Libya',
'LI' : 'Liechtenstein', 'LT' : 'Lithuania', 'LU' : 'Luxembourg', 'MO' : 'Macao',
'MK' : 'Macedonia', 'MG' : 'Madagascar', 'MW' : 'Malawi', 'MY' : 'Malaysia',
'MV' : 'Maldives', 'ML' : 'Mali', 'MT' : 'Malta', 'MH' : 'Marshall Islands',
'MQ' : 'Martinique', 'MR' : 'Mauritania', 'MU' : 'Mauritius', 'YT' : 'Mayotte',
'MX' : 'Mexico', 'FM' : 'Micronesia, Federated States Of', 'MD' : 'Moldova',
'MC' : 'Monaco', 'MN' : 'Mongolia', 'ME' : 'Montenegro', 'MS' : 'Montserrat',
'MA' : 'Morocco', 'MZ' : 'Mozambique', 'MM' : 'Myanmar', 'NA' : 'Namibia', 'NR' :
'Nauru', 'NP' : 'Nepal', 'NL' : 'Netherlands', 'AN' : 'Netherlands Antilles',
'NC' : 'New Caledonia', 'NZ' : 'New Zealand', 'NI' : 'Nicaragua', 'NE' :
'Niger', 'NG' : 'Nigeria', 'NU' : 'Niue', 'NF' : 'Norfolk Island', 'MP' :
'Northern Mariana Islands', 'NO' : 'Norway', 'OM' : 'Oman', 'PK' : 'Pakistan',
'PW' : 'Palau', 'PS' : 'Palestinian Territory, Occupied', 'PA' : 'Panama', 'PG' :
'Papua New Guinea', 'PY' : 'Paraguay', 'PE' : 'Peru', 'PH' : 'Philippines', 'PN' :
'Pitcairn', 'PL' : 'Poland', 'PT' : 'Portugal', 'PR' : 'Puerto Rico', 'QA' :
'Qatar', 'RE' : 'Reunion', 'RO' : 'Romania', 'RU' : 'Russian Federation', 'RW' :
'Rwanda', 'BL' : 'Saint Barthelemy', 'SH' : 'Saint Helena', 'KN' : 'Saint Kitts And Nevis',
'LC' : 'Saint Lucia', 'MF' : 'Saint Martin', 'PM' : 'Saint Pierre And Miquelon',
'VC' : 'Saint Vincent And Grenadines', 'WS' : 'Samoa', 'SM' :
'San Marino', 'ST' : 'Sao Tome And Principe', 'SA' : 'Saudi Arabia', 'SN' :
'Senegal', 'RS' : 'Serbia', 'SC' : 'Seychelles', 'SL' : 'Sierra Leone', 'SG' :
'Singapore', 'SK' : 'Slovakia', 'SI' : 'Slovenia', 'SB' : 'Solomon Islands',
'SO' : 'Somalia', 'ZA' : 'South Africa', 'GS' : 'South Georgia And Sandwich Isl.',
'ES' : 'Spain', 'LK' : 'Sri Lanka', 'SD' : 'Sudan', 'SR' : 'Suriname',
'SJ' : 'Svalbard And Jan Mayen', 'SZ' : 'Swaziland', 'SE' : 'Sweden', 'CH' :
'Switzerland', 'SY' : 'Syrian Arab Republic', 'TW' : 'Taiwan', 'TJ' :
'Tajikistan', 'TZ' : 'Tanzania', 'TH' : 'Thailand', 'TL' : 'Timor-Leste', 'TG' :
'Togo', 'TK' : 'Tokelau', 'TO' : 'Tonga', 'TT' : 'Trinidad And Tobago', 'TN' :
'Tunisia', 'TR' : 'Turkey', 'TM' : 'Turkmenistan', 'TC' : 'Turks And Caicos Islands',
'TV' : 'Tuvalu', 'UG' : 'Uganda', 'UA' : 'Ukraine', 'AE' : 'United Arab Emirates',
'GB' : 'United Kingdom', 'US' : 'United States', 'UM' : 'United States Outlying Islands',
'UY' : 'Uruguay', 'UZ' : 'Uzbekistan', 'VU' : 'Vanuatu', 'VE' : 'Venezuela', 'VN' : 'Viet Nam',
'VG' : 'Virgin Islands, British', 'VI' : 'Virgin Islands, U.S.', 'WF' : 'Wallis And Futuna', 'EH' :
'Western Sahara', 'YE' : 'Yemen', 'ZM' : 'Zambia', 'ZW' : 'Zimbabwe' };


var isoAlpha3Countries = {"BD": "BGD", "BE": "BEL", "BF": "BFA", "BG": "BGR",
"BA": "BIH", "BB": "BRB", "WF": "WLF", "BL": "BLM", "BM": "BMU", "BN": "BRN",
"BO": "BOL", "BH": "BHR", "BI": "BDI", "BJ": "BEN", "BT": "BTN", "JM": "JAM",
"BV": "BVT", "BW": "BWA", "WS": "WSM", "BQ": "BES", "BR": "BRA", "BS": "BHS",
"JE": "JEY", "BY": "BLR", "BZ": "BLZ", "RU": "RUS", "RW": "RWA", "RS": "SRB",
"TL": "TLS", "RE": "REU", "TM": "TKM", "TJ": "TJK", "RO": "ROU", "TK": "TKL",
"GW": "GNB", "GU": "GUM", "GT": "GTM", "GS": "SGS", "GR": "GRC", "GQ": "GNQ",
"GP": "GLP", "JP": "JPN", "GY": "GUY", "GG": "GGY", "GF": "GUF", "GE": "GEO",
"GD": "GRD", "GB": "GBR", "GA": "GAB", "SV": "SLV", "GN": "GIN", "GM": "GMB",
"GL": "GRL", "GI": "GIB", "GH": "GHA", "OM": "OMN", "TN": "TUN", "JO": "JOR",
"HR": "HRV", "HT": "HTI", "HU": "HUN", "HK": "HKG", "HN": "HND", "HM": "HMD",
"VE": "VEN", "PR": "PRI", "PS": "PSE", "PW": "PLW", "PT": "PRT", "SJ": "SJM",
"PY": "PRY", "IQ": "IRQ", "PA": "PAN", "PF": "PYF", "PG": "PNG", "PE": "PER",
"PK": "PAK", "PH": "PHL", "PN": "PCN", "PL": "POL", "PM": "SPM", "ZM": "ZMB",
"EH": "ESH", "EE": "EST", "EG": "EGY", "ZA": "ZAF", "EC": "ECU", "IT": "ITA",
"VN": "VNM", "SB": "SLB", "ET": "ETH", "SO": "SOM", "ZW": "ZWE", "SA": "SAU",
"ES": "ESP", "ER": "ERI", "ME": "MNE", "MD": "MDA", "MG": "MDG", "MF": "MAF",
"MA": "MAR", "MC": "MCO", "UZ": "UZB", "MM": "MMR", "ML": "MLI", "MO": "MAC",
"MN": "MNG", "MH": "MHL", "MK": "MKD", "MU": "MUS", "MT": "MLT", "MW": "MWI",
"MV": "MDV", "MQ": "MTQ", "MP": "MNP", "MS": "MSR", "MR": "MRT", "IM": "IMN",
"UG": "UGA", "TZ": "TZA", "MY": "MYS", "MX": "MEX", "IL": "ISR", "FR": "FRA",
"IO": "IOT", "SH": "SHN", "FI": "FIN", "FJ": "FJI", "FK": "FLK", "FM": "FSM",
"FO": "FRO", "NI": "NIC", "NL": "NLD", "NO": "NOR", "NA": "NAM", "VU": "VUT",
"NC": "NCL", "NE": "NER", "NF": "NFK", "NG": "NGA", "NZ": "NZL", "NP": "NPL",
"NR": "NRU", "NU": "NIU", "CK": "COK", "XK": "XKX", "CI": "CIV", "CH": "CHE",
"CO": "COL", "CN": "CHN", "CM": "CMR", "CL": "CHL", "CC": "CCK", "CA": "CAN",
"CG": "COG", "CF": "CAF", "CD": "COD", "CZ": "CZE", "CY": "CYP", "CX": "CXR",
"CR": "CRI", "CW": "CUW", "CV": "CPV", "CU": "CUB", "SZ": "SWZ", "SY": "SYR",
"SX": "SXM", "KG": "KGZ", "KE": "KEN", "SS": "SSD", "SR": "SUR", "KI": "KIR",
"KH": "KHM", "KN": "KNA", "KM": "COM", "ST": "STP", "SK": "SVK", "KR": "KOR",
"SI": "SVN", "KP": "PRK", "KW": "KWT", "SN": "SEN", "SM": "SMR", "SL": "SLE",
"SC": "SYC", "KZ": "KAZ", "KY": "CYM", "SG": "SGP", "SE": "SWE", "SD": "SDN",
"DO": "DOM", "DM": "DMA", "DJ": "DJI", "DK": "DNK", "VG": "VGB", "DE": "DEU",
"YE": "YEM", "DZ": "DZA", "US": "USA", "UY": "URY", "YT": "MYT", "UM": "UMI",
"LB": "LBN", "LC": "LCA", "LA": "LAO", "TV": "TUV", "TW": "TWN", "TT": "TTO",
"TR": "TUR", "LK": "LKA", "LI": "LIE", "LV": "LVA", "TO": "TON", "LT": "LTU",
"LU": "LUX", "LR": "LBR", "LS": "LSO", "TH": "THA", "TF": "ATF", "TG": "TGO",
"TD": "TCD", "TC": "TCA", "LY": "LBY", "VA": "VAT", "VC": "VCT", "AE": "ARE",
"AD": "AND", "AG": "ATG", "AF": "AFG", "AI": "AIA", "VI": "VIR", "IS": "ISL",
"IR": "IRN", "AM": "ARM", "AL": "ALB", "AO": "AGO", "AQ": "ATA", "AS": "ASM",
"AR": "ARG", "AU": "AUS", "AT": "AUT", "AW": "ABW", "IN": "IND", "AX": "ALA",
"AZ": "AZE", "IE": "IRL", "ID": "IDN", "UA": "UKR", "QA": "QAT", "MZ": "MOZ"}

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}
//code to reverse isocountries.
var inverseisoCountries = {};

for(i in isoCountries) {
   inverseisoCountries[isoCountries[i]] = i;
}

var inverseisoAlphaCountries = {};
for(i in isoAlpha3Countries) {
   inverseisoAlphaCountries[isoAlpha3Countries[i]] = i;
}
