
import { TimePeriod } from './types';

export const timelineData: TimePeriod[] = [
  {
    id: 1,
    category: 'Наука',
    startYear: 1980,
    endYear: 1985,
    events: [
      { year: 1980, description: 'Открытие озоновой дыры над Антарктидой' },
      { year: 1981, description: 'Первый полёт космического корабля многоразового использования «Колумбия»' },
      { year: 1982, description: 'Открытие вируса иммунодефицита человека (ВИЧ)' },
      { year: 1983, description: 'Открытие квазара — самого удалённого объекта во Вселенной' },
      { year: 1984, description: 'Создание первого персонального компьютера Apple Macintosh' },
      { year: 1985, description: 'Открытие озоновой дыры над Арктикой' },
    ],
  },
  {
    id: 2,
    category: 'Литература',
    startYear: 1986,
    endYear: 1991,
    events: [
      { year: 1986, description: 'Выход романа «Имя розы» Умберто Эко' },
      { year: 1987, description: 'Публикация романа «Белый шум» Дона Делилло' },
      { year: 1988, description: 'Выход романа «Алхимик» Пауло Коэльо' },
      { year: 1989, description: 'Публикация романа «Парфюмер» Патрика Зюскинда' },
      { year: 1990, description: 'Выход романа «Дети полуночи» Салмана Рушди' },
      { year: 1991, description: 'Публикация романа «Американский психопат» Брета Истона Эллиса' },
    ],
  },
  {
    id: 3,
    category: 'Кино',
    startYear: 1992,
    endYear: 1997,
    events: [
      { year: 1992, description: 'Премьера фильма «Основной инстинкт» Пола Верховена' },
      { year: 1993, description: 'Выход фильма «Парк Юрского периода» Стивена Спилберга' },
      { year: 1994, description: 'Премьера фильма «Криминальное чтиво» Квентина Тарантино' },
      { year: 1995, description: 'Выход фильма «История игрушек» — первый полнометражный компьютерный мультфильм' },
      { year: 1996, description: 'Премьера фильма «День независимости» Роланда Эммериха' },
      { year: 1997, description: 'Выход фильма «Титаник» Джеймса Кэмерона' },
      { year: 1997, description: 'Премьера фильма «Люди в чёрном» Барри Зонненфельда' },
    ],
  },
  {
    id: 4,
    category: 'Спорт',
    startYear: 1998,
    endYear: 2003,
    events: [
      { year: 1998, description: 'Чемпионат мира по футболу во Франции' },
      { year: 1999, description: 'Женская сборная США по футболу выигрывает чемпионат мира' },
      { year: 2000, description: 'Летние Олимпийские игры в Сиднее' },
      { year: 2001, description: 'Майкл Джордан возвращается в НБА' },
      { year: 2002, description: 'Чемпионат мира по футболу в Южной Корее и Японии' },
      { year: 2003, description: 'Роджер Федерер выигрывает свой первый Уимблдон' },
    ],
  },
  {
    id: 5,
    category: 'Искусство',
    startYear: 2004,
    endYear: 2009,
    events: [
      { year: 2004, description: 'Реконструкция и открытие обновлённого MoMA в Нью-Йорке' },
      { year: 2005, description: 'Выставка «Пикассо и его время» в Париже' },
      { year: 2006, description: 'Открытие музея современного искусства в Токио' },
      { year: 2007, description: 'Выставка «Искусство и революция» в Лондоне' },
      { year: 2008, description: 'Открытие галереи современного искусства в Берлине' },
      { year: 2009, description: 'Выставка «Ван Гог: письма, рисунки, картины» в Амстердаме' },
    ],
  },
  {
    id: 6,
    category: 'Технологии',
    startYear: 2010,
    endYear: 2015,
    events: [
      { year: 2010, description: 'Запуск первого iPad от Apple' },
      { year: 2011, description: 'Выпуск iPhone 4S с голосовым помощником Siri' },
      { year: 2012, description: 'Запуск Facebook приобретает Instagram' },
      { year: 2013, description: 'Выпуск PlayStation 4 от Sony' },
      { year: 2014, description: 'Запуск первого коммерческого дрона от DJI' },
      { year: 2015, description: 'Выпуск Apple Watch — первых умных часов' },
      { year: 2015, description: 'Запуск Windows 10 от Microsoft' },
    ],
  },

];
