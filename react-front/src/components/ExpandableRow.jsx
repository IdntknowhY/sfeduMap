import { useState } from 'react';

export const ExpandableRow = ({ items, t }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="w-100/101">
      {/* Адаптивный grid с полноразмерными блоками */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`bg-white dark:bg-black rounded-lg dark:shadow-[0_9px_19px_-4px_rgba(255,255,255,0.2)] shadow-md overflow-hidden ${
              expandedIndex === index ? 'md:row-span-2' : 'h-full'
            }`}
          >
            <div className="p-4 h-full flex flex-col">
              <h3 className="font-bold text-lg mb-2">{t(item.title)}</h3>
              
              {/* Основной контент с гибким размером */}
              <div className={`text-black dark:text-white flex-grow overflow-hidden transition-all duration-300 ${
                expandedIndex === index ? 'max-h-[700px]' : 'max-h-[300px]'
              }`}>
                <p>{t(item.content)}</p>
              </div>
              
              {/* Кнопка всегда внизу блока */}
              <div className="mt-auto pt-2">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-black dark:text-white hover:text-red-600 w-full text-center py-2"
                >
                  {expandedIndex === index ? t('Up ▲') : t('Down ▼')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};