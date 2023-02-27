export function TitleList() {
	return (
		<div className="relative overflow-x-auto my-3">
			<h3 className="text-center text-white bg-slate-400 rounded-t">
				Título Profissional
			</h3>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Tipo
						</th>
						<th scope="col" className="px-6 py-3">
							Título
						</th>
						<th scope="col" className="px-6 py-3">
							Ações
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
