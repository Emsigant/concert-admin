import React, {
    Component
} from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div className='route' style={{fontSize:'3rem',margin:'3rem',lineHeight:'3rem'}}>欢迎
            </div>
        )
    }
}
export default Welcome;