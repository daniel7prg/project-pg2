import { Actions } from "../components/componentes"

export const columnsSecciones = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const grade = row.Grado.options.find((item) => item.id === row.Grado.value);
			return grade ? grade.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Grado',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsCursos = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const grade = row.Grado.options.find((item) => item.id === row.Grado.value);
			return grade ? grade.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Grado',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsUnidades = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsGrados = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsAlumnos = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorKey: 'Apellido.value',
		header: 'Apellido',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const grade = row.Grado.options.find((item) => item.id === row.Grado.value);
			return grade ? grade.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Grado',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const seccion = row.Seccion.options.find((item) => item.id === row.Seccion.value);
			return seccion ? seccion.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Seccion',
	},
	{
		accessorFn: (row) => {
			// Map through each selected course and get only `value`
			return row.Curso.value.map((curso) => curso.value).join(', ');
		},
		header: 'Cursos',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsNotas = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const name = row.Nombre.options.find((item) => item.id === row.Nombre.value);
			return name ? name.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Nombre',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const grade = row.Grado.options.find((item) => item.id === row.Grado.value);
			return grade ? grade.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Grado',
	},
	{
		accessorFn: (row) => {
			// Busca el valor del nombre en lugar del ID
			const seccion = row.Seccion.options.find((item) => item.id === row.Seccion.value);
			return seccion ? seccion.value : "N/A"; // 'N/A' si no encuentra el nombre
		},
		header: 'Seccion',
	},
	{
		accessorFn: (row) => {
			// Map through each selected course and get only `value`
			return row.Curso.value.map((curso) => curso.value).join(', ');
		},
		header: 'Cursos',
	},
	{
		accessorFn: (row) => {
			const unity = row.Unidad.options.find((item) => item.id === row.Unidad.value);
			return unity ? unity.value : "N/A";
		},
		header: 'Unidad',
	},
	{
		accessorKey: 'Nota.value', 
		header: 'Nota',
		cell: info => {
			return (
				<span className={(info.row.original.Nota.value <= 60 ? 'text-red-500 font-semibold' : 'text-green-500')}>
					{info.row.original.Nota.value}
				</span>
			)
		}
	},
	{
		accessorKey: 'Talentos.value',
		header: 'Talentos',
		cell: info => {
			return (
				<span className="font-semibold">
					{info.row.original.Nota.value}
				</span>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]

export const columnsUsuarios = [
	{
		accessorKey: 'ID.value',
		header: 'ID',
	},
	{
		accessorKey: 'Nombre.value',
		header: 'Nombre',
	},
	{
		accessorKey: 'Apellido.value',
		header: 'Apellido',
	},
	{
		accessorKey: 'Nombre_Usuario.value',
		header: 'Usuario',
	},
	{
		accessorFn: (row) => {
			// Map through each selected course and get only `value`
			return row.Grados.value.map((curso) => curso.value).join(', ');
		},
		header: 'Grados',
	},
	{
		accessorFn: (row) => {
			// Map through each selected course and get only `value`
			return row.Secciones.value.map((seccion) => seccion.value).join(', ');
		},
		header: 'Secciones',
	},
	{
		accessorFn: (row) => {
			// Map through each selected course and get only `value`
			return row.Cursos.value.map((curso) => curso.value).join(', ');
		},
		header: 'Cursos',
	},
	{
		accessorKey: 'actions',
		header: 'Acciones',
		cell: info => {
			return (<Actions data={info} />)
		},
		enableSorting: false
	}
]