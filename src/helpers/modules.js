import {
    UserGroupIcon, BookOpenIcon, NumberedListIcon,
    BookmarkSquareIcon, QueueListIcon, AcademicCapIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'

export const modulesAdmin = [
    { id: 1, name: 'Usuarios', path: '/users' },
    { id: 2, name: 'Cursos', path: '/cursos' },
    { id: 3, name: 'Unidades', path: '/unidades' },
    { id: 4, name: 'Grados', path: '/grados' },
    { id: 5, name: 'Secciones', path: '/secciones' },
    { id: 6, name: 'Alumnos', path: '/alumnos' },
    { id: 7, name: 'Notas', path: '/notas' },
]

export const iconsModulesAdmin = [
    { id: 1, name: 'Usuarios', path: '/users', icon: UserGroupIcon },
    { id: 2, name: 'Cursos', path: '/cursos', icon: BookOpenIcon },
    { id: 3, name: 'Unidades', path: '/unidades', icon: NumberedListIcon },
    { id: 4, name: 'Grados', path: '/grados', icon: BookmarkSquareIcon },
    { id: 5, name: 'Secciones', path: '/secciones', icon: QueueListIcon },
    { id: 6, name: 'Alumnos', path: '/alumnos', icon: AcademicCapIcon },
    { id: 7, name: 'Notas', path: '/notas', icon: ClipboardDocumentCheckIcon },
]

export const modulesSecretary = [
    { id: 1, name: 'Cursos', path: '/cursos' },
    { id: 2, name: 'Unidades', path: '/unidades' },
    { id: 3, name: 'Grados', path: '/grados' },
    { id: 4, name: 'Secciones', path: '/secciones' },
    { id: 5, name: 'Alumnos', path: '/alumnos' },
    { id: 6, name: 'Notas', path: '/notas' },
]

export const iconsModulesSecretary = [
    { id: 1, name: 'Cursos', path: '/cursos', icon: BookOpenIcon },
    { id: 2, name: 'Unidades', path: '/unidades', icon: NumberedListIcon },
    { id: 3, name: 'Grados', path: '/grados', icon: BookmarkSquareIcon },
    { id: 4, name: 'Secciones', path: '/secciones', icon: QueueListIcon },
    { id: 5, name: 'Alumnos', path: '/alumnos', icon: AcademicCapIcon },
    { id: 6, name: 'Notas', path: '/notas', icon: ClipboardDocumentCheckIcon },
]

export const modulesTeacher = [
    { id: 1, name: 'Notas', path: '/notas' },
]

export const iconsModulesTeacher = [
    { id: 1, name: 'Notas', path: '/notas', icon: ClipboardDocumentCheckIcon },
]
