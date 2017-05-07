import { getMuiTheme } from 'material-ui/styles';

import style from './style';

export default getMuiTheme({
  fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif',
  palette: {
    primary1Color: style.blue,
    accent1Color: style.pink,
    textColor: style.black,
  },
});
