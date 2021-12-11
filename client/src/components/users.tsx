import React, { ReactElement } from 'react'
import './../styles/users.scss'

interface usersProps {
  users: Array<User>
}

export default function users(props: usersProps): ReactElement {
  return (
    <div className="user-list-content">
      {props.users.map((user: User) => (
        <div className="user-item" key={user.id}>
          <div className="item-right">
            <div className="pic-profile">{user.name.slice(0, 2).toUpperCase()}</div>
            <div className="user-username">{user.name}</div>
            <div className="user-you">
              {user.id === '1' ? <i className="eva eva-person"></i> : ''}
            </div>
          </div>
          <div>
            <div className="user-ready">
              <i className="eva eva-checkmark-outline"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
