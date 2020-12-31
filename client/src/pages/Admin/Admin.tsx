import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../../store/actions/global_actions'
import { Globalstate } from '../../types/interfaces/index'

const Admin: React.FC = () => {
    const dispatch = useDispatch();
    const global = useSelector((state: Globalstate) => state.global);

    const mode = () => {
        if(global.mode){
            return 'white'
        } else {
            return 'pink'
        }
    }

    return (
        <div>
            <p>Mode: {mode()}</p>
            <button onClick={() => dispatch(changeMode(!global.mode))}>Switch</button>
        </div>
    )
}

export default Admin
