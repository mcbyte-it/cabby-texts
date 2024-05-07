type Text = {
  category: string;
  weight?: number; // > 1
  chanceOfPlaying?: number; // 0 - 1
  runtimeGenerated?: boolean;
  trigger: {
    event: 'simValueChanged';
    key: string[];
    newValue: number[];
  } | {
    event: 'flightStateChange';
    value: string[];
    ignoreFlightStateChange?: string[];
  } | {
    event: 'messagePlayed';
    category: string[];
  } | {
    event: 'runtimeFlightMetadataChange';
    key: string[];
    newValue: number[];
  },
  conditions?: ({
    type: 'flightState' | 'settingActive' | 'settingNotActive' | 'airlineCode';
    value: string[];
  } | {
    type: 'runtimeFlightMetadata';
    key: string;
    value: (string|number)[];
  })[];
  timeout: [number, number],
  texts: {
    [key: string]: string;
  }[];
};

const texts: Text[] = [
  // Event changes

  // Seatbelt sign changes
  {
    "category": "captain-seatbelt-sign-change-information",
    "trigger": {"event": "simValueChanged", "key": ["seatBelt"], "newValue": [1]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_CRUISE"]}
    ],
    "timeout": [2, 5],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are expecting some light turbulence ahead. Please return to your seats and fasten your seat belts.",
        "pl": "Szanowni państwo, spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów bezpieczeństwa."
      },
      {
        "en": "Ladies and gentlemen, we've just received information about some light turbulence ahead. Please return to your seats and remain seated until the seatbelt sign is turned off.",
        "pl": "Szanowni państwo, właśnie otrzymaliśmy informację o lekkich turbulencjach przed nami. Prosimy o powrót na miejsca i pozostanie na nich do momentu wyłączenia sygnału zapięcia pasów."
      },
      {
        "en": "Hi folks, this is your captain speaking. We had to turn on the seatbelt sign due to some light turbulence ahead. Please return to your seats and fasten your seat belts.",
        "pl": "Witajcie, tu kapitan. Musieliśmy włączyć sygnał zapięcia pasów z powodu lekkich turbulencji przed nami. Prosimy o powrót na miejsca i zapięcie pasów."
      }
    ]
  },
  {
    "category": "crew-seatbelt-sign-change-information",
    "trigger": {"event": "messagePlayed", "category": ["captain-seatbelt-sign-change-information"]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_CRUISE"]}
    ],
    "timeout": [2, 5],
    "texts": [
      {
        "en": "Ladies and gentlemen, our captain has just informed us that we are expecting some light turbulence ahead. Please return to your seats and remain seated until the seatbelt sign is turned off. Use of the lavatories is not allowed at this time.",
        "pl": "Szanowni państwo, nasz kapitan właśnie poinformował nas, że spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów do momentu wyłączenia sygnału. Używanie toalet nie jest dozwolone w tym czasie."
      },
      {
        "en": "Our captain has just informed us that we are expecting some light turbulence ahead. Please fasten your seatbelts.",
        "pl": "Nasz kapitan właśnie poinformował nas, że spodziewamy się lekkich turbulencji. Prosimy o zapięcie pasów."
      },
      {
        "en": "As you heard from our captain, we are expecting some light turbulence ahead. Please return to your seats and fasten your seat belts. Use of the lavatories is not allowed at this time.",
        "pl": "Jak mogli państwo usłyszeć od naszego kapitana, spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów. Używanie toalet nie jest dozwolone w tym czasie."
      }
    ]
  },
  {
    "category": "crew-seatbelt-sign-change-information",
    "trigger": {"event": "simValueChanged", "key": ["seatBelt"], "newValue": [1]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_CRUISE"]},
      {"type": "settingNotActive", "value": ["captain-seatbelt-sign-change-information"]}
    ],
    "timeout": [2, 5],
    "texts": [
      {
        "en": "Ladies and gentlemen, the captain has turned on the seatbelt sign. Please return to your seats and fasten your seat belts.",
        "pl": "Szanowni państwo, kapitan właśnie włączył sygnał zapięcia pasów. Prosimy o powrót na miejsca i zapięcie pasów bezpieczeństwa."
      },
      {
        "en": "Ladies and gentlemen, the seatbelt sign has been turned on. Please return to your seats and fasten your seat belts. Use of the lavatories is not allowed at this time.",
        "pl": "Szanowni państwo, sygnał zapięcia pasów został właśnie włączony. Prosimy o powrót na miejsca i zapięcie pasów. Używanie toalet nie jest dozwolone w tym czasie."
      }
    ]
  },
  {
    "category": "crew-seatbelt-sign-change-information",
    "trigger": {"event": "simValueChanged", "key": ["seatBelt"], "newValue": [0]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_CLIMB", "FLIGHT_CRUISE"]}
    ],
    "timeout": [2, 5],
    "texts": [
      {
        "en": "Ladies and gentlemen, the captain has turned off the seatbelt sign. You may now move around the cabin, but we recommend that you keep your seatbelt fastened while seated in case of unexpected turbulence.",
        "pl": "Szanowni państwo, kapitan wyłączył sygnał zapięcia pasów. Możecie państwo teraz poruszać się po kabinie, ale zalecamy, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji."
      },
      {
        "en": "As you can see, the seatbelt sign has been turned off. You may now move around the cabin, but we recommend that you keep your seatbelt fastened while seated in case of unexpected turbulence.",
        "pl": "Jak mogli państwo zauważyć, sygnał zapięcia pasów został wyłączony. Możecie państwo teraz poruszać się po kabinie, ale zalecamy, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji."
      },
      {
        "en": "Seatbelt sign has just been turned off. You may now move around the cabin. We recommend that you keep your seatbelt fastened while seated in case of unexpected turbulence.",
        "pl": "Sygnał zapięcia pasów został właśnie wyłączony. Możecie państwo teraz poruszać się po kabinie. Zalecamy jednak, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji."
      }
    ]
  },

  // Delay
  {
    "category": "captain-delay-information",
    "trigger": {"event": "runtimeFlightMetadataChange", "key": ["departureDelay"], "newValue": [1]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_STARTED"]}
    ],
    "timeout": [10, 20],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are currently experiencing a delay. We apologize for the inconvenience and we will keep you updated on the progress. We are working hard to get you on your way as soon as possible. Thank you for your patience.",
        "pl": "Szanowni państwo, obecnie mamy drobne opóźnienie. Przepraszamy za niedogodności i będziemy informować państwa o postępach. Pracujemy nad tym, aby jak najszybciej ruszyć w drogę. Dziękujemy za cierpliwość."
      },
      {
        "en": "Hi, this is your captain speaking. We are currently experiencing a delay. We apologize for the inconvenience and we will keep you updated on the progress. Thank you for your patience and understanding.",
        "pl": "Witajcie, tu kapitan. Obecnie mamy drobne opóźnienie. Przepraszamy za niedogodności i będziemy informować państwa o postępach. Dziękujemy za cierpliwość i zrozumienie."
      }
    ]
  },
  {
    "category": "crew-delay-apologies",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_TAXI_POST_LANDING']},
    "conditions": [
      {"type": "runtimeFlightMetadata", "key": "arrivalDelay", "value": [1]}
    ],
    "timeout": [21, 21],
    "texts": [
      {
        "en": "We would like to apologize you again for the delay. We hope that you had a pleasant flight and we are looking forward to seeing you again soon.",
        "pl": "Chcielibyśmy jeszcze raz przeprosić za opóźnienie. Mamy nadzieję, że mieli państwo przyjemny lot i z niecierpliwością czekamy na ponowne spotkanie."
      }
    ]
  },

  // Flight state changes

  // Pre-flight
  {
    "category": "captain-pre-flight-welcome-message",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_STARTED']},
    "timeout": [0, 60],
    "texts": [
      {
        "en": "Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}. My name is {captainName} and I am the captain of this flight. I would like to welcome you on board and thank you for choosing to fly with us today. We are currently preparing for departure and we will be taking off shortly. Our flight today will take approximately {flightTime}. If you have any questions or need assistance, please don't hesitate to ask one of our cabin crew members. Thank you for flying with {airlineName}.",
        "pl": "[Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {captainName} i jestem kapitanem podczas tego lotu. Chciałbym państwa serdecznie powitać na pokładzie i podziękować za wybór naszego przewoźnika. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. [Our flight today will take approximately {flightTime}.] Jeśli mają państwo jakieś pytania, nie wahajcie się zwrócić do jednego z członków naszej załogi. [Thank you for flying with {airlineName}.]"
      },
      {
        "en": "Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}. My name is {captainName} and I am the captain of this flight. We are currently preparing for departure and we will be taking off shortly. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {captainName} i jestem kapitanem podczas tego lotu. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. [Thank you for choosing {airlineName}.] Życzymy miłego lotu."
      },
      {
        "en": "Hi folks, this is your captain speaking. Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}. We are currently preparing for departure and we will be taking off shortly. Thank you for choosing to fly with us today.",
        "pl": "Z tej strony kapitan. [Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Dziękujemy za wybór naszego przewoźnika."
      }
    ]
  },
  {
    "category": "crew-pre-flight-welcome-message",
    "trigger": {"event": "messagePlayed", "category": ["captain-pre-flight-welcome-message"]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_STARTED"]}
    ],
    "timeout": [10, 20],
    "texts": [
      {
        "en": "Hello and welcome aboard. My name is {crewName} and I am the cabin crew member on this flight. As you could hear from our captain - we are currently preparing for departure and we will be taking off shortly. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. Please turn off all personal electronic devices, including laptops and cell phones. Smoking is prohibited for the duration of the flight. If you have any questions or need assistance, please don't hesitate to ask me or one of my colleagues.",
        "pl": "Witamy na pokładzie. Nazywam się {crewName} i jestem członkiem załogi pokładowej podczas tego lotu. Jak mogli państwo usłyszeć od naszego kapitana - obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Prosimy o zapięcie pasów bezpieczeństwa, ustawienie oparcia fotela i stolika w pozycji pionowej. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. Jeśli mają państwo jakieś pytania lub potrzebują pomocy, proszę zwrocić się do mnie lub jednego z moich kolegów."
      },
      {
        "en": "Ladies and gentlemen, welcome onboard. My name is {crewName} and I am the cabin crew member on this flight. We ask that you please fasten your seatbelts at this time and secure all baggage underneath your seat or in the overhead compartments. We also ask that your seats and table trays are in the upright position for take-off. Please turn off all personal electronic devices, including laptops and cell phones. Smoking is prohibited for the duration of the flight. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "Panie i panowie, witamy na pokładzie. Nazywam się {crewName} i jestem członkiem załogi pokładowej podczas tego lotu. Prosimy o zapięcie pasów bezpieczeństwa i umieszczenie bagażu pod siedzeniem lub w schowkach bagażowych. Prosimy również o ustawienie oparcia fotela i stolika w pozycji pionowej przed startem. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. Dziękujemy za wybór {airlineName}. Życzymy miłego lotu."
      }
    ]
  },
  {
    "category": "crew-pre-flight-welcome-message",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_STARTED']},
    "conditions": [
      {"type": "settingNotActive", "value": ["captain-pre-flight-welcome-message"]}
    ],
    "timeout": [0, 60],
    "texts": [
      {
        "en": "Welcome aboard on this {airlineName} flight. Today we are flying from {originCityName} to {destinationCityName}. My name is {crewName} and I am the cabin crew member on this flight. We are currently preparing for departure and we will be taking off shortly. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. If you have any questions or need assistance, please don't hesitate to ask me or one of my colleagues. Thank you for flying with {airlineName}.",
        "pl": "[Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {crewName} i jestem członkiem załogi podczas tego lotu. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Prosimy o zapięcie pasów bezpieczeństwa, ustawienie oparcia fotela i stolika w pozycji pionowej. Jeśli mają państwo jakieś pytania lub potrzebują pomocy, proszę nie wahajcie się zwrócić do mnie lub jednego z moich kolegów. [Thank you for flying with {airlineName}.]"
      },
      {
        "en": "Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}. My name is {crewName} and I am the cabin crew member on this flight. We ask that you please fasten your seatbelts at this time and secure all baggage underneath your seat or in the overhead compartments. We also ask that your seats and table trays are in the upright position for take-off. Please turn off all personal electronic devices, including laptops and cell phones. Smoking is prohibited for the duration of the flight. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {crewName} i jestem członkiem załogi podczas tego lotu. Prosimy o zapięcie pasów bezpieczeństwa i umieszczenie bagażu pod siedzeniem lub w schowkach bagażowych. Prosimy również o ustawienie oparcia fotela i stolika w pozycji pionowej przed startem. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. [Thank you for choosing {airlineName}.] Życzymy miłego lotu."
      }
    ]
  },

  // Basic information about the flight
  {
    "category": "captain-basic-information-about-the-flight",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_STARTED']},
    "timeout": [60, 120],
    "texts": [
      {
        "en": "Our flight today will take approximately {flightTime}. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}. Please remember to keep your seatbelt fastened while seated and whenever the seatbelt sign is illuminated.",
        "pl": "[Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Prosimy pamiętać o tym, aby mieć zapięte pasy zawszy gdy Państwo siedzą i zawsze, gdy sygnał zapięcia pasów jest włączony."
      },
      {
        "en": "Hi, it's me again. I just thought I'll share some information with you. Our flight today will take approximately {flightTime}. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}. We expect a smooth flight with a small chance of light turbulences. Please relax and enjoy the flight.",
        "pl": "Witajcie, to znowu ja. Chciałem podzielić się z wami kilkoma informacjami. [Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Spodziwamy się spokojnego lotu z małymi szansami na lekkie turbulencje. Życzę miłego lotu."
      }
    ]
  },
  {
    "category": "crew-basic-information-about-the-flight",
    "trigger": {"event": "messagePlayed", "category": ["captain-basic-information-about-the-flight"]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_STARTED"]}
    ],
    "timeout": [30, 60],
    "texts": [
      {
        "en": "Ladies and gentlemen, shortly after takeoff we'll start serving snacks and drinks. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Szanowni państwo, krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem."
      },
      {
        "en": "Shortly after takeoff we'll start serving snacks and drinks. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem."
      }
    ]
  },
  {
    "category": "crew-basic-information-about-the-flight",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_STARTED']},
    "conditions": [
      {"type": "settingNotActive", "value": ["captain-basic-information-about-the-flight"]}
    ],
    "timeout": [60, 120],
    "texts": [
      {
        "en": "Our flight today will take approximately {flightTime}. Captain just let me know that flight should be smooth. Shortly after takeoff we'll start serving snacks and drinks. You can find our sky menu in the seat pocket in front of you.",
        "pl": "[Our flight today will take approximately {flightTime}.] Kapitan właśnie poinformował mnie, że lot powinien być spokojny. Krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem."
      }
    ]
  },

  // Safety briefing
  {
    "category": "crew-safety-briefing",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_TAXI_PRE_TAKEOFF']},
    "timeout": [10, 20],
    "texts": [
      {
        "en": "Ladies and gentlemen, on behalf of the crew I ask that you please direct your attention to the crew members as we review the emergency procedures. There are {aircraftEmergencyExistsCount} emergency exits on this aircraft. Take a minute to locate the exit closest to you. Note that the nearest exit may be behind you. Should the cabin experience sudden pressure loss, stay calm and listen for instructions from the cabin crew. Oxygen masks will drop down from above your seat. Place the mask over your mouth and nose, like this. Pull the strap to tighten it. If you are traveling with children, make sure that your own mask is on first before helping your children. In the unlikely event of an emergency landing and evacuation, leave your carry-on items behind. Life rafts are located below your seats and emergency lighting will lead you to your closest exit. We ask that you make sure that all carry-on luggage is stowed away safely during the flight. While we wait for take off, please take a moment to review the safety data card in the seat pocket in front of you. Thank you for your attention.",
        "pl": "Szanowni państwo, w imieniu załogi proszę o uwagę. Na pokładzie samolotu znajduje się {aircraftEmergencyExistsCount} wyjść awaryjnych. Proszę poświęcić chwilę, aby zlokalizować wyjście najbliższe Państwu. Zwróć szczególną uwagę, ponieważ najbliższe wyjście może znajdować się za Państwem. W przypadku nagłej utraty ciśnienia w kabinie, zachowaj spokój i słuchaj instrukcji członków załogi. Maseczki tlenowe spadną z góry nad Państwa miejscem. Umieść maseczkę na ustach i nosie. Pociągnij za pasek, aby ją naciągnąć. Jeśli podróżujesz z dziećmi, upewnij się, że najpierw założysz swoją maseczkę, zanim pomożesz swoim dzieciom. W przypadku awaryjnego lądowania i ewakuacji, pozostaw swoje bagaże podręczne. Kamizelki ratunkowe znajdują się pod Państwa siedzeniami, a oświetlenie awaryjne poprowadzi Państwa do najbliższego wyjścia. Prosimy upewnić się, że wszystkie bagaże podręczne są bezpiecznie schowane podczas lotu. Podczas oczekiwania na start, proszę poświęcić chwilę na zapoznanie się z kartą bezpieczeństwa znajdującą się w kieszeni siedzenia przed Państwem. Dziękujemy za uwagę."
      }
    ]
  },

  // Takeoff
  {
    "category": "captain-ready-for-takeoff-message",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_TAKEOFF']},
    "timeout": [3, 5],
    "texts": [
      {
        "en": "Cabin crew, prepare for takeoff."
      }
    ]
  },

  // Climb
  {
    "category": "crew-information-about-upcoming-service",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_CLIMB']},
    "timeout": [30, 60],
    "texts": [
      {
        "en": "Ladies and gentlemen, please remain seated while we climb to our cruising altitude. We will be starting our in-flight service shortly. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Szanowni państwo, prosimy o pozostanie na miejscach podczas wznoszenia do naszej wysokości przelotowej. Wkrótce rozpoczniemy serwis pokładowy. Menu znajdą państwo w kieszeni siedzenia przed sobą."
      },
      {
        "en": "We are now climbing to our cruising altitude. We will be starting our in-flight service shortly. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Obecnie wznosimy się do naszej wysokości przelotowej. Wkrótce rozpoczniemy serwis pokładowy. Menu znajdą państwo w kieszeni siedzenia przed sobą."
      }
    ]
  },

  // Service
  {
    "category": "crew-service-information",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_CLIMB'], "ignoreFlightStateChange": ['FLIGHT_CRUISE']},
    "timeout": [240, 360],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are now starting our in-flight service. We'd like to remind you that we accept card payments as well as cash. You can find our sky menu in the seat pocket in front of you. Please remain seated while we serve you. If you need anything, please don't hesitate to ask one of our cabin crew members. Thank you.",
        "pl": "Szanowni państwo, rozpoczynamy serwis pokładowy. Przypominamy, że akceptujemy płatności kartą oraz gotówką. Menu znajdą państwo w kieszeni siedzenia przed sobą. Prosimy o pozostanie na miejscach podczas naszej obsługi. Jeśli mają Państwo specjalne potrzeby, prosimy zwrócić się do jednego z członków naszej załogi. Dziękujemy."
      },
      {
        "en": "We are now starting our in-flight service. We'd like to remind you that we accept card payments as well as cash. You can find our sky menu in the seat pocket in front of you. Please remain seated while we serve you. If you need anything, please don't hesitate to ask one of our cabin crew members. Thank you.",
        "pl": "Rozpoczynamy serwis pokładowy. Przypominamy, że akceptujemy płatności kartą oraz gotówką. Menu znajdą państwo w kieszeni siedzenia przed sobą. Prosimy o pozostanie na miejscach podczas naszej obsługi. Jeśli mają Państwo specjalne potrzeby, prosimy zwrócić się do jednego z członków naszej załogi. Dziękujemy."
      }
    ]
  },

  // Shopping
  {
    "category": "crew-shopping-information",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_CRUISE']},
    "conditions": [
      {"type": "airlineCode", "value": ["RYR"]}
    ],
    "timeout": [300, 420],
    "weight": 9,
    "texts": [
      {
        "en": "Ladies and gentlemen, we are now starting our in-flight shopping service. Today we have a special offer for you. Our scratch cards are now available for purchase. You can win a free flight or other great prizes. Good luck!",
        "pl": "Szanowni państwo, rozpoczynamy sprzedaż naszych produktów premium. Dziś mamy dla państwa specjalną ofertę. Kupując zdrapkę, możecie państwo wygrać darmowy lot lub inne fantastyczne nagrody. Powodzenia!"
      }
    ]
  },
  {
    "category": "crew-shopping-information",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_CRUISE']},
    "timeout": [300, 420],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are now starting our in-flight shopping service. Today we have a special offer for you. If you buy two perfumes, you will get a 10% discount on the third one.",
        "pl": "Szanowni państwo, rozpoczynamy serwis pokładowy. Dziś mamy dla państwa specjalną ofertę. Jeśli kupią państwo dwa zapachy, trzeci będzie tańszy o 10%."
      },
      {
        "en": "We are now starting our in-flight shopping service. Today we highly recommend our special offer - a set of three perfumes for the price of two. You can find our shopping catalog in the seat pocket in front of you.",
        "pl": "Rozpoczynamy serwis pokładowy. Dziś polecamy naszą specjalną ofertę - zestaw trzech zapachów w cenie dwóch. Katalog produktów znajdą państwo w kieszeni siedzenia przed sobą."
      }
    ]
  },

  // Random information about the flight
  {
    "category": "captain-random-information-about-the-flight",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_CRUISE']},
    "timeout": [600, 720],
    "runtimeGenerated": true,
    "texts": [
      {
        "en": "Ladies and gentleman, this is your captain speaking. We are currently cruising at an altitude of {currentAltitudeFt} feet at an speed of {groundSpeedKm} kilometers per hour. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees. Sit back, relax and enjoy the rest of the flight.",
        "pl": "Szanowni państwo, tu kapitan. Obecnie przelatujemy na wysokości {currentAltitudeFt} stóp z prędkością {groundSpeedKm} kilometrów na godzinę. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Proszę usiąść wygodnie, zrelaksować się i cieszyć resztą lotu."
      },
      {
        "en": "Hi, it's me again. I just wanted to share some information with you. We are currently cruising at an altitude of {currentAltitudeFt} feet at an speed of {groundSpeedKm} kilometers per hour. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees. Enjoy the flight.",
        "pl": "Proszę Państwa, tu kapitan. Chciałem podzielić się z wami kilkoma informacjami. Obecnie przelatujemy na wysokości {currentAltitudeFt} stóp z prędkością {groundSpeedKm} kilometrów na godzinę. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Miłego lotu."
      }
    ]
  },

  // Descent
  {
    "category": "captain-information-about-upcoming-actions",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_DESCENT']},
    "timeout": [10, 30],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are starting our descent into {destinationCityName}. Please follow the instructions of the cabin crew as we prepare for landing. Thank you.",
        "pl": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Proszę postępować zgodnie z instrukcjami członków załogi. Dziękujemy."
      },
      {
        "en": "Ladies and gentlemen, we are starting our descent. Please follow the instructions of the cabin crew as we prepare for landing. Thank you.",
        "pl": "[Ladies and gentlemen, we are starting our descent.] Proszę postępować zgodnie z instrukcjami członków załogi. Dziękujemy."
      }
    ]
  },
  {
    "category": "crew-information-about-upcoming-actions",
    "trigger": {"event": "messagePlayed", "category": ["captain-information-about-upcoming-actions"]},
    "conditions": [
      {"type": "flightState", "value": ["FLIGHT_DESCENT"]}
    ],
    "timeout": [5, 10],
    "texts": [
      {
        "en": "Ladies and gentlemen, as you heard from our captain, we are starting our descent into {destinationCityName}. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "[Ladies and gentlemen, as you heard from our captain, we are starting our descent into {destinationCityName}.] Prosimy o upewnienie się, że pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy pozostałe śmieci. Dziękujemy."
      },
      {
        "en": "Ladies and gentlemen, as you heard from our captain, we are starting our descent. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "Szanowni Państwo, jak mogli Państwo usłyszeć - rozpoczynamy nasze zniżanie. Prosimy o upewnienie się, że pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy pozostałe śmieci. Dziękujemy."
      }
    ]
  },
  {
    "category": "crew-information-about-upcoming-actions",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_DESCENT']},
    "conditions": [
      {"type": "settingNotActive", "value": ["captain-information-about-upcoming-actions"]}
    ],
    "timeout": [10, 30],
    "texts": [
      {
        "en": "Ladies and gentlemen, we are starting our descent into {destinationCityName}. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Prosimy o upewnienie się, że Państwa pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy śmieci. Dziękujemy."
      },
      {
        "en": "Ladies and gentlemen, we are starting our descent. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "[Ladies and gentlemen, we are starting our descent.] Prosimy o upewnienie się, że Państwa pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy śmieci. Dziękujemy."
      }
    ]
  },

  // Final
  {
    "category": "captain-crew-take-seats",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_FINAL']},
    "timeout": [5, 10],
    "texts": [
      {
        "en": "Cabin crew, take your seats for landing."
      }
    ]
  },

  // Taxi to the gate
  {
    "category": "crew-taxi-to-gate-welcome-message",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_TAXI_POST_LANDING']},
    "timeout": [15, 20],
    "texts": [
      {
        "en": "Ladies and gentlemen, welcome to {destinationCityName}. Please remain seated with your seatbelt fastened until the aircraft has come to a complete stop and the seatbelt sign has been turned off. Please make sure you have all your personal belongings with you before you leave the aircraft. On behalf of the crew, I would like to thank you for flying with us today. We hope you had a pleasant flight and we look forward to welcoming you on board again soon.",
        "pl": "[Ladies and gentlemen, welcome to {destinationCityName}.] Prosimy o pozostanie na miejscach z zapiętymi pasami bezpieczeństwa, aż samolot całkowicie się zatrzyma i sygnał zapięcia pasów zostanie wyłączony. Upewnijcie się, że macie ze sobą wszystkie swoje rzeczy osobiste przed opuszczeniem samolotu. Dziękuję za lot z nami w dniu dzisiejszym. Mamy nadzieję, że mieli państwo przyjemny lot i mamy nadzieję gościć państwa ponownie w najbliższej przyszłości."
      },
      {
        "en": "Welcome to {destinationCityName}. Please remain seated with your seatbelt fastened until the aircraft has come to a complete stop and the seatbelt sign has been turned off. Please make sure you have all your personal belongings with you before you leave the aircraft. On behalf of the crew, I would like to thank you for flying with us today. We hope you had a pleasant flight and we look forward to welcoming you on board again soon.",
        "pl": "[Welcome to {destinationCityName}.] Prosimy o pozostanie na miejscach z zapiętymi pasami bezpieczeństwa, aż samolot całkowicie się zatrzyma i sygnał zapięcia pasów zostanie wyłączony. Upewnijcie się, że macie ze sobą wszystkie swoje rzeczy osobiste przed opuszczeniem samolotu. Dziękuję za lot z nami w dniu dzisiejszym. Mamy nadzieję, że mieli państwo przyjemny lot i mamy nadzieję gościć państwa ponownie w najbliższej przyszłości."
      }
    ]
  },

  // Deboarding
  {
    "category": "crew-deboarding",
    "trigger": {"event": "flightStateChange", "value": ['FLIGHT_ON_BLOCKS']},
    "timeout": [10, 20],
    "texts": [
      {
        "en": "Doors will be opened shortly. Please remember to take all your personal belongings with you. Make sure you have everything you brought on board. Thank you.",
        "pl": "Drzwi zostaną otwarte wkrótce. Prosimy pamiętać, aby zabrać ze sobą wszystkie swoje rzeczy osobiste. Upewnijcie się, że macie ze sobą wszystko, co przynieśliście na pokład. Dziękujemy."
      },
      {
        "en": "We have arrived at the gate. Please remember to take all your personal belongings with you. Have a great day.",
        "pl": "Dotarliśmy do bramki. Prosimy pamiętać, aby zabrać ze sobą wszystkie swoje rzeczy osobiste. Miłego dnia."
      }
    ]
  }
]

export default texts;
