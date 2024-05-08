type Text = {
  category: string; // Category of the text. If the same category is used in multiple texts, only one of them will be played if text is triggered by flightStateChange event.
  weight?: number; // >= 1, default 1. This may be useful when determining which text to play when multiple texts are in the same category, and one of them should be played more often than others (basing on conditions for example).
  chanceOfPlaying?: number; // 0 - 1. If set, the text will be played with this chance. If not set, the text will always be played.
  runtimeGenerated?: boolean; // If set to true, the text will be generated at runtime, not in pre-flight generation. This may be useful when the text should be generated based on the current state of the flight (e.g. captain random information about the flight).

  // Trigger event
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

  // Additional conditions. If trigger was met, the text will be played only if all conditions are met.
  conditions?: ({
    type: 'flightState' | 'settingActive' | 'settingNotActive' | 'airlineCode';
    value: string[];
  } | {
    type: 'runtimeFlightMetadata';
    key: string;
    value: (string|number)[];
  })[];

  // Timeout for the text to be played after the trigger event was met. The text will be played after a random time between the two values (in seconds).
  timeout: [number, number],

  // Set of texts in different languages. One of them will be played randomly
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
        "pl": "Szanowni państwo, spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów bezpieczeństwa.",
        "de": "Sehr geehrte Damen und Herren, wir rechnen mit leichten Turbulenzen. Bitte kehren Sie zu Ihren Plätzen zurück und schnallen Sie sich an."
      },
      {
        "en": "Ladies and gentlemen, we've just received information about some light turbulence ahead. Please return to your seats and remain seated until the seatbelt sign is turned off.",
        "pl": "Szanowni państwo, właśnie otrzymaliśmy informację o lekkich turbulencjach przed nami. Prosimy o powrót na miejsca i pozostanie na nich do momentu wyłączenia sygnału zapięcia pasów.",
        "de": "Sehr geehrte Damen und Herren, wir haben gerade Informationen über leichte Turbulenzen erhalten. Bitte kehren Sie zu Ihren Plätzen zurück und bleiben Sie sitzen, bis das Anschnallzeichen erlischt."
      },
      {
        "en": "Hi folks, this is your captain speaking. We had to turn on the seatbelt sign due to some light turbulence ahead. Please return to your seats and fasten your seat belts.",
        "pl": "Witajcie, tu kapitan. Musieliśmy włączyć sygnał zapięcia pasów z powodu lekkich turbulencji przed nami. Prosimy o powrót na miejsca i zapięcie pasów.",
        "de": "Hallo Leute, hier spricht Ihr Kapitän. Aufgrund leichter Turbulenzen vor uns wurde das Anschnallzeichen aktiviert. Bitte kehren Sie zu Ihren Plätzen zurück und schnallen Sie sich an."
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
        "pl": "Szanowni państwo, nasz kapitan właśnie poinformował nas, że spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów do momentu wyłączenia sygnału. Używanie toalet nie jest dozwolone w tym czasie.",
        "de": "Meine Damen und Herren, unser Kapitän hat uns gerade mitgeteilt, dass wir mit leichten Turbulenzen rechnen. Bitte kehren Sie zu Ihren Plätzen zurück und bleiben Sie sitzen, bis das Anschnallzeichen erlischt. Die Nutzung der Toiletten ist derzeit nicht gestattet."
      },
      {
        "en": "Our captain has just informed us that we are expecting some light turbulence ahead. Please fasten your seatbelts.",
        "pl": "Nasz kapitan właśnie poinformował nas, że spodziewamy się lekkich turbulencji. Prosimy o zapięcie pasów.",
        "de": "Unser Kapitän hat uns gerade mitgeteilt, dass wir mit leichten Turbulenzen rechnen. Bitte legen Sie den Gurt an."
      },
      {
        "en": "As you heard from our captain, we are expecting some light turbulence ahead. Please return to your seats and fasten your seat belts. Use of the lavatories is not allowed at this time.",
        "pl": "Jak mogli państwo usłyszeć od naszego kapitana, spodziewamy się lekkich turbulencji. Prosimy o powrót na miejsca i zapięcie pasów. Używanie toalet nie jest dozwolone w tym czasie.",
        "de": "Wie Sie von unserem Kapitän erfahren haben, rechnen wir mit leichten Turbulenzen. Bitte kehren Sie zu Ihren Plätzen zurück und schnallen Sie sich an. Die Nutzung der Toiletten ist derzeit nicht gestattet."
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
        "pl": "Szanowni państwo, kapitan właśnie włączył sygnał zapięcia pasów. Prosimy o powrót na miejsca i zapięcie pasów bezpieczeństwa.",
        "de": "Meine Damen und Herren, der Kapitän hat das Anschnallzeichen eingeschaltet. Bitte kehren Sie zu Ihren Plätzen zurück und schnallen Sie sich an."
      },
      {
        "en": "Ladies and gentlemen, the seatbelt sign has been turned on. Please return to your seats and fasten your seat belts. Use of the lavatories is not allowed at this time.",
        "pl": "Szanowni państwo, sygnał zapięcia pasów został właśnie włączony. Prosimy o powrót na miejsca i zapięcie pasów. Używanie toalet nie jest dozwolone w tym czasie.",
        "de": "Meine Damen und Herren, das Anschnallzeichen ist eingeschaltet. Bitte kehren Sie zu Ihren Plätzen zurück und schnallen Sie sich an. Die Nutzung der Toiletten ist derzeit nicht gestattet."
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
        "pl": "Szanowni państwo, kapitan wyłączył sygnał zapięcia pasów. Możecie państwo teraz poruszać się po kabinie, ale zalecamy, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji.",
        "de": "Meine Damen und Herren, der Kapitän hat das Anschnallzeichen ausgeschaltet. Sie können sich jetzt in der Kabine bewegen, wir empfehlen Ihnen jedoch, im Sitzen den Sicherheitsgurt angelegt zu lassen, um unerwartete Turbulenzen zu vermeiden."
      },
      {
        "en": "As you can see, the seatbelt sign has been turned off. You may now move around the cabin, but we recommend that you keep your seatbelt fastened while seated in case of unexpected turbulence.",
        "pl": "Jak mogli państwo zauważyć, sygnał zapięcia pasów został wyłączony. Możecie państwo teraz poruszać się po kabinie, ale zalecamy, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji.",
        "de": "Wie Sie sehen, wurden die Anschnallzeichen ausgeschaltet. Sie können sich jetzt in der Kabine bewegen, wir empfehlen Ihnen jedoch, im Sitzen den Sicherheitsgurt angelegt zu lassen, um unerwartete Turbulenzen zu vermeiden."
      },
      {
        "en": "Seatbelt sign has just been turned off. You may now move around the cabin. We recommend that you keep your seatbelt fastened while seated in case of unexpected turbulence.",
        "pl": "Sygnał zapięcia pasów został właśnie wyłączony. Możecie państwo teraz poruszać się po kabinie. Zalecamy jednak, aby pasy były zapięte podczas siedzenia na wypadek niespodziewanych turbulencji.",
        "de": "Die Anschnallzeichen wurden gerade ausgeschaltet. Sie können sich nun in der Kabine bewegen. Für den Fall unerwarteter Turbulenzen empfehlen wir Ihnen, im Sitzen den Sicherheitsgurt angelegt zu lassen."
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
        "pl": "Szanowni państwo, obecnie mamy drobne opóźnienie. Przepraszamy za niedogodności i będziemy informować państwa o postępach. Pracujemy nad tym, aby jak najszybciej ruszyć w drogę. Dziękujemy za cierpliwość.",
        "de": "Sehr geehrte Damen und Herren, wir erleben derzeit eine Verzögerung. Wir entschuldigen uns für die Unannehmlichkeiten und werden Sie über den weiteren Verlauf auf dem Laufenden halten. Wir arbeiten hart daran, Sie so schnell wie möglich auf den Weg zu bringen. Vielen Dank für Ihre Geduld."
      },
      {
        "en": "Hi, this is your captain speaking. We are currently experiencing a delay. We apologize for the inconvenience and we will keep you updated on the progress. Thank you for your patience and understanding.",
        "pl": "Witajcie, tu kapitan. Obecnie mamy drobne opóźnienie. Przepraszamy za niedogodności i będziemy informować państwa o postępach. Dziękujemy za cierpliwość i zrozumienie.",
        "de": "Hallo, hier spricht Ihr Kapitän. Leider kommt es derzeit zu einer Verzögerung. Wir entschuldigen uns für die Unannehmlichkeiten und werden Sie über den weiteren Verlauf auf dem Laufenden halten. Vielen Dank für Ihre Geduld und Ihr Verständnis."
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
        "pl": "Chcielibyśmy jeszcze raz przeprosić za opóźnienie. Mamy nadzieję, że mieli państwo przyjemny lot i z niecierpliwością czekamy na ponowne spotkanie.",
        "de": "Für die Verzögerung möchten wir uns noch einmal bei Ihnen entschuldigen. Wir hoffen, dass Sie einen angenehmen Flug hatten und freuen uns auf ein baldiges Wiedersehen."
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
        "pl": "[Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {captainName} i jestem kapitanem podczas tego lotu. Chciałbym państwa serdecznie powitać na pokładzie i podziękować za wybór naszego przewoźnika. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. [Our flight today will take approximately {flightTime}.] Jeśli mają państwo jakieś pytania, nie wahajcie się zwrócić do jednego z członków naszej załogi. [Thank you for flying with {airlineName}.]",
        "de": "[Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Mein Name ist {captainName} und ich bin der Kapitän dieses Fluges. Ich begrüße Sie an Bord und danke Ihnen, dass Sie sich entschieden haben, heute mit uns zu fliegen. Wir bereiten uns derzeit auf den Abflug vor und werden in Kürze abheben. [Our flight today will take approximately {flightTime}.] Wenn Sie Fragen haben oder Hilfe benötigen, wenden Sie sich bitte an einen unserer Flugbegleiter. [Thank you for flying with {airlineName}.]"
      },
      {
        "en": "Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}. My name is {captainName} and I am the captain of this flight. We are currently preparing for departure and we will be taking off shortly. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {captainName} i jestem kapitanem podczas tego lotu. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. [Thank you for choosing {airlineName}.] Życzymy miłego lotu.",
        "de": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Mein Name ist {captainName} und ich bin der Kapitän dieses Fluges. Wir bereiten uns derzeit auf den Abflug vor und werden in Kürze abheben. [Thank you for choosing {airlineName}.] Guten Flug."
      },
      {
        "en": "Hi folks, this is your captain speaking. Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}. We are currently preparing for departure and we will be taking off shortly. Thank you for choosing to fly with us today.",
        "pl": "Z tej strony kapitan. [Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Dziękujemy za wybór naszego przewoźnika.",
        "de": "Hallo Leute, hier spricht Ihr Kapitän. [Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Wir bereiten uns derzeit auf den Abflug vor und werden in Kürze abheben. Vielen Dank, dass Sie sich entschieden haben, heute mit uns zu fliegen."
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
        "pl": "Witamy na pokładzie. Nazywam się {crewName} i jestem członkiem załogi pokładowej podczas tego lotu. Jak mogli państwo usłyszeć od naszego kapitana - obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Prosimy o zapięcie pasów bezpieczeństwa, ustawienie oparcia fotela i stolika w pozycji pionowej. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. Jeśli mają państwo jakieś pytania lub potrzebują pomocy, proszę zwrocić się do mnie lub jednego z moich kolegów.",
        "de": "Hallo und willkommen an Bord. Mein Name ist {crewName} und bin ihr Flugbegleiter auf diesem Flug. Wie Sie von unserem Kapitän hören konnten, bereiten wir uns derzeit auf die Abreise vor und werden in Kürze abheben. Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Bitte schalten Sie alle persönlichen elektronischen Geräte, einschließlich Laptops und Mobiltelefone, aus. Für die Dauer des Fluges ist das Rauchen verboten. Wenn Sie Fragen haben oder Hilfe benötigen, zögern Sie bitte nicht, mich oder einen meiner Kollegen zu fragen."
      },
      {
        "en": "Ladies and gentlemen, welcome onboard. My name is {crewName} and I am the cabin crew member on this flight. We ask that you please fasten your seatbelts at this time and secure all baggage underneath your seat or in the overhead compartments. We also ask that your seats and table trays are in the upright position for take-off. Please turn off all personal electronic devices, including laptops and cell phones. Smoking is prohibited for the duration of the flight. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "Panie i panowie, witamy na pokładzie. Nazywam się {crewName} i jestem członkiem załogi pokładowej podczas tego lotu. Prosimy o zapięcie pasów bezpieczeństwa i umieszczenie bagażu pod siedzeniem lub w schowkach bagażowych. Prosimy również o ustawienie oparcia fotela i stolika w pozycji pionowej przed startem. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. [Thank you for choosing {airlineName}.] Życzymy miłego lotu.",
        "de": "Sehr geehrte Damen und Herren, willkommen an Bord. Mein Name ist {crewName} und ich bin ihr Flugbegleiter auf diesem Flug. Wir bitten Sie, zu diesem Zeitpunkt Ihre Sicherheitsgurte anzulegen und das gesamte Gepäck unter Ihrem Sitz oder in den Gepäckfächern zu verstauen. Wir bitten Sie außerdem, dass sich Ihre Sitze und Tischablagen zum Abflug in aufrechter Position befinden. Bitte schalten Sie alle persönlichen elektronischen Geräte, einschließlich Laptops und Mobiltelefone, aus. Für die Dauer des Fluges ist das Rauchen verboten. [Thank you for choosing {airlineName}.] Guten Flug."
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
        "pl": "[Welcome aboard on this {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {crewName} i jestem członkiem załogi podczas tego lotu. Obecnie przygotowujemy się do startu i wkrótce rozpoczniemy kołowanie. Prosimy o zapięcie pasów bezpieczeństwa, ustawienie oparcia fotela i stolika w pozycji pionowej. Jeśli mają państwo jakieś pytania lub potrzebują pomocy, proszę nie wahajcie się zwrócić do mnie lub jednego z moich kolegów. [Thank you for flying with {airlineName}.]",
        "de": "[Welcome aboard on this {airlineName} flight.] [Today we are flying from {originCityName} to {destinationCityName}.] Mein Name ist {crewName} und ich bin ihr Flugbegleiter auf diesem Flug. Wir bereiten uns derzeit auf den Abflug vor und werden in Kürze abheben. Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Wenn Sie Fragen haben oder Hilfe benötigen, zögern Sie bitte nicht, mich oder einen meiner Kollegen zu fragen. [Thank you for flying with {airlineName}.]"
      },
      {
        "en": "Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}. My name is {crewName} and I am the cabin crew member on this flight. We ask that you please fasten your seatbelts at this time and secure all baggage underneath your seat or in the overhead compartments. We also ask that your seats and table trays are in the upright position for take-off. Please turn off all personal electronic devices, including laptops and cell phones. Smoking is prohibited for the duration of the flight. Thank you for choosing {airlineName}. Enjoy your flight.",
        "pl": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Nazywam się {crewName} i jestem członkiem załogi podczas tego lotu. Prosimy o zapięcie pasów bezpieczeństwa i umieszczenie bagażu pod siedzeniem lub w schowkach bagażowych. Prosimy również o ustawienie oparcia fotela i stolika w pozycji pionowej przed startem. Prosimy o wyłączenie wszystkich urządzeń elektronicznych, w tym laptopów i telefonów komórkowych. Palenie jest zabronione podczas trwania lotu. [Thank you for choosing {airlineName}.] Życzymy miłego lotu.",
        "de": "[Ladies and gentlemen, welcome onboard {airlineName} flight from {originCityName} to {destinationCityName}.] Mein Name ist {crewName} und ich bin ihr Flugbegleiter auf diesem Flug. Wir bitten Sie, zu diesem Zeitpunkt Ihre Sicherheitsgurte anzulegen und das gesamte Gepäck unter Ihrem Sitz oder in den Gepäckfächern zu verstauen. Wir bitten Sie außerdem, Ihre Sitze und Tischablagen zum Abflug in eine aufrechte Position zu bringen. Bitte schalten Sie alle persönlichen elektronischen Geräte, einschließlich Laptops und Mobiltelefone, aus. Für die Dauer des Fluges ist das Rauchen verboten. [Thank you for choosing {airlineName}.] Guten Flug."
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
        "pl": "[Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Prosimy pamiętać o tym, aby mieć zapięte pasy zawszy gdy Państwo siedzą i zawsze, gdy sygnał zapięcia pasów jest włączony.",
        "de": "[Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Bitte denken Sie daran, Ihren Sicherheitsgurt immer anzulegen, wenn Sie sitzen und die Sicherheitsgurtwarnung aktiviert ist."
      },
      {
        "en": "Hi, it's me again. I just thought I'll share some information with you. Our flight today will take approximately {flightTime}. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}. We expect a smooth flight with a small chance of light turbulences. Please relax and enjoy the flight.",
        "pl": "Witajcie, to znowu ja. Chciałem podzielić się z wami kilkoma informacjami. [Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Spodziwamy się spokojnego lotu z małymi szansami na lekkie turbulencje. Życzę miłego lotu.",
        "de": "Hallo, ich bin es wieder. Ich dachte, ich teile einige Informationen mit Ihnen. [Our flight today will take approximately {flightTime}.] [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}.] Wir erwarten einen ruhigen Flug mit einer geringen Wahrscheinlichkeit leichter Turbulenzen. Bitte entspannen Sie sich und genießen Sie den Flug."
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
        "pl": "Szanowni państwo, krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem.",
        "de": "Sehr geehrte Damen und Herren, kurz nach dem Start servieren wir Ihnen Snacks und Getränke. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen."
      },
      {
        "en": "Shortly after takeoff we'll start serving snacks and drinks. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem.",
        "de": "Kurz nach dem Start beginnen wir mit dem Servieren von Snacks und Getränken. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen."
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
        "pl": "[Our flight today will take approximately {flightTime}.] Kapitan właśnie poinformował mnie, że lot powinien być spokojny. Krótko po starcie rozpoczniemy serwowanie przekąsek i napojów. Nasze menu znajdą państwo w kieszeni siedzenia przed państwem.",
        "de": "[Our flight today will take approximately {flightTime}.] Der Kapitän hat mir mitgeteilt, dass der Flug reibungslos verlaufen sollte. Kurz nach dem Start beginnen wir mit dem Servieren von Snacks und Getränken. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen."
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
        "pl": "Szanowni państwo, w imieniu załogi proszę o uwagę. Na pokładzie samolotu znajduje się {aircraftEmergencyExistsCount} wyjść awaryjnych. Proszę poświęcić chwilę, aby zlokalizować wyjście najbliższe Państwu. Zwróć szczególną uwagę, ponieważ najbliższe wyjście może znajdować się za Państwem. W przypadku nagłej utraty ciśnienia w kabinie, zachowaj spokój i słuchaj instrukcji członków załogi. Maseczki tlenowe spadną z góry nad Państwa miejscem. Umieść maseczkę na ustach i nosie. Pociągnij za pasek, aby ją naciągnąć. Jeśli podróżujesz z dziećmi, upewnij się, że najpierw założysz swoją maseczkę, zanim pomożesz swoim dzieciom. W przypadku awaryjnego lądowania i ewakuacji, pozostaw swoje bagaże podręczne. Kamizelki ratunkowe znajdują się pod Państwa siedzeniami, a oświetlenie awaryjne poprowadzi Państwa do najbliższego wyjścia. Prosimy upewnić się, że wszystkie bagaże podręczne są bezpiecznie schowane podczas lotu. Podczas oczekiwania na start, proszę poświęcić chwilę na zapoznanie się z kartą bezpieczeństwa znajdującą się w kieszeni siedzenia przed Państwem. Dziękujemy za uwagę.",
        "de": "Sehr geehrte Damen und Herren, im Namen der Besatzung bitte ich Sie, Ihre Aufmerksamkeit auf die Besatzungsmitglieder zu richten, während wir die Notfallmaßnahmen überprüfen. Es gibt {aircraftEmergencyExistsCount} Notausgänge in diesem Flugzeug. Nehmen Sie sich einen Moment Zeit, um den nächstgelegenen Ausgang zu finden. Beachten Sie, dass sich der nächste Ausgang möglicherweise hinter Ihnen befindet. Sollte es in der Kabine zu einem plötzlichen Druckverlust kommen, bleiben Sie ruhig und achten Sie auf die Anweisungen des Kabinenpersonals. Sauerstoffmasken fallen von über Ihrem Sitz herunter. Legen Sie die Maske wie folgt über Mund und Nase. Ziehen Sie am Riemen, um ihn festzuziehen. Wenn Sie mit Kindern reisen, stellen Sie sicher, dass Sie zuerst Ihre eigene Maske tragen, bevor Sie Ihren Kindern helfen. Lassen Sie im unwahrscheinlichen Fall einer Notlandung und Evakuierung Ihr Handgepäck zurück. Unter Ihren Sitzen befinden sich Rettungsinseln und eine Notbeleuchtung führt Sie zum nächstgelegenen Ausgang. Wir bitten Sie, während des Fluges darauf zu achten, dass das gesamte Handgepäck sicher verstaut ist. Während wir auf den Abflug warten, nehmen Sie sich bitte einen Moment Zeit und überprüfen Sie die Sicherheitsdatenkarte in der Sitztasche vor Ihnen. Vielen Dank für Ihre Aufmerksamkeit."
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
        "pl": "Szanowni państwo, prosimy o pozostanie na miejscach podczas wznoszenia do naszej wysokości przelotowej. Wkrótce rozpoczniemy serwis pokładowy. Menu znajdą państwo w kieszeni siedzenia przed sobą.",
        "de": "Sehr geehrte Damen und Herren, bitte bleiben Sie sitzen, während wir auf unsere Reiseflughöhe steigen. Wir werden in Kürze mit unserem Bordservice beginnen. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen."
      },
      {
        "en": "We are now climbing to our cruising altitude. We will be starting our in-flight service shortly. You can find our sky menu in the seat pocket in front of you.",
        "pl": "Obecnie wznosimy się do naszej wysokości przelotowej. Wkrótce rozpoczniemy serwis pokładowy. Menu znajdą państwo w kieszeni siedzenia przed sobą.",
        "de": "Wir steigen jetzt auf unsere Reiseflughöhe. Wir werden in Kürze mit unserem Bordservice beginnen. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen."
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
        "pl": "Szanowni państwo, rozpoczynamy serwis pokładowy. Przypominamy, że akceptujemy płatności kartą oraz gotówką. Menu znajdą państwo w kieszeni siedzenia przed sobą. Prosimy o pozostanie na miejscach podczas naszej obsługi. Jeśli mają Państwo specjalne potrzeby, prosimy zwrócić się do jednego z członków naszej załogi. Dziękujemy.",
        "de": "Meine Damen und Herren, wir starten jetzt unseren Bordservice. Wir möchten Sie daran erinnern, dass wir sowohl Kartenzahlungen als auch Bargeld akzeptieren. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen. Bitte bleiben Sie sitzen, während wir Sie bedienen. Wenn Sie etwas benötigen, zögern Sie bitte nicht, eines unserer Kabinenpersonalmitglieder zu fragen. Vielen Dank."
      },
      {
        "en": "We are now starting our in-flight service. We'd like to remind you that we accept card payments as well as cash. You can find our sky menu in the seat pocket in front of you. Please remain seated while we serve you. If you need anything, please don't hesitate to ask one of our cabin crew members. Thank you.",
        "pl": "Rozpoczynamy serwis pokładowy. Przypominamy, że akceptujemy płatności kartą oraz gotówką. Menu znajdą państwo w kieszeni siedzenia przed sobą. Prosimy o pozostanie na miejscach podczas naszej obsługi. Jeśli mają Państwo specjalne potrzeby, prosimy zwrócić się do jednego z członków naszej załogi. Dziękujemy.",
        "de": "Wir starten jetzt unseren Bordservice. Wir möchten Sie daran erinnern, dass wir sowohl Kartenzahlungen als auch Bargeld akzeptieren. Unser Sky-Menü finden Sie in der Sitztasche vor Ihnen. Bitte bleiben Sie sitzen, während wir Sie bedienen. Wenn Sie etwas benötigen, zögern Sie bitte nicht, eines unserer Kabinenpersonalmitglieder zu fragen. Danke schön."
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
        "pl": "Szanowni państwo, rozpoczynamy sprzedaż naszych produktów premium. Dziś mamy dla państwa specjalną ofertę. Kupując zdrapkę, możecie państwo wygrać darmowy lot lub inne fantastyczne nagrody. Powodzenia!",
        "de": "Sehr Damen und Herren, wir starten jetzt unseren Bordeinkaufsservice. Heute haben wir ein besonderes Angebot für Sie. Unsere Rubbellose sind jetzt zum Kauf verfügbar. Zu gewinnen gibt es einen Freiflug oder andere tolle Preise. Viel Glück!"
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
        "pl": "Szanowni państwo, rozpoczynamy serwis pokładowy. Dziś mamy dla państwa specjalną ofertę. Jeśli kupią państwo dwa zapachy, trzeci będzie tańszy o 10%.",
        "de": "MSehr geehrte Damen und Herren, wir starten jetzt unseren Bordeinkaufsservice. Heute haben wir ein besonderes Angebot für Sie. Wenn Sie zwei Parfums kaufen, erhalten Sie 10 % Rabatt auf das dritte."
      },
      {
        "en": "We are now starting our in-flight shopping service. Today we highly recommend our special offer - a set of three perfumes for the price of two. You can find our shopping catalog in the seat pocket in front of you.",
        "pl": "Rozpoczynamy serwis pokładowy. Dziś polecamy naszą specjalną ofertę - zestaw trzech zapachów w cenie dwóch. Katalog produktów znajdą państwo w kieszeni siedzenia przed sobą.",
        "de": "Wir starten jetzt unseren Bordeinkaufsservice. Heute empfehlen wir Ihnen unser Sonderangebot – ein Set mit drei Parfums zum Preis von zwei. Sie finden unseren Einkaufskatalog in der Sitztasche vor Ihnen."
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
        "pl": "Szanowni państwo, tu kapitan. Obecnie przelatujemy na wysokości {currentAltitudeFt} stóp z prędkością {groundSpeedKm} kilometrów na godzinę. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Proszę usiąść wygodnie, zrelaksować się i cieszyć resztą lotu.",
        "de": "Sehr geehrte Damen und Herren, hier spricht Ihr Kapitän. Wir fliegen derzeit in einer Höhe von {currentAltitudeFt} Fuß mit einer Geschwindigkeit von {groundSpeedKm} Kilometern pro Stunde. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Lehnen Sie sich zurück, entspannen Sie sich und genießen Sie den Rest des Fluges."
      },
      {
        "en": "Hi, it's me again. I just wanted to share some information with you. We are currently cruising at an altitude of {currentAltitudeFt} feet at an speed of {groundSpeedKm} kilometers per hour. The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees. Enjoy the flight.",
        "pl": "Proszę Państwa, tu kapitan. Chciałem podzielić się z wami kilkoma informacjami. Obecnie przelatujemy na wysokości {currentAltitudeFt} stóp z prędkością {groundSpeedKm} kilometrów na godzinę. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Miłego lotu.",
        "de": "Hallo, ich bin es wieder. Ich möchte ein paar Informationen mit Ihnen teilen. Wir fliegen derzeit in einer Höhe von {currentAltitudeFt} Fuß mit einer Geschwindigkeit von {groundSpeedKm} Kilometern pro Stunde. [The weather in {destinationCityName} is {destinationCityWeatherHumanDescription}, with a temperature of {destinationCityTemperature} degrees.] Genieße den Flug."
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
        "pl": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Proszę postępować zgodnie z instrukcjami członków załogi. Dziękujemy.",
        "de": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Bitte folgen Sie den Anweisungen des Kabinenpersonals, während wir uns auf die Landung vorbereiten. Danke schön."
      },
      {
        "en": "Ladies and gentlemen, we are starting our descent. Please follow the instructions of the cabin crew as we prepare for landing. Thank you.",
        "pl": "Ladies and gentlemen, we are starting our descent. Proszę postępować zgodnie z instrukcjami członków załogi. Dziękujemy.",
        "de": "Sehr geehrte Damen und Herren, wir beginnen unseren Sinkflug. Bitte folgen Sie den Anweisungen des Kabinenpersonals, während wir uns auf die Landung vorbereiten. Danke schön."
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
        "pl": "[Ladies and gentlemen, as you heard from our captain, we are starting our descent into {destinationCityName}.] Prosimy o upewnienie się, że pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy pozostałe śmieci. Dziękujemy.",
        "de": "[Ladies and gentlemen, as you heard from our captain, we are starting our descent into {destinationCityName}.] Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Wir holen alle verbleibenden Serviceartikel in wenigen Minuten ab. Danke schön."
      },
      {
        "en": "Ladies and gentlemen, as you heard from our captain, we are starting our descent. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "Szanowni Państwo, jak mogli Państwo usłyszeć - rozpoczynamy nasze zniżanie. Prosimy o upewnienie się, że pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy pozostałe śmieci. Dziękujemy.",
        "de": "Sehr geehrte Damen und Herren, wie Sie von unserem Kapitän gehört haben, beginnen wir mit dem Sinkflug. Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Wir holen alle verbleibenden Serviceartikel in wenigen Minuten ab. Danke schön."
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
        "pl": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Prosimy o upewnienie się, że Państwa pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy śmieci. Dziękujemy.",
        "de": "[Ladies and gentlemen, we are starting our descent into {destinationCityName}.] Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Wir holen alle verbleibenden Serviceartikel in wenigen Minuten ab. Danke schön."
      },
      {
        "en": "Ladies and gentlemen, we are starting our descent. Please make sure that your seatbelt is fastened and your seat back and tray table are in the upright position. We will collect any remaining service items in a few minutes. Thank you.",
        "pl": "Ladies and gentlemen, we are starting our descent. Prosimy o upewnienie się, że Państwa pasy są zapięte, a oparcie fotela i stolik są w pozycji pionowej. Wkrótce zbierzemy śmieci. Dziękujemy.",
        "de": "Sehr geehrte Damen und Herren, wir beginnen unseren Sinkflug. Bitte stellen Sie sicher, dass Ihr Sicherheitsgurt angelegt ist und sich Ihre Rückenlehne und Ihr Tabletttisch in einer aufrechten Position befinden. Wir holen alle verbleibenden Serviceartikel in wenigen Minuten ab. Danke schön."
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
        "pl": "[Ladies and gentlemen, welcome to {destinationCityName}.] Prosimy o pozostanie na miejscach z zapiętymi pasami bezpieczeństwa, aż samolot całkowicie się zatrzyma i sygnał zapięcia pasów zostanie wyłączony. Upewnijcie się, że macie ze sobą wszystkie swoje rzeczy osobiste przed opuszczeniem samolotu. Dziękuję za lot z nami w dniu dzisiejszym. Mamy nadzieję, że mieli państwo przyjemny lot i mamy nadzieję gościć państwa ponownie w najbliższej przyszłości.",
        "de": "[Ladies and gentlemen, welcome to {destinationCityName}.] Bitte bleiben Sie mit angelegtem Sicherheitsgurt sitzen, bis das Flugzeug vollständig zum Stillstand gekommen ist und das Anschnallzeichen ausgeschaltet ist. Bitte stellen Sie sicher, dass Sie alle Ihre persönlichen Gegenstände bei sich haben, bevor Sie das Flugzeug verlassen. Im Namen der Crew möchte ich Ihnen dafür danken, dass Sie heute mit uns geflogen sind. Wir hoffen, Sie hatten einen angenehmen Flug und freuen uns, Sie bald wieder an Bord begrüßen zu dürfen."
      },
      {
        "en": "Welcome to {destinationCityName}. Please remain seated with your seatbelt fastened until the aircraft has come to a complete stop and the seatbelt sign has been turned off. Please make sure you have all your personal belongings with you before you leave the aircraft. On behalf of the crew, I would like to thank you for flying with us today. We hope you had a pleasant flight and we look forward to welcoming you on board again soon.",
        "pl": "[Welcome to {destinationCityName}.] Prosimy o pozostanie na miejscach z zapiętymi pasami bezpieczeństwa, aż samolot całkowicie się zatrzyma i sygnał zapięcia pasów zostanie wyłączony. Upewnijcie się, że macie ze sobą wszystkie swoje rzeczy osobiste przed opuszczeniem samolotu. Dziękuję za lot z nami w dniu dzisiejszym. Mamy nadzieję, że mieli państwo przyjemny lot i mamy nadzieję gościć państwa ponownie w najbliższej przyszłości.",
        "de": "[Welcome to {destinationCityName}.] Bitte bleiben Sie mit angelegtem Sicherheitsgurt sitzen, bis das Flugzeug vollständig zum Stillstand gekommen ist und das Anschnallzeichen ausgeschaltet ist. Bitte stellen Sie sicher, dass Sie alle Ihre persönlichen Gegenstände bei sich haben, bevor Sie das Flugzeug verlassen. Im Namen der Crew möchte ich Ihnen dafür danken, dass Sie heute mit uns geflogen sind. Wir hoffen, Sie hatten einen angenehmen Flug und freuen uns, Sie bald wieder an Bord begrüßen zu dürfen."
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
        "pl": "Drzwi zostaną otwarte wkrótce. Prosimy pamiętać, aby zabrać ze sobą wszystkie swoje rzeczy osobiste. Upewnijcie się, że macie ze sobą wszystko, co przynieśliście na pokład. Dziękujemy.",
        "de": "Die Türen werden in Kürze geöffnet. Bitte denken Sie daran, alle Ihre persönlichen Gegenstände mitzunehmen. Stellen Sie sicher, dass Sie alles dabei haben, was Sie an Bord mitgebracht haben. Danke schön."
      },
      {
        "en": "We have arrived at the gate. Please remember to take all your personal belongings with you. Have a great day.",
        "pl": "Dotarliśmy do bramki. Prosimy pamiętać, aby zabrać ze sobą wszystkie swoje rzeczy osobiste. Miłego dnia.",
        "de": "Wir sind am Gate angekommen. Bitte denken Sie daran, alle Ihre persönlichen Gegenstände mitzunehmen. Ich wünsche ihnen einen wunderbaren Tag."
      }
    ]
  }
]

export default texts;
