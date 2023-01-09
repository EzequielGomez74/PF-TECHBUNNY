import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard ,faUserGroup, faBox, faListCheck, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

export const SidebarData = [
    {
        title:'Dashboard',
        icon: <FontAwesomeIcon icon={faClipboard} />,
        link: '/dashboard',
    },
    {
        title:'Usuarios',
        icon: <FontAwesomeIcon icon={faUserGroup} />,
        link: '/usuarios',
    },
    {
        title:'Productos',
        icon: <FontAwesomeIcon icon={faBox} />,
        link: '/productos',
    },
    {
        title:'Pedidos',
        icon: <FontAwesomeIcon icon={faListCheck} />,
        link: '/pedidos',
    },
    {
        title:'Newsletter',
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />,
        link: '/newsletter',
    }
]