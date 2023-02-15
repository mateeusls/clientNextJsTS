import { memo } from "react";

interface ColorProps {
	color?: string;
	title?: string;
	paragraph?: string;
}

function CreaPe({ color, title, paragraph }: ColorProps) {
	return (
		<>
			<div className="text-center">
				<h1 className={`${color} text-3xl md:text-5xl ${title}`}>CREA-PE</h1>
				<p
					className={`${color} text-[12px] md:text-sm w-56 md:w-60 ${paragraph} `}
				>
					Conselho Regional de Engenharia e Agronomia de Pernambuco
				</p>
			</div>
		</>
	);
}

export default memo(CreaPe);
