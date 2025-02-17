import ControlButton from "../button/control-button";
import GameModal from "./game-modal";

type GameRulesProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function GameWonModal(props: GameRulesProps) {
    return (
        <GameModal isOpen={props.isOpen} onClose={props.onClose}>
            <div className="flex flex-col items-center justify-center px-12">
                <h1 className="text-black text-4xl font-black my-4 self-center">
                    {"Правила игры"}
                </h1>
                <div className="self-start">
                    <h2 className="text-black text-xl mb-5">{"Собери группы из 4-х объектов, имеющих что-то общее"}</h2>
                    <h3 className="text-black  mb-2">{"• Выбери 4 слова и нажми "}<b>&laquo;Проверить&raquo;</b>{", чтобы проверить свою догадку"}</h3>
                    <h3 className="text-black  mb-5">{"• Найди группы, не совершая больше 4 ошибок!"}</h3>
                    <h3 className="text-black  mb-2"><b>Примеры категорий</b></h3>
                    <h3 className="text-black  mb-2">{"• ПАУЗЫ: ИНТЕРВАЛ, ЗАТИШЬЕ, АНТРАКТ, БРЕЙК"}</h3>
                    <h3 className="text-black  mb-5">{"• САМО___: АНАЛИЗ, РАЗВИТИЕ, ИЗОЛЯЦИЯ, ОБОРОНА"}</h3>
                    <h3 className="text-black  mb-5">{"Категории всегда будут более специфичными, чем "} <span>&laquo;СЛОВА ИЗ 5 БУКВ&raquo;, &laquo;ИМЕНА&raquo;, &laquo;ГЛАГОЛЫ&raquo;</span>
                    </h3>
                    <h3 className="text-black  mb-5">{"Каждая игра имеет ровно одно решение. Остерегайся слов, которые кажутся подходящими к нескольким категориям!"}
                    </h3>
                    <h3 className="text-black  mb-2">{"Каждой группе присваивается цвет, раскрывающийся по мере отгадывания:"}</h3>
                </div>
                <ControlButton text="Закрыть" onClick={props.onClose}  />
            </div>
        </GameModal>
    );
}
