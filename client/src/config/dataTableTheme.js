import {createTheme} from 'react-data-table-component'

const dataTableTheme = createTheme('green', {
    text: {
        primary: '#004445',
        secondary: '#2c7873',
    },
    background: {
      default: '#f1f4f4',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#fcfdfd',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    }
})

export const customStylesTable = {
    header: {
        style: {
            fontSize: '7vmin',
            width:'100%'
        }
    }
}

export default dataTableTheme