import {TChecks} from "@/lib/types";

export const staticItems: TChecks[] = [
    {
        label: "Ранкова програма",
        description: "Розпочни день з привітання нового дня, фізичних вправ та холодного душу. Вислови вдячність і зроби записи у журналі. Це стартовий механізм дня, який можна налаштувати індивідуально."
    },
    {
        label: "Вдяка",
        description: "Вислови вдячність трьома словами: подзвони, напиши в соціальних мережах або на папері. Це зміцнить стосунки і підвищить настрій."
    },
    {
        label: "Організаційна ефективність",
        description: "Зроби 1-2 важливі справи глибокої праці. Сконцентруйся на пріоритетних задачах."
    },
    {
        label: "Giving",
        description: "Дай щось іншим, не очікуючи нічого взамін. Це може бути допомога, порада або просто посмішка."
    },
    {
        label: "Фізична активність",
        description: "Займайся фізичними вправами, щоб підтримувати здоров'я та енергію. Це може бути прогулянка, тренування або йога."
    },
    {
        label: "Їжа, харчування",
        description: "Харчуйся здоровою їжею протягом дня. Звертай увагу на збалансований раціон і режим харчування."
    },
    {
        label: "Вечірня програма + сон",
        description: "Заверши день вечірніми ритуалами, які допоможуть розслабитися. Підготуйся до якісного сну для відновлення сил."
    },
    {
        label: "Помітки в журналі",
        description: "Запиши важливі події та думки дня у своєму журналі. Це допоможе відстежувати прогрес і рефлексувати."
    },
    {
        label: "Читання",
        description: "Приділи час читанню, щоб розширити знання та надихнутися новими ідеями."
    },
    {
        label: "Читання",
        description: "Продовжуй розвиватися через читання книг або статей, які тебе цікавлять."
    },
    {
        label: "Любов і медитація",
        description: "Виділи час для медитації та спілкування з близькими. Це зміцнить внутрішній спокій і стосунки."
    },
    {
        label: "Ядерна звичка",
        description: "Практикуй свою ключову звичку щодня, щоб закріпити її та досягти довгострокових цілей."
    },
];


export const cairosDaysTasks: Record<number, TChecks[]> = {
    1: [
        {
            label: "Розширити записи в щоденнику вдячності",
            description: "Записуйте як мінімум три речі, за які ви вдячні кожен день. Використовуйте додаток, наприклад, Day One, щоб структурувати ваші думки."
        },
        {
            label: "Записи в книзі проекту свого життя",
            description: "Ведіть довгостроковий план своїх цілей, мрій та амбіцій. Використовуйте Microsoft OneNote або Notion для зручного ведення записів."
        },
        {
            label: "Малювати",
            description: "Присвятіть 20-30 хвилин малюванню. Використовуйте звичайний блокнот для розкриття творчого потенціалу."
        },
        {
            label: "Зробити щось екстраординарне",
            description: "Виконайте дію, яка виходить за рамки звичайного, наприклад, відвідайте нове місце або займіться новим хобі."
        },
        {
            label: "Нова звичка",
            description: "Виберіть нову корисну звичку, яку ви хочете сформувати, і почніть з маленьких кроків."
        },
        {
            label: "Зробити щось своїми руками",
            description: "Спробуйте зробити щось корисне руками: зварити каву, приготувати страву або створити щось власноруч."
        },
    ],
    2: [
        {
            label: "Писати про проект X",
            description: "Присвятіть час для глибокого аналізу ідеї вашого проекту. Записуйте всі свої думки."
        },
        {
            label: "Підсумувати журнал фінансів",
            description: "Перегляньте свої витрати та доходи за місяць. Використовуйте MoneyWiz або таблиці Google для ведення фінансових записів."
        },
        {
            label: "Зробити інвестицію або вивчати що зробити",
            description: "Інвестуйте в криптовалюту через Binance або у фондовий ринок через Robinhood. Якщо не готові, почніть з вивчення YouTube-каналів про інвестування."
        },
        {
            label: "Обрати 2-7 навичок з наших 100+ або Баффета та записати їх",
            description: "Оберіть навички для розвитку, наприклад, швидке читання або публічні виступи. Записуйте прогрес у додатку Trello."
        },
        {
            label: "Зробити записи в своїх щоденних проектах, Project Management",
            description: "Оновіть статуси в ваших проектних завданнях. Використовуйте інструменти, як Jira або Asana."
        },
        {
            label: "Пройти курс з бізнес навчання",
            description: "Зареєструйтесь на курс на Coursera або Udemy по бізнесу або управлінню проектами."
        },
    ],
    3: [
        {
            label: "Прочитати 2х більше сторінок",
            description: "Читання є ключем до розвитку. Спробуйте читати більше сторінок книги щодня, використовуючи додаток Kindle для легкого доступу."
        },
        {
            label: "Їсти Brain Foods по списку Джима Квіка",
            description: "Включіть в раціон продукти, що покращують мозкову діяльність, такі як авокадо, волоські горіхи та чорниця."
        },
        {
            label: "Вивчати іноземну мову",
            description: "Використовуйте додаток Duolingo для щоденного вивчення нових слів та фраз іноземною мовою."
        },
        {
            label: "Швидке читання",
            description: "Скористайтеся додатками, такими як Spreeder, для тренування швидкого читання та збільшення кількості прочитаного матеріалу."
        },
        {
            label: "Медитація",
            description: "Виділіть 10 хвилин на медитацію з додатком Headspace або Calm для покращення концентрації."
        },
        {
            label: "Фізичні вправи",
            description: "Виділіть хоча б 30 хвилин на фізичні вправи. Можна використовувати додаток Nike Training Club для різноманітності тренувань."
        },
    ],
    4: [
        {
            label: "Читати книги авторів по емоційному інтелекту",
            description: "Розпочніть з книг Деніела Гоулмана або «Емоційний інтелект» Тревіса Бредбері."
        },
        {
            label: "Стримувати миттєву реакцію на 5 секунд",
            description: "Практикуйте паузу перед відповіддю на подразники, щоб навчитися реагувати більш спокійно."
        },
        {
            label: "Висловити слова вдячності 5 людям",
            description: "Напишіть або скажіть 5 людям слова вдячності, використовуючи прості повідомлення або навіть соціальні мережі."
        },
        {
            label: "Познайомитися з новими людьми",
            description: "Відвідайте захід або зустріч, де можна познайомитися з новими цікавими людьми."
        },
        {
            label: "Зробити вчинок любові для близької людини",
            description: "Зробіть сюрприз для когось із близьких, наприклад, приготувавши смачну вечерю або залишивши приємну записку."
        },
        {
            label: "Медитація на природі",
            description: "Знайдіть час для медитації на свіжому повітрі. Виберіться в парк або на природу."
        },
    ],
    5: [
        {
            label: "Записати в щоденник план на тиждень по здоров'ю",
            description: "Розпишіть свої цілі щодо фізичної активності, харчування та сну на наступний тиждень."
        },
        {
            label: "Прочитати статтю про сон або харчування та записати що покращити",
            description: "Відвідайте сайти на зразок Healthline або MindBodyGreen для нових рекомендацій щодо сну або харчування."
        },
        {
            label: "Зробити огляд по харчуванню за тиждень",
            description: "Оцініть свій тижневий раціон та вирішіть, що варто змінити. Використовуйте додаток MyFitnessPal для відстеження харчування."
        },
        {
            label: "Звести помітки по спорту за тиждень",
            description: "Зберіть свої спортивні результати за тиждень та розпишіть план для подальшого покращення."
        },
        {
            label: "Розповісти про свій прогрес у соц мережах",
            description: "Поділіться своїм прогресом з друзями у Facebook чи Instagram, щоб отримати підтримку."
        },
        {
            label: "Зробити фото себе щасливого та здорового",
            description: "Сфотографуйте себе, коли відчуваєте найкращий емоційний та фізичний стан."
        },
    ],
    6: [
        {
            label: "Прочитати вірш улюбленого поета",
            description: "Виділіть час для насолоди улюбленою поезією, наприклад, віршем Тараса Шевченка або іншого близького вам автора."
        },
        {
            label: "Створити хоку з ChatGPT на основі щоденника",
            description: "Спробуйте створити короткий поетичний твір у стилі хоку, використовуючи ваші думки з щоденника."
        },
        {
            label: "Прочитати молитву",
            description: "Відведіть час для духовного спокою, прочитавши улюблену молитву або рефлексію."
        },
        {
            label: "Послухати музику яка вас надихає",
            description: "Складіть плейлист з улюблених треків, що додають вам сил та натхнення."
        },
        {
            label: "Побути на природі, послухати звуки природи",
            description: "Відправтесь на прогулянку та зосередьтесь на навколишніх звуках природи, це допоможе зняти стрес."
        },
        {
            label: "Прочитати один розділ з книги мудрості",
            description: "Відкрийте книгу філософії чи духовності, наприклад, «Медитації» Марка Аврелія."
        },
    ],
    0: [
        {
            label: "Зробити щось мудре та зафіксувати це",
            description: "Прийміть обдумане рішення або дію, що додасть вам життєвого досвіду, і обов'язково запишіть це."
        },
        {
            label: "Зробити щось справедливе",
            description: "Захистіть когось або підтримайте справедливість у ситуації, де це необхідно."
        },
        {
            label: "Притамувати свої пристрасті",
            description: "Практикуйте стримання в емоційно напружених ситуаціях."
        },
        {
            label: "Зробити щось сміливе",
            description: "Виконайте дію, яка вимагає від вас подолання страху або невпевненості."
        },
        {
            label: "Прочитати один розділ книги про Стоїцизм",
            description: "Зверніться до класичних творів стоїцизму, наприклад, прочитайте розділ з твору Сенеки."
        },
        {
            label: "Зробити допис в соц мережах про свої забов'язання",
            description: "Поділіться своїми зобов'язаннями у соціальних мережах, щоб зберегти відповідальність перед собою та іншими."
        },
    ],
};

