export const GameRulesModal = () => {
  return (
    <div className='flex flex-col items-center justify-center px-0'>
      <h1 className='text-black text-3xl font-black mb-4 mt-0 self-center'>{'Правила игры'}</h1>
      <div className='self-start'>
        <h2 className='text-black  mb-5'>
          <b>Собери группы из 4-х объектов, имеющих что-то общее</b>
        </h2>
        <h3 className='text-black text-sm mb-2'>
          • Выбери 4 слова и нажми
          <b>&laquo;Проверить&raquo;</b>
        </h3>
        <h3 className='text-black text-sm mb-5'>{'• У тебя есть всего 4 попытки!'}</h3>
        <h3 className='text-black text-sm mb-2'>
          <b>Примеры категорий</b>
        </h3>
        <h3 className='text-black text-sm mb-2'>{'• ПАУЗА: интервал, затишье, антракт, брейк'}</h3>
        <h3 className='text-black text-sm mb-5'>{'• САМО___: анализ, развитие, изоляция, оборона'}</h3>
        <h3 className='text-black text-sm mb-5'>
          {'Категории всегда будут более специфичными, чем '}
          <span>&laquo;СЛОВА ИЗ 5 БУКВ&raquo;, &laquo;ИМЕНА&raquo;, &laquo;ГЛАГОЛЫ&raquo;</span>
        </h3>
        <h3 className='text-black text-sm mb-5'>
          {'Каждая игра имеет ровно одно решение. Остерегайся слов, которые кажутся подходящими к нескольким категориям!'}
        </h3>
        <h3 className='text-black text-sm mb-2'>{'Каждой категории соответствует цвет, раскрывающийся по мере отгадывания:'}</h3>
        <div className='self-start flex flex-row items-start space-x-1'>
          <div className='flex flex-col space-y-1'>
            <div className='flex items-center'>
              <span className='w-6 h-6 bg-category1 rounded-sm inline-block mr-2'></span>
            </div>
            <div className='flex items-center'>
              <span className='w-6 h-6 bg-category2 rounded-sm inline-block mr-2'></span>
            </div>
            <div className='flex items-center'>
              <span className='w-6 h-6 bg-category3 rounded-sm inline-block mr-2'></span>
            </div>
            <div className='flex items-center'>
              <span className='w-6 h-6 bg-category4 rounded-sm inline-block mr-2'></span>
            </div>
          </div>

          <div className='flex flex-col items-center mb-4'>
            <span className='text-black text-sm mb-1 self-start'>Легко</span>
            <div className='self-start px-3.5'>
              <svg
                width='12'
                height='65'
                viewBox='0 0 12 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M 6 -14 V 45 M 6 45 L 0 39 M 6 45 L 12 39'
                  stroke='black'
                  strokeWidth='1'
                />
              </svg>
            </div>
            <span className='text-black text-sm mt-0 self-start'>Замысловато</span>
          </div>
        </div>
      </div>
    </div>
  );
};
