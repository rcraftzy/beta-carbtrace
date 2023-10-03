import { useState } from 'react';


const useFuels = () => {
    const [fuels, setFuels] = useState({
        liquid: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            spirit: {
              label: 'Aviation spirit',
              tonnesFactor: 3192.76,
              litresFactor: 2.33,
              kwhFactor: 0.26,
            },
            turbine: {
              label: 'Aviation turbine fuel',
              tonnesFactor: 3181.43,
              litresFactor: 2.55,
              kwhFactor: 0.26,
            },
            burning: {
              label: 'Burning oil',
              tonnesFactor: 3165.01,
              litresFactor: 2.54,
              kwhFactor: 0.26,
            },
            diesel: {
              label: 'Diesel (average biofuel blend)',
              tonnesFactor: 3032.89,
              litresFactor: 2.56,
              kwhFactor: 0.26,         
            },
            dieselMineral: {
              label: 'Diesel (100% mineral diesel)',
              tonnesFactor: 3208.76,
              litresFactor: 2.7,
              kwhFactor: 0.27,        
            },
            gas: {
              label: 'Gas oil',
              tonnesFactor: 3230.28,
              litresFactor: 2.76,
              kwhFactor: 0.27, 
            },
            lubricants: {
              label: 'Lubricants',
              tonnesFactor: 3181.44,
              litresFactor: 2.75,
              kwhFactor: 0.28, 
            },
            naphtha: {
              label: 'Naphtha',
              tonnesFactor: 3142.87,
              litresFactor: 2.12,
              kwhFactor: 0.25, 
            },
            petrolBio: {
              label: 'Petrol (average biofuel blend)',
              tonnesFactor: 2903.08,
              litresFactor: 2.16,
              kwhFactor: 0.24,         
            },
            petrolMineral: {
              label: 'Petrol (100% mineral petrol)',
              tonnesFactor: 3153.9,
              litresFactor: 2.34,
              kwhFactor: 0.25,         
            },
            processedFuelResidual: {
              label: 'Processed fuel oils - residual oil',
              tonnesFactor: 3229.2,
              litresFactor: 3.18,
              kwhFactor: 0.29, 
            },
            processedFuelDistillate: {
              label: 'Processed fuel oils - distillate oil',
              tonnesFactor: 3230.28,
              litresFactor: 2.76,
              kwhFactor: 0.27, 
            },
            wasteOils: {
              label: 'Waste oils',
              tonnesFactor: 3224.57,
              litresFactor: 2.75,
              kwhFactor: 0.28, 
            },
            marineGasOil: {
              label: 'Marine gas oil',
              tonnesFactor: 3249.99,
              litresFactor: 2.78,
              kwhFactor: 0.27, 
            },
            marineFuelOil: {
              label: 'Marine fuel oil',
              tonnesFactor: 3159.5,
              litresFactor: 3.11,
              kwhFactor: 0.28, 
            },
          },
        },
        gaseous: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            butane: {
              label: 'Butane',
              tonnesFactor: 3033.32,
              litresFactor: 1.75,
              kwhFactor: 0.24, 
            },
            cng: {
              label: 'CNG',
              tonnesFactor: 2539.25,
              litresFactor: 0.44,
              kwhFactor: 0.2, 
            },
            lng: {
              label: 'LNG',
              tonnesFactor: 2559.17,
              litresFactor: 1.16,
              kwhFactor: 0.2, 
            },
            lpg: {
              label: 'LPG',
              tonnesFactor: 2939.29,
              litresFactor: 1.56,
              kwhFactor: 0.23, 
            },
            naturalGas: {
              label: 'Natural gas',
              tonnesFactor: 2539.25,
              litresFactor: 2.02,
              kwhFactor: 0.2, 
            },
            propane: {
              label: 'Propane',
              tonnesFactor: 2997.55,
              litresFactor: 1.54,
              kwhFactor: 0.23, 
            },
          },
        },
        solid: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            coalIndustrial: {
              label: 'Coal (industrial)',
              tonnesFactor: 2411.43,
              kwhFactor: 0.34, 
            },
            coalElectricity: {
              label: 'Coal (electricity generation)',
              tonnesFactor: 2270.45,
              kwhFactor: 0.34, 
            },
            coalDomestic: {
              label: 'Coal (domestic)',
              tonnesFactor: 2883.26,
              kwhFactor: 0.36, 
            },
            cokingCoal: {
              label: 'Coking coal',
              tonnesFactor: 3165.24,
              kwhFactor: 0.38, 
            },
            petroleumCoke: {
              label: 'Petroleum coke',
              tonnesFactor: 3386.87,
              kwhFactor: 0.36, 
            },
            homeProducedCoal: {
              label: 'Coal (electricity generation - home produced coal only)',
              tonnesFactor: 2266.9,
              kwhFactor: 0.34,
            },
          },
        },
        biofuel: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            bioethanol: {
              label: 'Bioethanol',
              tonnesFactor: 0.00901,
              litresFactor: 0.42339,
              kwhFactor: 0.01135,
            },
            biodiesel: {
              label: 'Biodiesel',
              tonnesFactor: 0.16751,
              litresFactor: 5.05961,
              kwhFactor: 0.18822,
            },
            biopropane: {
              label: 'Biopropane',
              tonnesFactor: 0.00214,
              litresFactor: 0.08952,
              kwhFactor: 0.00415,
            },
            biopetrol: {
              label: 'Bio Petrol',
              tonnesFactor: 0.01402,
              litresFactor: 0.42339,
              kwhFactor: 0.01891,
            },
            bioMethanol: {
              label: 'Methanol (bio)',
              tonnesFactor: 0.00676,
              litresFactor: 0.42339,
              kwhFactor: 0.00851,
            },
          },
        },
        bio: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            biomass: {
              label: 'Biomass',
              tonnesFactor: 43.03576,
              kwhFactor: 0.01053, 
            },
            biogas: {
              label: 'Biogas',
              tonnesFactor: 1.21919,
              kwhFactor: 0.00022, 
            },
          },
        },
        biomass: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            biomass: {
              label: 'Biomass',
              tonnesFactor: 43.03576,
              kwhFactor: 0.01053, 
            },
          },
        },
        biogas: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            biogas: {
              label: 'Biogas',
              tonnesFactor: 1.21919,
              kwhFactor: 0.00022, 
            },
          },
        },
        vans: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            classI: {
              label: 'Class I (up to 1.305 tonnes)',
              tonnesFactor: 0.14189,
              kwhFactor: 0.22836, 
            },
            classII: {
              label: 'Class II (1.305 to 1.74 tonnes)',
              tonnesFactor: 0.17513,
              kwhFactor: 0.28186, 
            },
            classIII: {
              label: 'Class III (1.74 to 3.5 tonnes)',
              tonnesFactor: 0.25481,
              kwhFactor: 0.4101, 
            },
            average: {
              label: 'Average (up to 3.5 tonnes)',
              tonnesFactor: 0.23156,
              kwhFactor: 0.37268, 
            },
          },
        },
        hgv: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            rigid7t: {
              label: 'Rigid (>3.5 - 7.5 tonnes)',
              tonnesFactor: 0.46338,
              kwhFactor: 0.74574,
            },
            rigid17t: {
              label: 'Rigid (>7.5 tonnes-17 tonnes)',
              tonnesFactor: 0.55763,
              kwhFactor: 0.89742,
            },
            rigidOver17t: {
              label: 'Rigid (>17 tonnes)',
              tonnesFactor: 0.79097,
              kwhFactor: 1.27294,
            },
            articulated33t: {
              label: 'Articulated (>3.5 - 33t)',
              tonnesFactor: 0.64531,
              kwhFactor: 1.03851,
            },
            articulatedOver33t: {
              label: 'Articulated (>33t)',
              tonnesFactor: 0.65677,
              kwhFactor: 1.05696,
            },
          },
        },
        refrigerants: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            carbonDioxide: {
              label: 'Carbon dioxide',
              tonnesFactor: 1,
            },
            methane: {
              label: 'Methane',
              tonnesFactor: 25,
            },
            nitrousOxide: {
              label: 'Nitrous oxide',
              tonnesFactor: 298,
            },
            hfc23: {
              label: 'HFC-23',
              tonnesFactor: 14800,
            },
            hfc32: {
              label: 'HFC-32',
              tonnesFactor: 675,
            },
            hfc41: {
              label: 'HFC-41',
              tonnesFactor: 92,
            },
            hfc125: {
              label: 'HFC-125',
              tonnesFactor: 3500
            },
            hfc134: {
              label: 'HFC-134',
              tonnesFactor: 1100,
            },
            hfc134a: {
              label: 'HFC-134a',
              tonnesFactor: 1430,
            },
            hfc143: {
              label: 'HFC-143',
              tonnesFactor: 353,
            },
            hfc143a: {
              label: 'HFC-143a',
              tonnesFactor: 4470,
            },
            hfc152a: {
              label: 'HFC-152a',
              tonnesFactor: 124,
            },
            hfc227ea: {
              label: 'HFC-227ea',
              tonnesFactor: 3220,
            },
            hfc236fa: {
              label: 'HFC-236fa',
              tonnesFactor: 9810,
            },
            hfc245fa: {
              label: 'HFC-245fa',
              tonnesFactor: 1030,
            },
            pfc: {
              label: 'PFC-9-1-18',
              tonnesFactor: 7500,
            },
            perfluorocy: {
              label: 'Perfluorocyclopropane',
              tonnesFactor: 17340,
            },
            sulphur: {
              label: 'Sulphur hexafluoride',
              tonnesFactor: 22800,
            },
          },
        },
        vehicles: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            small: {
              label: 'Small (up to a 1.4 liters engine)',
              tonnesFactor: 0.00354,
            },
            medium: {
              label: 'Medium (1.4-2.0 liters engine)',
              tonnesFactor: 0.01323,
            },
            large: {
              label: 'Large (over 2.0 liters engine)',
              tonnesFactor: 0.01614,
            },
            average: {
              label: 'Average',
              tonnesFactor: 0.03858,
            },
          },
        },
        location: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            oecdPacific: {
              label: 'OECD Pacific',
              tonnesFactor: 0.495411,
            },
            oecdEurope: {
              label: 'OECD Europe',
              tonnesFactor: 0.33861,
            },
            africa: {
              label: 'Africa',
              tonnesFactor: 0.645488,
            },
            latinAmerica: {
              label: 'Latin America',
              tonnesFactor: 0.1935865,
            },
            middleEast: {
              label: 'Midlle East',
              tonnesFactor: 0.6704737,
            },
            noOecdEurope: {
              label: 'Non-OECD Europe',
              tonnesFactor: 0.4988224,
            },
            formerUssr: {
              label: 'Former USSR',
              tonnesFactor: 0.3406189,
            },
            asia: {
              label: 'Asia (excluding China)',
              tonnesFactor: 0.7293463,
            },
            albania: {
              label: 'Albania',
              tonnesFactor: 0.0324402,
            },
            algeria: {
              label: 'Algeria',
              tonnesFactor: 0.6881182,
            },
            angola: {
              label: 'Angola',
              tonnesFactor: 0.0982004,
            },
            argentina: {
              label: 'Argentina',
              tonnesFactor: 0.3033696,
            },
            armeria: {
              label: 'Armenia',
              tonnesFactor: 0.1382909,
            },
            australia: {
              label: 'Australia',
              tonnesFactor: 0.920527,
            },
            austria: {
              label: 'Austria',
              tonnesFactor: 0.214471,
            },
            azerbaijan: {
              label: 'Azerbaijan',
              tonnesFactor: 0.4734752,
            },
            bahrain: {
              label: 'Bahrain',
              tonnesFactor: 0.8248637,
            },
            bangladesh: {
            label: 'Bangladesh',
            tonnesFactor: 0.5843308,
            },
            belarus: {
            label: 'Belarus',
            tonnesFactor: 0.2963771,
            },
            belgium: {
            label: 'Belgium',
            tonnesFactor: 0.260036,
            },
            benin: {
            label: 'Benin',
            tonnesFactor: 0.6962126,
            },
            bolivia: {
            label: 'Bolivia',
            tonnesFactor: 0.5049688,
            },
            bosnia_and_herzegovina: {
            label: 'Bosnia and Herzegovina',
            tonnesFactor: 0.801958,
            },
            botswana: {
            label: 'Botswana',
            tonnesFactor: 1.8514539,
            },
            brazil: {
            label: 'Brazil',
            tonnesFactor: 0.0814376,
            },
            brunei: {
            label: 'Brunei',
            tonnesFactor: 0.8210049,
            },
            bulgaria: {
            label: 'Bulgaria',
            tonnesFactor: 0.4479618,
            },
            cambodia: {
            label: 'Cambodia',
            tonnesFactor: 1.0049344,
            },
            cameroon: {
            label: 'Cameroon',
            tonnesFactor: 0.0425357,
            },
            canada: {
            label: 'Canada',
            tonnesFactor: 0.184179,
            },
            chile: {
            label: 'Chile',
            tonnesFactor: 0.2942425,
            },
            china: {
            label: 'Peoples Republic of China',
            tonnesFactor: 0.7875875,
            },
            chineseTaipei: {
            label: 'Chinese Taipei',
            tonnesFactor: 0.6588819,
            },
            colombia: {
            label: 'Colombia',
            tonnesFactor: 0.1496172,
            },
            congo: {
            label: 'Congo',
            tonnesFactor: 0.1023289,
            },
            costa_rica: {
            label: 'Costa Rica',
            tonnesFactor: 0.0473985,
            },
            cote_divoire: {
            label: 'Cote d\'Ivoire',
            tonnesFactor: 0.4362172,
            },
            croatia: {
            label: 'Croatia',
            tonnesFactor: 0.318398,
            },
            cuba: {
            label: 'Cuba',
            tonnesFactor: 1.0194389,
            },
            cyprus: {
            label: 'Cyprus',
            tonnesFactor: 0.7582802,
            },
            czech_republic: {
            label: 'Czech Republic',
            tonnesFactor: 0.526629,
            },
            democratic_republic_of_the_congo: {
              label: 'Democratic Republic of the Congo',
              tonnesFactor: 0.0027816,
            },
            denmark: {
            label: 'Denmark',
            tonnesFactor: 0.341339,
            },
            dominican_republic: {
            label: 'Dominican Republic',
            tonnesFactor: 0.6238551,
            },
            ecuador: {
            label: 'Ecuador',
            tonnesFactor: 0.3957349,
            },
            egypt: {
            label: 'Egypt',
            tonnesFactor: 0.4698084,
            },
            el_salvador: {
            label: 'El Salvador',
            tonnesFactor: 0.2167277,
            },
            eritrea: {
            label: 'Eritrea',
            tonnesFactor: 0.690342,
            },
            estonia: {
            label: 'Estonia',
            tonnesFactor: 0.6401581,
            },
            ethiopia: {
            label: 'Ethiopia',
            tonnesFactor: 0.002914,
            },
            finland: {
            label: 'Finland',
            tonnesFactor: 0.241592,
            },
            france: {
              label: 'France',
              tonnesFactor: 0.084953,
            },
            gabon: {
              label: 'Gabon',
              tonnesFactor: 0.3466605,
            },
            georgia: {
              label: 'Georgia',
              tonnesFactor: 0.1449678,
            },
            germany: {
              label: 'Germany',
              tonnesFactor: 0.403629,
            },
            ghana: {
              label: 'Ghana',
              tonnesFactor: 0.2756985,
            },
            gibraltar: {
              label: 'Gibraltar',
              tonnesFactor: 0.7304305,
            },
            greece: {
              label: 'Greece',
              tonnesFactor: 0.724964,
            },
            guatemala: {
              label: 'Guatemala',
              tonnesFactor: 0.3344147,
            },
            haiti: {
              label: 'Haiti',
              tonnesFactor: 0.3051825,
            },
            honduras: {
              label: 'Honduras',
              tonnesFactor: 0.4132526,
            },
            hongKong: {
              label: 'Hong Kong China',
              tonnesFactor: 0.8546126,
            },
            hungary: {
              label: 'Hungary',
              tonnesFactor: 0.343927,
            },
            iceland: {
              label: 'Iceland',
              tonnesFactor: 0.000542,
            },
            india: {
              label: 'India',
              tonnesFactor: 0.9440385,
            },
            indonesia: {
              label: 'Indonesia',
              tonnesFactor: 0.6767253,
            },
            iran: {
              label: 'Iran',
              tonnesFactor: 0.5143547,
            },
            iraq: {
              label: 'Iraq',
              tonnesFactor: 0.7009096,
            },
            ireland: {
              label: 'Ireland',
              tonnesFactor: 0.535333,
            },
            israel: {
              label: 'Israel',
              tonnesFactor: 0.773651,
            },
            italy: {
              label: 'Italy',
              tonnesFactor: 0.403512,
            },
            jamaica: {
              label: 'Jamaica',
              tonnesFactor: 0.8297551,
            },
            japan: {
              label: 'Japan',
              tonnesFactor: 0.418346,
            },
            jordan: {
              label: 'Jordan',
              tonnesFactor: 0.6018739,
            },
            kazakhstan: {
              label: 'Kazakhstan',
              tonnesFactor: 0.5200265,
            },
            kenya: {
              label: 'Kenya',
              tonnesFactor: 0.3174905,
            },
            demKorea: {
              label: 'Dem. People Republic of Korea',
              tonnesFactor: 0.5331955,
            },
            korea: {
              label: 'Korea',
              tonnesFactor: 0.464337,
            },
            kuwait: {
              label: 'Kuwait',
              tonnesFactor: 0.6429168,
            },
            kyrgyzstan: {
              label: 'Kyrgyzstan',
              tonnesFactor: 0.079161,
            },
            latvia: {
              label: 'Latvia',
              tonnesFactor: 0.1673881,
            },
            lebanon: {
              label: 'Lebanon',
              tonnesFactor: 0.6946497,
            },
            libya: {
              label: 'Libya',
              tonnesFactor: 0.8788286,
            },
            lithuania: {
              label: 'Lithuania',
              tonnesFactor: 0.139482,
            },
            luxembourg: {
              label: 'Luxembourg',
              tonnesFactor: 0.326047,
            },
            fyrMacedonia: {
              label: 'FYR of Macedonia',
              tonnesFactor: 0.6189059,
            },
            malaysia: {
              label: 'Malaysia',
              tonnesFactor: 0.6553582,
            },
            malta: {
              label: 'Malta',
              tonnesFactor: 0.8340854,
            },
            mexico: {
              label: 'Mexico',
              tonnesFactor: 0.541285,
            },
            moldova: {
              label: 'Republic of Moldova',
              tonnesFactor: 0.475568,
            },
            mongolia: {
              label: 'Mongolia',
              tonnesFactor: 0.52331,
            },
            morocco: {
              label: 'Morocco',
              tonnesFactor: 0.7079012,
            },
            mozambique: {
              label: 'Mozambique',
              tonnesFactor: 0.0010178,
            },
            myanmar: {
              label: 'Myanmar',
              tonnesFactor: 0.3382211,
            },
            namibia: {
              label: 'Namibia',
              tonnesFactor: 0.0756469,
            },
            nepal: {
              label: 'Nepal',
              tonnesFactor: 0.0037996,
            },
            netherlands: {
              label: 'Netherlands',
              tonnesFactor: 0.394315,
            },
            netherlandsAnt: {
              label: 'Netherlands Antilles',
              tonnesFactor: 0.7170685,
            },
            new_zealand: {
              label: 'New Zealand',
              tonnesFactor: 0.3091,
            },
            nicaragua: {
              label: 'Nicaragua',
              tonnesFactor: 0.5497637,
            },
            nigeria: {
              label: 'Nigeria',
              tonnesFactor: 0.3861378,
            },
            norway: {
              label: 'Norway',
              tonnesFactor: 0.006867,
            },
            oman: {
              label: 'Oman',
              tonnesFactor: 0.8561127,
            },
            pakistan: {
              label: 'Pakistan',
              tonnesFactor: 0.4128082,
            },
            panama: {
              label: 'Panama',
              tonnesFactor: 0.2288439,
            },
            paraguay: {
              label: 'Paraguay',
              tonnesFactor: 0.0001,
            },
            peru: {
              label: 'Peru',
              tonnesFactor: 0.1723235,
            },
            philippines: {
              label: 'Philippines',
              tonnesFactor: 0.4350061,
            },
            poland: {
              label: 'Poland',
              tonnesFactor: 0.4350061,
            },
            portugal: {
              label: 'Portugal',
              tonnesFactor: 0.416424,
            },
            qatar: {
              label: 'Qatar',
              tonnesFactor: 0.6257141,
            },
            romania: {
              label: 'Romania',
              tonnesFactor: 0.428605,
            },
            russia: {
              label: 'Russia',
              tonnesFactor: 0.3285654,
            },
            saudi_arabia: {
              label: 'Saudi Arabia',
              tonnesFactor: 0.7553734,
            },
            senegal: {
              label: 'Senegal',
              tonnesFactor: 0.7258949,
            },
            serbia: {
              label: 'Serbia',
              tonnesFactor: 0.7155911,
            },
            singapore: {
              label: 'Singapore',
              tonnesFactor: 0.5360586,
            },
            slovakia: {
              label: 'Slovak Republic',
              tonnesFactor: 0.223412,
            },
            slovenia: {
              label: 'Slovenia',
              tonnesFactor: 0.3317589,
            },
            south_africa: {
              label: 'South Africa',
              tonnesFactor: 0.8689996,
            },
            spain: {
              label: 'Spain',
              tonnesFactor: 0.349794,
            },
            sri_lanka: {
              label: 'Sri Lanka',
              tonnesFactor: 0.3137244,
            },
            sudan: {
              label: 'Sudan',
              tonnesFactor: 0.6139183,
            },
            sweden: {
              label: 'Sweden',
              tonnesFactor: 0.047966,
            },
            switzerland: {
              label: 'Switzerland',
              tonnesFactor: 0.025723,
            },
            syria: {
              label: 'Syria',
              tonnesFactor: 0.6043992,
            },
            tajikistan: {
              label: 'Tajikistan',
              tonnesFactor: 0.0280183,
            },
            tanzania: {
              label: 'United Republic of Tanzania',
              tonnesFactor: 0.3155122,
            },
            thailand: {
              label: 'Thailand',
              tonnesFactor: 0.5109283,
            },
            togo: {
              label: 'Togo',
              tonnesFactor: 0.4586697,
            },
            trinidad_and_tobago: {
              label: 'Trinidad and Tobago',
              tonnesFactor: 0.7243096,
            },
            tunisia: {
              label: 'Tunisia',
              tonnesFactor: 0.5458586,
            },
            turkey: {
              label: 'Turkey',
              tonnesFactor: 0.438222,
            },
            turkmenistan: {
              label: 'Turkmenistan',
              tonnesFactor: 0.7951304,
            },
            ukraine: {
              label: 'Ukraine',
              tonnesFactor: 0.3443288,
            },
            united_arab_emirates: {
              label: 'United Arab Emirates',
              tonnesFactor: 0.8199856,
            },
            united_kingdom: {
              label: 'United Kingdom',
              tonnesFactor: 0.19338,
            },
            united_states_of_america: {
              label: 'United States of America',
              tonnesFactor: 0.55866,
            },
            uruguay: {
              label: 'Uruguay',
              tonnesFactor: 0.2963499,
            },
            uzbekistan: {
              label: 'Uzbekistan',
              tonnesFactor: 0.44636,
            },
            venezuela: {
              label: 'Venezuela',
              tonnesFactor: 0.2084422,
            },
            vietnam: {
              label: 'Vietnam',
              tonnesFactor: 0.3963138,
            },
            yemen: {
              label: 'Yemen',
              tonnesFactor: 0.8230311,
            },
            zambia: {
              label: 'Zambia',
              tonnesFactor: 0.0067574,
            },
            zimbabwe: {
              label: 'Zimbabwe',
              tonnesFactor: 0.5727689,
            },
            otAfrica: {
              label: 'Other Africa',
              tonnesFactor: 0.4886113,
            },
            otLatinAmerica: {
              label: 'Other Latin America',
              tonnesFactor: 0.5089928,
            },
            otAsia: {
              label: 'Other Asia',
              tonnesFactor: 0.3078166,
            },
          }  
        },
        goods: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            vehicles: {
              label: 'Vehicles',
              tonnesFactor: 4363.33,
            },
            air: {
              label: 'Air',
              tonnesFactor: 24865.48,
            },
            Rail: {
              label: 'Rail',
              tonnesFactor: 5647.95,
            },
          },
        },
        vehicle: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            vehicles: {
              label: 'Vehicles',
              tonnesFactor: 4363.33,
            },
          },
        },
        cargoShip: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            bulkCarrier: {
              label: 'Bulk carrier',
              tonnesFactor: 0.00354,
            },
            generalCargo: {
              label: 'General cargo',
              tonnesFactor: 0.01323,
            },
            containerShip: {
              label: 'Container ship',
              tonnesFactor: 0.01614,
            },
            vehicleTransport: {
              label: 'Vehicle transport',
              tonnesFactor: 0.03858,
            },
            roRoFerry: {
              label: 'RoRo-Ferry',
              tonnesFactor: 0.05166,
            },
            largeRoPaxFerry: {
              label: 'Large RoPax ferry',
              tonnesFactor: 0.37667,
            },
            refrigeratedCargo: {
              label: 'Refrigerated cargo',
              tonnesFactor: 0.01308,
            },
          },
        },
        seaTanker: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            crudeTanker: {
              label: 'Crude tanker',
              tonnesFactor: 0.00457,
            },
            productsTanker: {
              label: 'Products tanker',
              tonnesFactor: 0.00903,
            },
            chemicalTanker: {
              label: 'Chemical tanker',
              tonnesFactor: 0.01032,
            },
            lngTanker: {
              label: 'LNG tanker',
              tonnesFactor: 0.01155,
            },
            lpgTanker: {
              label: 'LPG Tanker',
              tonnesFactor: 0.01038,
            },
          },
        },
        construction: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            averageConstruction: {
              label: 'Average construction',
              tonnesFactor: 80.34,
            },
            asbestos: {
              label: 'Asbestos',
              tonnesFactor: 27,
            },
            asphalt: {
              label: 'Asphalt',
              tonnesFactor: 39.21,
            },
            bricks: {
              label: 'Bricks',
              tonnesFactor: 241.75,
            },
            concrete: {
              label: 'Concrete',
              tonnesFactor: 131.75,
            },
            insulation: {
              label: 'Insulation',
              tonnesFactor: 1861.75,
            },
            metals: {
              label: 'Metals',
              tonnesFactor: 4018,
            },
            mineralOil: {
              label: 'Mineral oil',
              tonnesFactor: 1401,
            },
            plasterboard: {
              label: 'Plasterboard',
              tonnesFactor: 120,
            },
            tyres: {
              label: 'Tyres',
              tonnesFactor: 3335.57,
            },
            wood: {
              label: 'Wood',
              tonnesFactor: 312.61,
            },
          },
        },
        electricalItems: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            fridgesAndFreezers: {
              label: 'Electrical items - fridges and freezers',
              tonnesFactor: 4363.33,
            },
            it: {
              label: 'Electrical items - IT',
              tonnesFactor: 24865.48,
            },
            small: {
              label: 'Electrical items - small',
              tonnesFactor: 5647.95,
            },
            alkalineBatteries: {
              label: 'Batteries - Alkaline',
              tonnesFactor: 4633.48,
            },
            liIonBatteries: {
              label: 'Batteries - Li ion',
              tonnesFactor: 6308,
            },
            niMhBatteries: {
              label: 'Batteries - NiMh',
              tonnesFactor: 28380,
            },
          },
        },
        materials: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            plastic: {
              label: 'Plastic',
              tonnesFactor: 3116.29,
            },
            organic: {
              label: 'Organic',
              tonnesFactor: 114.83,
            },
            metal: {
              label: 'Metal',
              tonnesFactor: 5268.56,
            },
            paper: {
              label: 'Paper',
              tonnesFactor: 884.16,
            },
          },
        },
        businessTravel: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            cars: {
              label: 'Cars',
              tonnesFactor: 0.000170824,
            },
            motorbikes: {
              label: 'Motorbikes',
              tonnesFactor: 0.00011355,
            },
            taxis: {
              label: 'Taxis',
              tonnesFactor: 0.00014876,
            },
            bus: {
              label: 'Bus',
              tonnesFactor: 0.00010778,
            },
            rail: {
              label: 'Rail',
              tonnesFactor: 0.00003549,
            },
          },
        },
        hotelStay: {
          show: false,
          selected: [],
          carbonFootprints: {},
          types: {
            argentina: {
              label: 'Argentina',
              tonnesFactor: 10.4,
            },
            Australia: {
              label: 'Australia',
              tonnesFactor: 35,
            },
            Austria: {
              label: 'Austria',
              tonnesFactor: 10.4,
            },
            Belgium: {
              label: 'Belgium',
              tonnesFactor: 12.2,
            },
            Brazil: {
              label: 'Brazil',
              tonnesFactor: 8.7,
            },
            Canada: {
              label: 'Canada',
              tonnesFactor: 7.4,
            },
            Chile: {
              label: 'Chile',
              tonnesFactor: 27.6,
            },
            China: {
              label: 'China',
              tonnesFactor: 53.5,
            },
            Colombia: {
              label: 'Colombia',
              tonnesFactor: 14.7,
            },
            costaRica: {
              label: 'Costa Rica',
              tonnesFactor: 4.7,
            },
            CzechRepublic: {
              label: 'Czech Republic',
              tonnesFactor: 10.4,
            },
            Egypt: {
              label: 'Egypt',
              tonnesFactor: 44.2,
            },
            Fiji: {
              label: 'Fiji',
              tonnesFactor: 10.4,
            },
            Finland: {
              label: 'Finland',
              tonnesFactor: 10.4,
            },
            France: {
              label: 'France',
              tonnesFactor: 6.7,
            },
            Germany: {
              label: 'Germany',
              tonnesFactor: 13.2,
            },
            Greece: {
              label: 'Greece',
              tonnesFactor: 10.4,
            },
            HongKongChina: {
              label: 'Hong Kong, China',
              tonnesFactor: 51.5,
            },
            India: {
              label: 'India',
              tonnesFactor: 58.9,
            },
            Indonesia: {
              label: 'Indonesia',
              tonnesFactor: 62.7,
            },
            Ireland: {
              label: 'Ireland',
              tonnesFactor: 10.4,
            },
            Israel: {
              label: 'Israel',
              tonnesFactor: 10.4,
            },
            Italy: {
              label: 'Italy',
              tonnesFactor: 14.3,
            },
            Japan: {
              label: 'Japan',
              tonnesFactor: 39,
            },
            Jordan: {
              label: 'Jordan',
              tonnesFactor: 68.9,
            },
            Kazakhstan: {
              label: 'Kazakhstan',
              tonnesFactor: 10.4,
            },
            Korea: {
              label: 'Korea',
              tonnesFactor: 55.8,
            },
            MacauChina: {
              label: 'Macau, China',
              tonnesFactor: 10.4,
            },
            Malaysia: {
              label: 'Malaysia',
              tonnesFactor: 61.5,
            },
            Maldives: {
              label: 'Maldives',
              tonnesFactor: 152.2,
            },
            Mexico: {
              label: 'Mexico',
              tonnesFactor: 19.3,
            },
            Netherlands: {
              label: 'Netherlands',
              tonnesFactor: 14.8,
            },
            NewZealand: {
              label: 'New Zealand',
              tonnesFactor: 10.4,
            },
            Oman: {
              label: 'Oman',
              tonnesFactor: 90.3,
            },
            Panama: {
              label: 'Panama',
              tonnesFactor: 10.4,
            },
            Peru: {
              label: 'Peru',
              tonnesFactor: 10.4,
            },
            Philippines: {
              label: 'Philippines',
              tonnesFactor: 54.3,
            },
            Poland: {
              label: 'Poland',
              tonnesFactor: 10.4,
            },
            Portugal: {
              label: 'Portugal',
              tonnesFactor: 19,
            },
            Qatar: {
              label: 'Qatar',
              tonnesFactor: 86.2,
            },
            Romania: {
              label: 'Romania',
              tonnesFactor: 10.4,
            },
            RussianFederation: {
              label: 'Russian Federation',
              tonnesFactor: 24.2,
            },
            SaudiArabia: {
              label: 'Saudi Arabia',
              tonnesFactor: 106.4,
            },
            Singapore: {
              label: 'Singapore',
              tonnesFactor: 24.5,
            },
            SouthAfrica: {
              label: 'South Africa',
              tonnesFactor: 51.4,
            },
            Spain: {
              label: 'Spain',
              tonnesFactor: 7,
            },
            Switzerland: {
              label: 'Switzerland',
              tonnesFactor: 6.6,
            },
            TaiwanChina: {
              label: 'Taiwan, China',
              tonnesFactor: 10.4,
            },
            Thailand: {
              label: 'Thailand',
              tonnesFactor: 43.4,
            },
            Turkey: {
              label: 'Turkey',
              tonnesFactor: 32.1,
            },
            UnitedArabEmirates: {
              label: 'United Arab Emirates',
              tonnesFactor: 63.8,
            },
            UnitedStates: {
              label: 'United States',
              tonnesFactor: 16.1,
            },
            UnitedKingdom: {
              label: 'United Kingdom',
              tonnesFactor: 10.4,
            },
            Vietnam: {
              label: 'Vietnam',
              tonnesFactor: 38.5,
            },
          },
        },
      });
      return { fuels, setFuels };    
}

export default useFuels;