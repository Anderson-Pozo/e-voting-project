import { useRouter } from "next/router"
import { SlideMenu } from 'primereact/slidemenu';
import { MenuItem } from 'primereact/menuitem';
import { Component } from "react";
import Link from "next/link";

const Home = () => {
  const router = useRouter()
  const { id } = router.query

  // return <p>Home: {slug}</p>

  const items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/',
      template: (item: MenuItem) => (
        <Link href={item.url!} className="p-menuitem-link">
          <i className={item.icon} />
          <p className="ml-2">{ item.label }</p>
        </Link>
      ),
      // command(event) {
      //   if (event.originalEvent.type === 'click') {
      //     router.push('/')
      //   }        
      // },
    },
    {
      separator: true
    },
    {
      label: 'Institución',
      icon: 'pi pi-fw pi-building',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Bookmark',
              icon: 'pi pi-fw pi-bookmark',
            },
            {
              label: 'Video',
              icon: 'pi pi-fw pi-video'
            },

          ]
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
        },
        {
          separator: true
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link'
        }
      ]
    },
    {
      label: 'Electores',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify'
        },

      ]
    },
    {
      label: 'Listas',
      icon: 'pi pi-fw pi-list',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify'
        },

      ]
    },
    {
      label: 'Mesas',
      icon: 'pi pi-fw pi-th-large',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify'
        },

      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',

        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus',

        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      label: 'Reportes',
      icon: 'pi pi-fw pi-chart-pie',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archive',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-fw pi-power-off'
    }
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between p-3 border-2 m-2 rounded-lg shadow-sm">
            <a href="" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-lg font-normal whitespace-nowrap">
                Administración de proceso electoral { id }
              </span>
            </a>
          </div>
      <div className="card flex justify-content-center ml-2">
        <SlideMenu 
          model={items} 
          viewportHeight={400} 
          menuWidth={200}
          backLabel="Regresar"
        />
      </div>
    </>
  )

}



export default Home