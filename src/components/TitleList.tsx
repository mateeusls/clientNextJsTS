import { ModalDataProps } from "@/pages/services/register/registro_profissional";

interface TitleListProps {
	titleList?: ModalDataProps[];
}

export function TitleList({ titleList }: TitleListProps) {
	return (
		<div className="relative overflow-x-auto my-3">
			<h3 className="text-center text-white bg-slate-400 rounded-t">
				Título Profissional
			</h3>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3 text-center">
							Tipo
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Título
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Ações
						</th>
					</tr>
				</thead>
				<tbody>
					{titleList?.map((title, index) => (
						<tr
							key={index}
							className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
						>
							<td className="px-6 py-4 whitespace-nowrap text-center">
								{title.auxtpregistro}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-center">
								{title.tituloprofissio}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-center"></td>
							{/* <td className="px-3 py-4 whitespace-nowrap flex gap-2 justify-center">
								<button
									type="button"
									className="text-blue-500 hover:text-blue-600"
								>
									<PencilIcon size={22} />
								</button>
								<button
									type="button"
									className="text-red-500 hover:text-red-600"
								>
									<TrashIcon size={22} />
								</button>
							</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
